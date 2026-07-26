// src/lib/constants/responses.ts

// 1. The Response Codes
export const RESPONSE_CODES = {
  // --- Success Codes ---
  OK: "OK",
  CREATED: "CREATED",
  ACCEPTED: "ACCEPTED",
  NO_CONTENT: "NO_CONTENT",

  // --- Client Error Codes ---
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  PAYMENT_REQUIRED: "PAYMENT_REQUIRED", 
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY", 
  TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",

  // --- Server Error Codes ---
  INTERNAL_ERROR: "INTERNAL_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
} as const;



// 2. The HTTP Status Map
export const HTTP_STATUS_MAP: Record<keyof typeof RESPONSE_CODES, number> = {
  // Success Statuses
  OK: 200,                  // Standard success
  CREATED: 201,             // e.g., New user registered, new order placed
  ACCEPTED: 202,            // e.g., Background job started
  NO_CONTENT: 204,          // e.g., Successful deletion (no data to return)

  // Client Error Statuses
  BAD_REQUEST: 400,         // General client error
  UNAUTHORIZED: 401,        // Not logged in / Wrong password
  PAYMENT_REQUIRED: 402,    // e.g., Cart checkout failed due to funds
  FORBIDDEN: 403,           // Logged in, but lacks admin rights
  NOT_FOUND: 404,           // Resource missing
  CONFLICT: 409,            // e.g., Email already exists
  UNPROCESSABLE_ENTITY: 422,// Zod schema validation failed
  TOO_MANY_REQUESTS: 429,   // Rate limiting hit

  // Server Error Statuses
  INTERNAL_ERROR: 500,      // Database down, generic crash
  SERVICE_UNAVAILABLE: 503, // Maintenance mode
};