import { toast } from "sonner";
import { responseMessages } from "./constants/responseMessages";

export async function toastResponse<
  T extends { success: boolean; message: string },
>(promise: Promise<T>, loadingMessage?: string) {
  return toast.promise(
    promise.then((result) => {
      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    }),
    {
      loading: loadingMessage,
      success: (result) => responseMessages[result.message] ?? result.message,
      error: (error) => responseMessages[error.message] ?? error.message,
    },
  );
}
