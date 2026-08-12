"use client";
import { useForm } from "react-hook-form";
import { Locale, OrderFormDataType } from "../types/index";
import { createOrderFrontendSchema } from "@/server/orders/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastResponse } from "@/lib/toast";
import { placeAnOrder } from "../api/checkout.client.api";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
interface Props {
  locale: Locale;
  promoCode?: string;
}
function CustomerDetails({ locale, promoCode }: Props) {
  const t = useTranslations();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormDataType>({
    resolver: zodResolver(createOrderFrontendSchema(locale)),
  });
  const onSubmit = async (data: OrderFormDataType) => {
    const orderData = {
      ...data,
      promoCode,
    };
    await toastResponse(placeAnOrder(orderData), t, "PLACING_THE_ORDER");
    router.replace("/orders");
  };

  console.log("promoCode: ", promoCode);

  return (
    <section className="">
      {/* Header */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-600"
          >
            {t("CHECKOUT.CUSTOMER_DETAILS.EMAIL")}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            disabled={isSubmitting}
            {...register("email")}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-neutral-900 ${errors.email ? "border-red-300 focus:border-red-500" : "border-neutral-200"}`}
            placeholder={t("CHECKOUT.CUSTOMER_DETAILS.EMAIL_PLACEHOLDER")}
          />
          {errors.email && (
            <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        {/* Phone */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-600"
          >
            {t("CHECKOUT.CUSTOMER_DETAILS.PHONE")}
          </label>
          <input
            id="phoneNumber"
            type="tel"
            autoComplete="tel"
            disabled={isSubmitting}
            {...register("phoneNumber")}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-neutral-900 ${errors.phoneNumber ? "border-red-300 focus:border-red-500" : "border-neutral-200"}`}
            placeholder={t("CHECKOUT.CUSTOMER_DETAILS.PHONE_PLACEHOLDER")}
          />
          {errors.phoneNumber && (
            <p className="mt-2 text-xs text-red-500">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-600"
          >
            {t("CHECKOUT.CUSTOMER_DETAILS.CITY")}
          </label>
          <input
            id="city"
            type="text"
            autoComplete="address-level2"
            disabled={isSubmitting}
            {...register("city")}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-neutral-900 ${errors.city ? "border-red-300 focus:border-red-500" : "border-neutral-200"}`}
            placeholder={t("CHECKOUT.CUSTOMER_DETAILS.CITY_PLACEHOLDER")}
          />
          {errors.city && (
            <p className="mt-2 text-xs text-red-500"> {errors.city.message} </p>
          )}
        </div>
        {/* Street + Building */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Street */}
          <div className="sm:col-span-2">
            <label
              htmlFor="streetAddress"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-600"
            >
              {t("CHECKOUT.CUSTOMER_DETAILS.STREET_ADDRESS")}
            </label>
            <input
              id="streetAddress"
              type="text"
              autoComplete="street-address"
              disabled={isSubmitting}
              {...register("streetAddress")}
              className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-neutral-900 ${errors.streetAddress ? "border-red-300 focus:border-red-500" : "border-neutral-200"}`}
              placeholder={t(
                "CHECKOUT.CUSTOMER_DETAILS.STREET_ADDRESS_PLACEHOLDER",
              )}
            />
            {errors.streetAddress && (
              <p className="mt-2 text-xs text-red-500">
                {errors.streetAddress.message}
              </p>
            )}
          </div>
          {/* Building Number */}
          <div>
            <label
              htmlFor="buildingNumber"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-600"
            >
              {t("CHECKOUT.CUSTOMER_DETAILS.BUILDING_NUMBER")}
            </label>
            <input
              id="buildingNumber"
              type="number"
              min={1}
              disabled={isSubmitting}
              {...register("buildingNumber", { valueAsNumber: true })}
              className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-neutral-900 ${errors.buildingNumber ? "border-red-300 focus:border-red-500" : "border-neutral-200"}`}
              placeholder={t(
                "CHECKOUT.CUSTOMER_DETAILS.BUILDING_NUMBER_PLACEHOLDER",
              )}
            />
            {errors.buildingNumber && (
              <p className="mt-2 text-xs text-red-500">
                {errors.buildingNumber.message}
              </p>
            )}
          </div>
        </div>
        {/* Additional Note */}
        <div>
          <label
            htmlFor="additionalNote"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-600"
          >
            {t("CHECKOUT.CUSTOMER_DETAILS.ADDITIONAL_NOTE")}
            <span className="ml-1 font-normal normal-case tracking-normal text-neutral-400">
              ({t("COMMON.OPTIONAL")})
            </span>
          </label>
          <textarea
            id="additionalNote"
            rows={4}
            disabled={isSubmitting}
            {...register("additionalNote")}
            className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-neutral-900 ${errors.additionalNote ? "border-red-300 focus:border-red-500" : "border-neutral-200"}`}
            placeholder={t(
              "CHECKOUT.CUSTOMER_DETAILS.ADDITIONAL_NOTE_PLACEHOLDER",
            )}
          />
          {errors.additionalNote && (
            <p className="mt-2 text-xs text-red-500">
              {errors.additionalNote.message}
            </p>
          )}
        </div>
        {/* Submit */}
        <div className="border-t border-neutral-100 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-neutral-900 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white shadow-sm transition-all duration-300 hover:bg-black active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? t("CHECKOUT.CUSTOMER_DETAILS.PLACING_ORDER")
              : t("CHECKOUT.CUSTOMER_DETAILS.PLACE_ORDER")}
          </button>
        </div>
      </form>
    </section>
  );
}
export default CustomerDetails;
