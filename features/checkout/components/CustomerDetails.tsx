"use client";
import { useForm } from "react-hook-form";
import React from "react";
import { Locale } from "@/types";

interface Props {
  locale: Locale;
}

function CustomerDetails({ locale }: Props) {
  const {
    register,
    formState: { errors, isSubmitting, isDirty, isLoading },
  } = useForm();
  return <div>CustomerDetails</div>;
}

export default CustomerDetails;
