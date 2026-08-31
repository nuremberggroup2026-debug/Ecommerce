import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  banners: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Banner Upload Complete:", file.ufsUrl);
    return { uploadedUrl: file.ufsUrl };
  }),
  categories: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("categories Upload Complete:", file.ufsUrl);
    return { uploadedUrl: file.ufsUrl };
  }),
  products: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Our Team Upload Complete:", file.ufsUrl);
    return { uploadedUrl: file.ufsUrl };
  }),

  careers: f({
    image: { maxFileSize: "4MB", maxFileCount: 2 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Courses Upload Complete:", file.ufsUrl);
    return { uploadedUrl: file.ufsUrl };
  }),
  productVariants: f({
    image: { maxFileSize: "4MB", maxFileCount: 2 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Product Variants Upload Complete:", file.ufsUrl);
    return { uploadedUrl: file.ufsUrl };
  }),
  cv: f({
    blob: { maxFileSize: "8MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("CV Upload Complete:", file.ufsUrl);
    return { uploadedUrl: file.ufsUrl, fileName: file.name };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
