"use client";

import React, { forwardRef } from "react";

interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className={className}>
        <label
          htmlFor={props.id || props.name}
          className="mb-2 block text-[11px] font-semibold  tracking-wider text-neutral-600"
        >
          {label}
        </label>
        <input
          type="email"
          ref={ref}
          className={`w-full rounded-xl border bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-black focus:bg-white ${
            error ? "border-red-300" : "border-neutral-200"
          }`}
          {...props}
        />
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

EmailInput.displayName = "EmailInput";
