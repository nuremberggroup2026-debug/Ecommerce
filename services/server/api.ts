import { cookies } from "next/headers";

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
  const cookieStore = await cookies();

  const isGet = !options.method || options.method === "GET";
  const apiUrl = `${process.env.API_URL || ""}/api/${url}`;

  console.log("API URL:", process.env.API_URL);
  console.log("Request URL:", apiUrl);
  const res = await fetch(`${process.env.API_URL || ""}/api/${url}`, {
    method: options.method || "GET",

    headers: {
      Cookie: cookieStore.toString(),
      "Content-Type": "application/json",
      ...options.headers,
    },

    body: isGet ? undefined : JSON.stringify(options.body),

    cache: options.cache || "default",

    next: options.revalidate
      ? {
          revalidate: options.revalidate,
        }
      : undefined,
  });

  /**
   * Handle HTTP errors
   */
  if (!res.ok) {
    let errorData: unknown = null;

    /**
     * Try JSON first
     */
    try {
      errorData = await res.json();
    } catch {
      /**
       * If response isn't JSON,
       * try reading it as text.
       */
      try {
        errorData = await res.text();
      } catch {
        errorData = null;
      }
    }

    let message = "API Error";

    /**
     * Example:
     *
     * {
     *   message: "Unauthorized"
     * }
     */
    if (
      typeof errorData === "object" &&
      errorData !== null &&
      "message" in errorData &&
      typeof errorData.message === "string"
    ) {
      message = errorData.message;
    } else if (typeof errorData === "string" && errorData.length > 0) {

    /**
     * Example:
     *
     * "Unauthorized"
     */
      message = errorData;
    }

    /**
     * Preserve the HTTP status

     */
    throw new ApiError(res.status, message, errorData);
  }

  /**
   * 204 No Content
   *
   * There is no JSON body,
   * so don't call res.json().
   */
  if (res.status === 204) {
    return undefined as TResponse;
  }

  /**
   * Successful response
   */
  return res.json();
}

export const api = {
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
    body: TBody,
    options?: Omit<FetchOptions<TBody>, "method" | "body">,
  ) =>
    request<TResponse, TBody>(url, {
      ...options,
      method: "PUT",
      body,
    }),

  delete: <TResponse>(
    url: string,
    options?: Omit<FetchOptions, "method" | "body">,
  ) =>
    request<TResponse>(url, {
      ...options,
      method: "DELETE",
    }),
};
