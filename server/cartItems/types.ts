export type CartitemCreateInput = {
  variantId: string;
  quantity: number;
};

export type UpdateQuantity = {
  cartItemId: string;
  newQuantity: number;
};
