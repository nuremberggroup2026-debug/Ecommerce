"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

import {
  adminAddAttributeValue,
  adminDeleteAttributeValue,
  adminUpdateAttribute,
  adminUpdateAttributeValue,
} from "@/features/catalog/attributes/api/attributes.client.api";

import {
  editAttributeFormSchema,
  EditAttributeFormSchema,
} from "@/server/attributes/validators";

type AttributeValue = {
  id: string;
  attributeId: string;
  attributeValueEn: string;
  attributeValueAr: string;
  createdAt: string;
};

type Props = {
  attribute: {
    id: string;
    attributeNameEn: string;
    attributeNameAr: string;
    attributeValues: AttributeValue[];
  };
};

export default function EditAttributeForm({
  attribute,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditAttributeFormSchema>({
    resolver: zodResolver(editAttributeFormSchema),

    mode: "onSubmit",
    reValidateMode: "onChange",

    defaultValues: {
      attributeNameEn: attribute.attributeNameEn,
      attributeNameAr: attribute.attributeNameAr,

      attributeValues: attribute.attributeValues.map(
        (value) => ({
          id: value.id,
          attributeValueEn: value.attributeValueEn,
          attributeValueAr: value.attributeValueAr,
        }),
      ),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributeValues",
  });

  const handleAddValue = () => {
    append({
      id: "",
      attributeValueEn: "",
      attributeValueAr: "",
    });
  };

  const onSubmit = async (
    data: EditAttributeFormSchema,
  ) => {
    try {
      setLoading(true);

    

      /* =====================================================
         1. Update Attribute
      ===================================================== */



      const attributeResult = await adminUpdateAttribute(
        attribute.id,
        {
          attributeNameEn: data.attributeNameEn,
          attributeNameAr: data.attributeNameAr,
        },
      );

     

      if (!attributeResult.success) {
        throw new Error(
          `Update attribute failed: ${attributeResult.message}`,
        );
      }

      /* =====================================================
         2. Existing IDs
      ===================================================== */

      const existingValueIds = new Set(
        attribute.attributeValues.map(
          (value) => value.id,
        ),
      );

      /* =====================================================
         3. Current IDs
      ===================================================== */

      const currentValueIds = new Set(
        data.attributeValues
          .filter((value) => value.id)
          .map((value) => value.id),
      );

      /* =====================================================
         4. Delete Removed Values
      ===================================================== */

      const deletedValues =
        attribute.attributeValues.filter(
          (value) =>
            !currentValueIds.has(value.id),
        );

      for (const value of deletedValues) {
       

        const result =
          await adminDeleteAttributeValue(
            value.id,
          );

        if (!result.success) {
          throw new Error(
            `Delete value failed: ${result.message}`,
          );
        }
      }

      /* =====================================================
         5. Add / Update Values
      ===================================================== */

      for (const value of data.attributeValues) {
        /* -------------------------------------------------
           New Value
        ------------------------------------------------- */

        if (!value.id) {
          const payload = {
            attributeId: attribute.id,
            attributeValueEn:
              value.attributeValueEn,
            attributeValueAr:
              value.attributeValueAr,
          };

          const result =
            await adminAddAttributeValue(
              payload,
            );

          if (!result.success) {
            throw new Error(
              `Add value failed: ${result.message}`,
            );
          }

          continue;
        }

        /* -------------------------------------------------
           Existing Value
        ------------------------------------------------- */

        if (existingValueIds.has(value.id)) {
          const payload = {
            attributeValueEn:
              value.attributeValueEn,
            attributeValueAr:
              value.attributeValueAr,
          };
          const result =
            await adminUpdateAttributeValue(
              value.id,
              payload,
            );
          if (!result.success) {
            throw new Error(
              `Update value failed: ${result.message}`,
            );
          }
        }
      }

      /* =====================================================
         Success
      ===================================================== */

      toast.success(
        "Attribute updated successfully",
      );

      router.push("/dashboard/attributes");
      router.refresh();
    } catch (error) {
      console.error(
        "========== SAVE ERROR ==========",
      );

      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      {/* =====================================================
          Attribute Information
      ===================================================== */}

      <div>
        <h2 className="mb-4 text-lg font-semibold">
          Attribute Information
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* English Name */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              English Name
            </label>

            <input
              {...register("attributeNameEn")}
              placeholder="Enter attribute name in English"
              className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />

            {errors.attributeNameEn && (
              <p className="text-sm text-red-600">
                {errors.attributeNameEn.message}
              </p>
            )}
          </div>

          {/* Arabic Name */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Arabic Name
            </label>

            <input
              dir="rtl"
              {...register("attributeNameAr")}
              placeholder="أدخل اسم الخاصية بالعربي"
              className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />

            {errors.attributeNameAr && (
              <p className="text-sm text-red-600">
                {errors.attributeNameAr.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          Attribute Values
      ===================================================== */}

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Attribute Values
            </h2>

            <p className="text-sm text-muted-foreground">
              Add, edit or remove values belonging to this
              attribute.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddValue}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />

            Add Value
          </button>
        </div>

        {errors.attributeValues?.root && (
          <p className="mb-4 text-sm text-red-600">
            {errors.attributeValues.root.message}
          </p>
        )}

        <div className="space-y-4">
          {fields.length === 0 && (
            <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              No attribute values yet. Click Add Value to add
              one.
            </div>
          )}

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-xl border bg-gray-50 p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  Value {index + 1}
                </span>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={loading}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  title="Remove value"
                >
                  <Trash2 className="h-4 w-4" />

                  <span className="sr-only">
                    Remove value
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* English Value */}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Value (EN)
                  </label>

                  <input
                    {...register(
                      `attributeValues.${index}.attributeValueEn`,
                    )}
                    placeholder="Enter value in English"
                    className="w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                  />

                  {errors.attributeValues?.[index]
                    ?.attributeValueEn && (
                    <p className="text-sm text-red-600">
                      {
                        errors.attributeValues[index]
                          ?.attributeValueEn?.message
                      }
                    </p>
                  )}
                </div>

                {/* Arabic Value */}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Value (AR)
                  </label>

                  <input
                    dir="rtl"
                    {...register(
                      `attributeValues.${index}.attributeValueAr`,
                    )}
                    placeholder="أدخل القيمة بالعربي"
                    className="w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                  />

                  {errors.attributeValues?.[index]
                    ?.attributeValueAr && (
                    <p className="text-sm text-red-600">
                      {
                        errors.attributeValues[index]
                          ?.attributeValueAr?.message
                      }
                    </p>
                  )}
                </div>
              </div>

              {/* Existing Value ID */}

              <input
                type="hidden"
                {...register(
                  `attributeValues.${index}.id`,
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          Submit
      ===================================================== */}

      <div className="flex justify-end border-t pt-6">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>
    </form>
  );
}