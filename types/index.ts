export type Locale = "ar" | "en";
export interface ResponseType<T> {
  message: string;
  success: boolean;
  data: T;
}
export interface PutResponseType {
  message: string;
  success: boolean;
}
export interface deleteResponseType {
  message: string;
  success: boolean;
}

export interface deleteManyResponseType extends deleteResponseType {
  deletedCount: number;
}
export interface AddResponseType {
  message: string;
  success: boolean;
}
export interface ShownResponseType {
  message: string;
  success: boolean;
}

export type PostResponseType = {
  message: string;
  success: boolean;
  status: number;
};
