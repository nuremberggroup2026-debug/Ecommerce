import { toast } from "sonner";

export async function toastResponse<
  T extends {
    success: boolean;
    message: string;
    status: number;
  },
>(
  promise: Promise<T>,
  t: (key: string) => string,
  loadingKey?: string,
): Promise<T> {
  const toastPromise = promise.then((result) => {
    if (!result.success) {
      // نرمي الـ response نفسه حتى نحافظ على status
      throw result;
    }

    return result;
  });

  toast.promise(toastPromise, {
    loading: loadingKey
      ? t(`ResponseMessages.${loadingKey}`)
      : undefined,

    success: (result) => {
      const key = `ResponseMessages.${result.message}`;
      const translated = t(key);

      return translated !== key
        ? translated
        : result.message;
    },

    error: (error) => {
      const message =
        error?.message || "UNKNOWN_ERROR";

      const key = `ResponseMessages.${message}`;
      const translated = t(key);

      return translated !== key
        ? translated
        : message;
    },
  });

  return toastPromise;
}
