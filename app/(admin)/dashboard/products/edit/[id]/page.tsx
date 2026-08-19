import {adminProductById} from "@/features/products/api/products.server.api";
import EditProductForm from "@/app/(admin)/dashboard/products/edit/edit-product-form";

export default async function Page({params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 const response=await adminProductById(id);
 const product=response.data;
 if(!product)return <div>Product not found</div>;

 return(
  <div className="p-6">
   <EditProductForm
    product={{
     id:product.id,
     slug:product.slug,
     productNameEn:product.productNameEn,
     productNameAr:product.productNameAr,
     productDescriptionEn:product.productDescriptionEn,
     productDescriptionAr:product.productDescriptionAr,
     productCardImage:product.productCardImage,
     productImages:product.productImages??[],
     categoryId:product.categoryId,
     isFeatured:product.isFeatured,
     startingPrice:Number(product.startingPrice),
     variants:(product.productVariants
??[]).map(variant=>({
      id:variant.id,
      sku:variant.sku,
      variantImage:variant.variantImage??"",
      price:Number(variant.price),
      discountPercentage:Number(variant.discountPercentage??0),
      finalPrice:Number(variant.finalPrice??0),
      stock:Number(variant.stock),
      isDefault:Boolean(variant.isDefault),
      attributeValueIds:variant.attributeValueIds??[]
     }))
    }}
    categories={[]}
    attributes={[]}
   />
  </div>
 );
}
