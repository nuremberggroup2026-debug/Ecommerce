export type Product={
 id:string;
 slug:string;
 productNameEn:string;
 productNameAr:string;
 productDescriptionEn:string;
 productDescriptionAr:string;
 productCardImage:string;
 productImages:string[];
 categoryId:string;
 createdAt:Date;
 isFeatured:boolean;
 startingPrice:number;
 
 productVariants:{
  id:string;
  sku:string;
  variantImage:string;
  price:number;
  discountPercentage:number;
  finalPrice:number;
  stock:number;
  isDefault:boolean;
  attributeValueIds:string[];
 }[];
};


export type CreateAdminProduct = {
  slug: string;
  productNameEn: string;
  productNameAr: string;
  productDescriptionEn: string;
  productDescriptionAr: string;
  productCardImage: string;
  productImages: string[] | null;
  categoryId: string;
  isFeatured: boolean;
  startingPrice: number;

  variants: {
    price: number;
    discountPercentage: number;
    finalPrice: number;
    stock: number;
    sku: string;
    isDefault: boolean;
    variantImage: string;
    attributeValueIds: string[];
  }[];
};
