import { prisma } from "@/lib/prisma";

export const hasDuplicateAttributes = async (ids: string[]) => {
  const attributeValues = await prisma.attribute_values.findMany({
    where: { id: { in: ids } },
    select: { attributeId: true },
  });

  const arrayOfAttributes = attributeValues.map((value) => value.attributeId);

  const isRepeated: boolean =
    new Set(arrayOfAttributes).size !== arrayOfAttributes.length;

  return isRepeated;
};

export const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export function generateOrderNumber(): string {
  const now = new Date();

  const datePart = now.toISOString().slice(2, 10).replace(/-/g, "");

  const timePart = now.toISOString().slice(11, 19).replace(/:/g, "");

  const randomPart = Math.floor(100 + Math.random() * 900).toString();

  return `ORD-${datePart}-${timePart}-${randomPart}`;
}
