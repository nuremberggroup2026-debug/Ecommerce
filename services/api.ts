type FetchOptions<TBody = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: TBody;
  headers?: Record<string, string>;
  cache?: RequestCache;
  revalidate?: number;
};

async function request<TResponse, TBody = unknown>(
  url: string,
  options: FetchOptions<TBody> = {},
): Promise<TResponse> {
  const isGet = !options.method || options.method === "GET";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || ""}/api/` + url,
    {
      method: options.method || "GET",

      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },

      body: isGet ? undefined : JSON.stringify(options.body),

      cache: options.cache || "default",

      next: options.revalidate ? { revalidate: options.revalidate } : undefined,
    },
  );

  if (!res.ok) {
    const errorText = await res.text().catch(() => null);

    throw new Error(errorText || "API Error");
  }

  return res.json();
}

export const api = {
  get: <TResponse>(
    url: string,
    options?: Omit<FetchOptions, "method" | "body">,
  ) => request<TResponse>(url, { ...options, method: "GET" }),

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
  ) => request<TResponse>(url, { ...options, method: "DELETE" }),
};
