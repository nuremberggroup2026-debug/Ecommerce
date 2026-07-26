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
