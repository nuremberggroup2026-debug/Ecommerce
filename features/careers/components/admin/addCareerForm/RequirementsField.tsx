"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import type { CareerSchema } from "@/server/careers/validators";

import { inputClass } from "./utils";

type Props = {
  fieldName: "requirementsEn" | "requirementsAr";
  label: string;
  placeholder: string;
  dir?: "rtl";
};

export default function RequirementsField({ fieldName, label, placeholder, dir }: Props) {
  const [inputValue, setInputValue] = useState("");

  const {
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<CareerSchema>();

  const requirements = watch(fieldName);

  const addRequirement = () => {
    const value = inputValue.trim();

    if (!value) return;

    setValue(fieldName, [...requirements, value], {
      shouldValidate: true,
      shouldDirty: true,
    });

    setInputValue("");
    clearErrors(fieldName);
  };

  const removeRequirement = (index: number) => {
    setValue(
      fieldName,
      requirements.filter((_, i) => i !== index),
      { shouldValidate: true, shouldDirty: true }
    );
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="flex gap-2">
        <input
          dir={dir}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addRequirement();
            }
          }}
          placeholder={placeholder}
          className={inputClass}
        />

        <button
          type="button"
          onClick={addRequirement}
          className="shrink-0 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Add
        </button>
      </div>

      {requirements.length > 0 && (
        <div className="space-y-2">
          {requirements.map((requirement, index) => (
            <div
              key={`${requirement}-${index}`}
              className="flex items-center justify-between gap-3 rounded-lg border bg-gray-50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-xs text-white">
                  {index + 1}
                </span>
                <span dir={dir} className="text-sm text-gray-700">
                  {requirement}
                </span>
              </div>

              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="text-xs font-medium text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {errors[fieldName] && (
        <p className="text-xs text-red-600">{errors[fieldName]?.message}</p>
      )}
    </div>
  );
}
