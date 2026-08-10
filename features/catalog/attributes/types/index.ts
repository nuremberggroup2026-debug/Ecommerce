
export type TranslatedAttribute = {
  attributeNameEn: string;
  attributeNameAr: string;
};

export type AdminAttributeValue = {
  id: string;
  attributeId: string;
  attributeValueEn: string;
  attributeValueAr: string;
  createdAt: string;
};

export type AdminAttribute = {
  id: string;
  attributeNameEn: string;
  attributeNameAr: string;
  createdAt: string;
  attributeValues: AdminAttributeValue[];
};

export type CreateAdminAttribute = {
  attributeNameEn: string;
  attributeNameAr: string;
};

export type PUTAdminAttribute = {
  attributeNameEn: string;
  attributeNameAr: string;
};

export type CreateAdminAttributeValue = {
  attributeId: string;
  attributeValueEn: string;
  attributeValueAr: string;
};

export type UpdateAdminAttributeValue = {
  attributeValueEn: string;
  attributeValueAr: string;
};

