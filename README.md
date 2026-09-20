# Ecommerce Project

## Overview

This is a full-stack ecommerce platform designed to be maintainable, reusable, and easy for developers to work with.

The project is structured to separate frontend features, backend entities, shared types, themes, and API functionality. This README explains the important conventions and project-specific decisions that a developer should know before working on the project.

---

## Project Structure

The project follows a feature/entity-oriented structure.

### Shared Types

The root `types/` folder contains **general/shared types** that can be used across different parts of the application.

Examples include:

- `AddResponseType`
- `PutResponseType`

Feature-specific types should not be placed in the root `types/` folder.

### Frontend Feature Types

Frontend features have their own `types/` folders.

These folders contain the **detailed types specific to that feature**.

For example:

```text
features/
├── products/
│   ├── components/
│   ├── types/
│   └── ...
├── orders/
│   ├── components/
│   ├── types/
│   └── ...
└── ...
```

When a type is only relevant to a specific frontend feature, it should be defined inside that feature's `types/` folder.

### Backend Types

Backend types are organized by entity under the `server/` folder.

Each entity should keep its related backend types within its corresponding server folder.

```text
server/
├── products/
│   ├── types
│   ├── services
│   └── validators
├── orders/
│   ├── types
│   ├── services
│   └── validators
└── ...
```

This keeps backend types close to the entity they belong to and avoids having a large global types folder.

---

# Dashboard

## Tables and Pagination

Not every dashboard table requires pagination.

### Tables With Pagination

The following dashboard tables use pagination:

- Orders
- Products
- Promo Codes
- Applications

These tables use the `DataTableServer` component.

`DataTableServer` is intended for tables where the data is retrieved and paginated on the server.

### Tables Without Pagination

Other dashboard tables do not use pagination because their expected data size does not require it.

These tables use the regular `DataTable` component.

In general:

```text
Server-side pagination → DataTableServer
No pagination          → DataTable
```

When adding a new dashboard table, choose the appropriate component based on whether pagination is required.

---

# Orders

## Orders Cannot Be Deleted

Orders intentionally cannot be deleted by administrators.

The reason is that orders represent the store's historical records. Administrators should always be able to access previous orders for reference and record-keeping.

Therefore, even completed or cancelled orders should remain in the database.

> Do not add order deletion functionality unless the application's business requirements are changed intentionally.

---

# Categories and Products

## Deleting a Category

Deleting a category also deletes **all products belonging to that category**.

This is intentional cascading behavior.

For example:

```text
Category
 ├── Product A
 ├── Product B
 └── Product C
```

If the category is deleted:

```text
Category → deleted
Product A → deleted
Product B → deleted
Product C → deleted
```

Be aware of this behavior when implementing category deletion or modifying the database relationships.

---

# API Testing

## Postman Collection

The root `docs/` folder contains the project's **Postman collection**.

The collection is already configured with the API endpoints and required request information, including:

- API endpoints
- Request bodies
- Query strings
- Other required configurations

A developer can import the collection into Postman and use it to test the project's APIs.

### Documentation

The `docs/` folder also contains a `README.md` file with additional instructions about importing and using the Postman collection.

Before testing the APIs, it is recommended to read:

```text
docs/README.md
```

---

# Themes

## Theme System

The project contains a root-level `theme/` folder.

This folder contains the available **website themes**.

The shop's Tailwind styles are imported from the `theme/` folder rather than having all styling defined directly throughout the shop components.

### Why Themes Are Structured This Way

This architecture makes it easier to change the visual style of the ecommerce website.

Instead of modifying styles throughout the entire application, a different theme can be selected or configured from the theme system.

This is particularly important because the ecommerce platform is intended to be reusable for multiple clients.

For example:

```text
Same ecommerce functionality
        │
        ├── Client A → Theme A
        ├── Client B → Theme B
        └── Client C → Theme C
```

The goal is to keep the **business functionality reusable** while allowing the website's visual identity and styling to be customized for each client.

When working on shop styling, check the `theme/` folder before adding or modifying global Tailwind styles directly inside individual components.

---

# Important Development Notes

When working on this project, keep the following conventions in mind:

1. Use the root `types/` folder for **general/shared types**.
2. Keep frontend feature-specific types inside the feature's `types/` folder.
3. Keep backend entity-specific types under the corresponding `server/` entity.
4. Use `DataTableServer` for dashboard tables that require pagination.
5. Use `DataTable` for dashboard tables that do not require pagination.
6. Do not delete orders; they are part of the permanent order history.
7. Remember that deleting a category also deletes its associated products.
8. Use the Postman collection in `docs/` when testing APIs.
9. Read `docs/README.md` for Postman setup instructions.
10. Keep shop styling within the theme system whenever possible to preserve the project's multi-client flexibility.

---

# Quick Reference

| Area                           | Convention                    |
| ------------------------------ | ----------------------------- |
| Shared types                   | Root `types/`                 |
| Frontend-specific types        | Feature `types/` folders      |
| Backend entity types           | `server/<entity>/`            |
| Paginated dashboard tables     | `DataTableServer`             |
| Non-paginated dashboard tables | `DataTable`                   |
| Order deletion                 | Not allowed                   |
| Category deletion              | Deletes associated products   |
| API testing                    | Postman collection in `docs/` |
| Postman instructions           | `docs/README.md`              |
| Shop themes                    | `theme/`                      |
| Shop styling                   | Imported from `theme/`        |

---

## Working With the Project

Before making changes, familiarize yourself with:

- The relevant feature folder
- The corresponding backend entity under `server/`
- The applicable types folder
- The dashboard table component being used
- The theme system for shop-related styling
- The Postman collection when working on APIs

Following these conventions will help keep the project consistent and make it easier to maintain and customize for future clients.
