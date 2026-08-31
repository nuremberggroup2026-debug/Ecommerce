type FetchOptions<TBody = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: TBody;
  headers?: Record<string, string>;
  cache?: RequestCache;
  revalidate?: number;
};

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.data = data;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

async function request<TResponse, TBody = unknown>(
  url: string,
  options: FetchOptions<TBody> = {},
): Promise<TResponse> {
  const isGet = !options.method || options.method === "GET";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || ""}/api/${url}`,
    {
      method: options.method || "GET",

      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },

      body: isGet ? undefined : JSON.stringify(options.body),

      cache: options.cache || "default",

      next: options.revalidate
        ? { revalidate: options.revalidate }
        : undefined,
    },
  );

  if (!res.ok) {
    let errorData: unknown = null;

    try {
      errorData = await res.json();
    } catch {
      try {
        errorData = await res.text();
      } catch {
        errorData = null;
      }
    }

    let message = "API Error";

    if (
      typeof errorData === "object" &&
      errorData !== null &&
      "message" in errorData &&
      typeof errorData.message === "string"
    ) {
      message = errorData.message;
    } else if (
      typeof errorData === "string" &&
      errorData.length > 0
    ) {
      message = errorData;
    }

    throw new ApiError(
      res.status,
      message,
      errorData,
    );
  }

  if (res.status === 204) {
    return undefined as TResponse;
  }

  return res.json();
}

export const Clientapi = {
  get: <TResponse>(
    url: string,
    options?: Omit<FetchOptions, "method" | "body">,
  ) =>
    request<TResponse>(url, {
      ...options,
      method: "GET",
    }),

  post: <TResponse, TBody>(
    url: string,
    body: TBody,
    options?: Omit<FetchOptions<TBody>, "method" | "body">,
  ) =>
    request<TResponse, TBody>(url, {
      ...options,
      method: "POST",
      body,
    }),

  put: <TResponse, TBody>(
    url: string,
    body?: TBody,
    options?: Omit<FetchOptions<TBody>, "method" | "body">,
  ) =>
    request<TResponse, TBody>(url, {
      ...options,
      method: "PUT",
      body,
    }),

  delete: <TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: Omit<FetchOptions, "method" | "body">,
  ) =>
    request<TResponse, TBody>(url, {
      ...options,
      method: "DELETE",
      body,
    }),
};
