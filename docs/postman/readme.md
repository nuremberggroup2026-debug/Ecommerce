# Ecommerce API — Postman Collections

This directory contains the Postman collections used to test the **Ecommerce API**.

The API is built with **Next.js** and provides endpoints for authentication, products, categories, orders, cart management, careers, applications, promo codes, and related resources.

---

## API Information

| Environment | Base URL                    |
| ----------- | --------------------------- |
| Local       | `http://localhost:3000/api` |
| Production  | `https://example.com/api`   |

> The production URL above is a placeholder. Replace it with the actual production API URL when available.

There is currently no Swagger/OpenAPI documentation. The Postman collections are the primary API testing reference.

---

## Postman Collections

The API is organized into the following collections:

```text
Auth
Categories
Products
Product Attributes
Banners
Wishlist
Cart
Cart Items
Orders
Order Items
Attribute
Attribute Values
Careers
Applications
Promo Codes
```

Recommended project structure:

```text
docs/
└── postman/
    ├── collections/
    │   ├── Auth.postman_collection.json
    │   ├── Categories.postman_collection.json
    │   ├── Products.postman_collection.json
    │   ├── Product Attributes.postman_collection.json
    │   ├── Banners.postman_collection.json
    │   ├── Wishlist.postman_collection.json
    │   ├── Cart.postman_collection.json
    │   ├── Cart Items.postman_collection.json
    │   ├── Orders.postman_collection.json
    │   ├── Order Items.postman_collection.json
    │   ├── Attribute.postman_collection.json
    │   ├── Attribute Values.postman_collection.json
    │   ├── Careers.postman_collection.json
    │   ├── Applications.postman_collection.json
    │   └── Promo Codes.postman_collection.json
    │
    └── README.md
```

---

# Getting Started

## 1. Start the API

Make sure the Next.js application is running locally.

The default local API URL is:

```text
http://localhost:3000/api
```

---

## 2. Import the Postman Collections

Open Postman and:

1. Click **Import**.
2. Navigate to:

```text
docs/postman/collections/
```

3. Select the collection you want to import.
4. Repeat for the other collections as needed.

You can import all collections at once if preferred.

---

# Authentication

The API uses **HTTP-only authentication cookies**.

Protected endpoints require the following cookie:

```text
authjs.session-token
```

The cookie value must be the session token of an authenticated user.

## Adding the Session Cookie in Postman

After obtaining a valid session token:

1. Open the request you want to test.
2. Open the **Cookies** section in Postman.
3. Add a cookie for the API domain.
4. Set the cookie name to:

```text
authjs.session-token
```

5. Set its value to the valid session token.

Example:

```text
Cookie Name:  authjs.session-token
Cookie Value: <your-session-token>
```

Once the cookie is configured, protected requests can use the authenticated session.

> Never commit or share a real session token in the repository. Session tokens are sensitive credentials.

---

# User Roles

The API supports three user roles:

### User

Regular application users.

User permissions depend on the endpoint and resource being accessed.

### Admin

Administrators have access to order management functionality, including:

- Tracking orders
- Updating order status

### Super Admin

`super_admin` is the highest administrative role in the system.

> Specific `super_admin` permissions should be documented here if they differ from the permissions available to `admin`.

---

# Localization

Some API endpoints support a `locale` parameter.

When an endpoint supports localization, the API returns the translated data according to the requested locale.

Supported locales:

```text
ar
en
```

### Arabic

```text
locale=ar
```

The API returns the Arabic version of the localized fields.

### English

```text
locale=en
```

The API returns the English version of the localized fields.

The API does **not** return both languages when a locale is provided.

For example, a localized product request with:

```text
locale=ar
```

returns Arabic product information.

A request with:

```text
locale=en
```

returns English product information.

---

# Recommended Testing Flow

When testing the API from a fresh environment, the following order is recommended.

```text
1. Authentication
       ↓
2. Categories / Attributes
       ↓
3. Products
       ↓
4. Cart / Wishlist
       ↓
5. Orders
       ↓
6. Promo Codes
```

For career-related functionality:

```text
Careers
   ↓
Applications
```

The exact order may vary depending on the data already available in the database.

---

# Resource Collections

## Auth

Contains authentication-related API requests.

Use this collection first when you need to establish an authenticated session for testing protected endpoints.

---

## Categories

Contains endpoints for managing and retrieving product categories.

---

## Products

Contains product-related endpoints.

Products may depend on other resources such as categories, attributes, and attribute values.

---

## Product Attributes

Contains endpoints related to assigning and managing attributes associated with products.

---

## Banners

Contains banner-related API requests.

---

## Wishlist

Contains endpoints for managing user wishlist/favorite products.

Authenticated requests require a valid session cookie.

---

## Cart

Contains cart-level operations for authenticated users.

---

## Cart Items

Contains operations related to items inside a user's cart.

---

## Orders

Contains order-related operations.

Order access is role-dependent.

Administrators can use the API to track orders and update their status.

---

## Order Items

Contains operations related to the individual items belonging to orders.

---

## Attribute

Contains endpoints for managing product attributes.

---

## Attribute Values

Contains endpoints for managing the values associated with product attributes.

---

## Careers

Contains endpoints related to available career positions.

---

## Applications

Contains endpoints for submitting and managing applications for careers.

---

## Promo Codes

Contains endpoints for creating, validating, and managing promotional codes.

---

# Testing Protected Endpoints

If a request returns an authentication or authorization error, first verify:

1. You are using a valid session.
2. The `authjs.session-token` cookie is present.
3. The cookie belongs to the correct API environment.
4. The authenticated user has the required role.
5. The session has not expired.

For example:

```text
Request
   ↓
authjs.session-token
   ↓
Authenticated User
   ↓
Role Check
   ↓
API Endpoint
```

---

# Environment Switching

When testing locally, use:

```text
http://localhost:3000/api
```

When testing production, use:

```text
https://example.com/api
```

It is recommended to configure the Postman collections to use a variable such as:

```text
{{baseUrl}}
```

For example:

```text
{{baseUrl}}/products
```

Then configure:

```text
baseUrl = http://localhost:3000/api
```

for local development.

This makes it easier to switch between local and production environments without modifying every request.

---

# Important Notes

- Do not commit session tokens, passwords, API keys, or other secrets to the repository.
- Protected endpoints require a valid `authjs.session-token` cookie.
- API permissions depend on the authenticated user's role.
- When an endpoint supports `locale`, use `ar` or `en`.
- Localized endpoints return the requested language rather than both Arabic and English.
- Some resources depend on IDs from other resources. For example, creating a product may require an existing category or attribute ID.
- The Postman collections should be kept updated whenever API endpoints or request/response structures change.

---

# Adding or Updating Collections

When a new API module is added:

1. Create a Postman collection for the module.
2. Add and test all relevant endpoints.
3. Export the collection as JSON.
4. Place it inside:

```text
docs/postman/collections/
```

5. Add the collection to the list in this README.
6. Commit the updated collection and README together.

This keeps the Postman documentation synchronized with the API.
