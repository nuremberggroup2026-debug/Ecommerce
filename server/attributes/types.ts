import { Prisma, user_role, order_status } from "@/generated/prisma/client";

export type AttributeCreateInput = Prisma.attributesCreateInput;
export type AttributeUpdateInput = Prisma.attributesUpdateInput;

export type AttributeValuesCreateInput = {
  attributeValueEn: string;
  attributeValueAr: string;
  attributeId: string;
};
export type AttributeValuesUpdateInput = Prisma.attribute_valuesUpdateInput;
export type Locale = "ar" | "en";
