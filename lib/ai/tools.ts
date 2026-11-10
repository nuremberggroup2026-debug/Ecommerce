import { Pinecone } from "@pinecone-database/pinecone";
import { tool } from "langchain";
import z from "zod";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const index = pc.Index(process.env.PINECONE_INDEX!);

export const searchProductsTool = tool(
  async ({ query }) => {
    console.log(`🔍 AI is searching Pinecone for: "${query}"`);

    const searchResult = await index.documents.search({
      scoreBy: [
        {
          type: "embed",
          field: "chunk_text", // Tells Pinecone to embed the query and compare with chunk_text
          query: query,
        },
      ],
      topK: 4,
      includeFields: [
        "nameEn",
        "nameAr",
        "price",
        "slug",
        "image",
        "inStock",
        "chunk_text",
      ],
    });

    const matches = searchResult.matches || [];
    if (matches.length === 0) {
      console.log("⚠️ Pinecone returned 0 matches for query:", query);
      return "No matching products found in the catalog.";
    }

    // Safely support both top-level fields (Document Search) and nested .fields
    const productsList = matches.map((match: any) => {
      const data = match.fields || match;

      return {
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        price: typeof data.price === "number" ? `$${data.price}` : data.price,
        slug: data.slug,
        inStock: data.inStock,
        details: data.chunk_text,
      };
    });

    console.log(
      `✅ Found ${productsList.length} matching products for "${query}":`,
      productsList.map((p) => p.nameEn),
    );

    return JSON.stringify(productsList, null, 2);
  },
  {
    name: "search_products",
    description:
      "Searches the store catalog for products by attributes, features, uses, category, and product description. Use this whenever the user asks for product recommendations or product availability.",
    schema: z.object({
      query: z
        .string()
        .describe(
          "The search query keywords (e.g., 'blue cotton shirt', 'warm winter hoodie')",
        ),
    }),
  },
);
