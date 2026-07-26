export const logger = {
  info: (message: string) => {
    console.log("[INFO]", message);
  },

  error: (error: unknown) => {
    if (error instanceof Error) {
      console.error("[ERROR]", error.message);
    } else {
      console.error("[ERROR]", String(error));
    }
  },

  warn: (message: string) => {
    console.warn("[WARN]", message);
  },
};