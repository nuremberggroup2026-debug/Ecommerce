import { prisma } from "@/lib/prisma";
import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const index = pc.index(process.env.PINECONE_INDEX!);

const getProducts = async () => {
  const products = await prisma.products.findMany({
    include: {
      categories: { select: { categoryNameAr: true, categoryNameEn: true } },
      productVariants: {
        include: {
          variantAttributeValues: {
            include: {
              attributeValues: {
                include: { attributes: true },
              },
            },
          },
        },
      },
    },
  });

  const pineconeRecords = products.map((product) => {
    const dynamicAttributeMaps = new Map<string, Set<string>>();

    const variantsText = product.productVariants
      .map((variant) => {
        const variantAttribute = variant.variantAttributeValues.map((att) => {
          const nameEn = att.attributeValues.attributes.attributeNameEn;
          const valueEn = att.attributeValues.attributeValueEn;
          const nameAr = att.attributeValues.attributes.attributeNameAr;
          const valueAr = att.attributeValues.attributeValueAr;

          const normalizedKey = nameEn
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "_");

          if (!dynamicAttributeMaps.has(normalizedKey)) {
            dynamicAttributeMaps.set(normalizedKey, new Set<string>());
          }
          dynamicAttributeMaps.get(normalizedKey)!.add(valueEn);

          return `${nameEn}: ${valueEn} (${nameAr}: ${valueAr})`;
        });

        return `- SKU: ${variant.sku} | Price: $${variant.finalPrice} | In Stock: ${variant.stock > 0} | Attributes: ${variantAttribute.join(", ")}`;
      })
      .join("\n");

    const attributesSummary = Array.from(dynamicAttributeMaps.entries())
      .map(([key, values]) => `${key}: ${Array.from(values).join(", ")}`)
      .join("\n");

    const dynamicMetadata: Record<string, string[]> = {};
    dynamicAttributeMaps.forEach((valesSet, key) => {
      dynamicMetadata[key] = Array.from(valesSet);
    });

    const textToEmbed = `
Product Title: ${product.productNameEn} / ${product.productNameAr}
Category: ${product.categories.categoryNameEn} / ${product.categories.categoryNameAr}
Base Price: $${product.startingPrice}
Available Attributes:
${attributesSummary || "None"}
Description (EN): ${product.productDescriptionEn}
Description (AR): ${product.productDescriptionAr}
Variants:
${variantsText || "No variants"}
    `.trim();

    return {
      _id: product.id, // Document API requires '_id'
      chunk_text: textToEmbed, // Embedded automatically by Pinecone!
      nameEn: product.productNameEn,
      nameAr: product.productNameAr,
      slug: product.slug,
      category: product.categories.categoryNameEn,
      price: Number(product.startingPrice),
      image: product.productCardImage,
      inStock: product.productVariants.some((v) => v.stock > 0),
      ...dynamicMetadata, // Dynamic attributes: color, size, etc.
    };
  });

  return pineconeRecords;
};

const addProductsToPinecone = async () => {
  console.log("*** Fetching Products From Database ***");
  const documents = await getProducts();

  if (documents.length === 0) {
    console.log("⚠️ No products found in the database.");
    return;
  }

  console.log(
    `*** Found ${documents.length} products. Sample Document #1: ***`,
  );
  console.log(JSON.stringify(documents[0], null, 2));

  const BATCH_SIZE = 50;
  console.log(
    `*** Upserting documents into Pinecone index: ${process.env.PINECONE_INDEX}... ***`,
  );

  for (let i = 0; i < documents.length; i += BATCH_SIZE) {
    const batch = documents.slice(i, i + BATCH_SIZE);

    // ✅ Calls documents.upsert for your Document Schema Index!
    await index.documents.upsert({
      documents: batch,
    });

    console.log(
      `*** Uploaded ${Math.min(i + BATCH_SIZE, documents.length)} / ${documents.length} ***`,
    );
  }

  console.log("🎉 Products successfully indexed in Pinecone!");
};

addProductsToPinecone().catch(console.error);
