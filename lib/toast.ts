import { toast } from "sonner";

export async function toastResponse<
  T extends { success: boolean; message: string },
>(promise: Promise<T>, t: (key: string) => string, loadingKey?: string) {
  return toast.promise(
    promise.then((result) => {
      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    }),
    {
      loading: loadingKey ? t(`ResponseMessages.${loadingKey}`) : undefined,
      success: (result) => t(`ResponseMessages.${result.message}`),
      error: (error) => t(`ResponseMessages.${error.message}`),
    },
  );
}
