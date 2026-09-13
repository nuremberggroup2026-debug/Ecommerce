import { toast } from "sonner";
import { responseMessages } from "./constants/responseMessages";

export async function toastResponse<
  T extends { success: boolean; message: string },
>(promise: Promise<T>, loadingMessage?: string) {
  try {
    const result =  toast.promise(
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

    return {
      success: true,
      result,
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      error,
    };
  }
}
