import { toast } from "sonner";

export async function toastResponse<
  T extends { success: boolean; message: string },
>(
  promise: Promise<T>,
  t: (key: string) => string,
  loadingKey?: string,
): Promise<T> {
  const toastPromise = promise.then((result) => {
    if (!result.success) {
      throw new Error(result.message);
    }
    return result;
  });

  toast.promise(toastPromise, {
    loading: loadingKey ? t(`ResponseMessages.${loadingKey}`) : undefined,
    success: (result) => t(`ResponseMessages.${result.message}`),
    error: (error) => t(`ResponseMessages.${error.message}`),
  });

  // Return the original promise safely so the caller can check result.success
  try {
    return await promise;
  } catch (error) {
    // Fallback in case of a hard network error/crash
    return { success: false, message: "NETWORK_ERROR" } as T;
  }
}
