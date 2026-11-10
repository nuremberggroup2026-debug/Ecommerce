import { prisma } from "@/lib/prisma";
import { Pinecone } from "@pinecone-database/pinecone";

let _index: ReturnType<Pinecone["index"]> | null = null;

const getIndex = () => {
  if (!_index) {
    const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
    _index = pc.index(process.env.PINECONE_INDEX!);
  }
  return _index;
};

const buildProductDocument = async (productId: string) => {
  const product = await prisma.products.findUnique({
    where: { id: productId },
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
  if (!product) return null;
  const dynamicAttributeMaps = new Map<string, Set<string>>();
  const variantsText = product.productVariants
    .map((variant) => {
      const variantAttribute = variant.variantAttributeValues.map((att) => {
        const nameEn = att.attributeValues.attributes.attributeNameEn;
        const valueEn = att.attributeValues.attributeValueEn;
        const nameAr = att.attributeValues.attributes.attributeNameAr;
        const valueAr = att.attributeValues.attributeValueAr;
        const normalizedKey = nameEn.trim().toLowerCase().replace(/\s+/g, "_");
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
    _id: product.id,
    chunk_text: textToEmbed,
    nameEn: product.productNameEn,
    nameAr: product.productNameAr,
    slug: product.slug,
    category: product.categories.categoryNameEn,
    price: Number(product.startingPrice),
    image: product.productCardImage,
    inStock: product.productVariants.some((v) => v.stock > 0),
    ...dynamicMetadata,
  };
};

export const syncProductToPinecone = async (productId: string) => {
  try {
    const document = await buildProductDocument(productId);
    if (!document) return;
    const index = getIndex();
    await index.documents.upsert({
      documents: [document],
    });

    console.log(
      `🌲 [Pinecone] Synced product: "${document.nameEn}" (${productId})`,
    );
  } catch (error) {
    console.error(`❌ [Pinecone] Failed to sync product ${productId}:`, error);
  }
};

export const deleteProductsFromPinecone = async (productIds: string[]) => {
  try {
    if (!productIds || productIds.length === 0) return;
    const index = getIndex();
    await index?.documents.delete({
      ids: productIds,
    });

    console.log(
      `🌲 [Pinecone] Deleted ${productIds.length} product(s):`,
      productIds,
    );
  } catch (error) {
    console.error("❌ [Pinecone] Failed to delete products:", error);
  }
};
