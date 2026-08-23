"use client";
import { useForm } from "react-hook-form";
import { Locale, OrderFormDataType } from "../types/index";
import { createOrderFrontendSchema } from "@/server/orders/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastResponse } from "@/lib/toast";
import { placeAnOrder } from "../api/checkout.client.api";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { theme } from "@/themes";

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

  return (
    <section className={theme.customerDetails.section}>
      <form onSubmit={handleSubmit(onSubmit)} className={theme.customerDetails.form}>
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className={theme.customerDetails.label}
          >
            {t("CHECKOUT.CUSTOMER_DETAILS.EMAIL")}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            disabled={isSubmitting}
            {...register("email")}
            className={theme.customerDetails.input(!!errors.email)}
            placeholder={t("CHECKOUT.CUSTOMER_DETAILS.EMAIL_PLACEHOLDER")}
          />
          {errors.email && (
            <p className={theme.customerDetails.errorText}>{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phoneNumber"
            className={theme.customerDetails.label}
          >
            {t("CHECKOUT.CUSTOMER_DETAILS.PHONE")}
          </label>
          <input
            id="phoneNumber"
            type="tel"
            autoComplete="tel"
            disabled={isSubmitting}
            {...register("phoneNumber")}
            className={theme.customerDetails.input(!!errors.phoneNumber)}
            placeholder={t("CHECKOUT.CUSTOMER_DETAILS.PHONE_PLACEHOLDER")}
          />
          {errors.phoneNumber && (
            <p className={theme.customerDetails.errorText}>
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="city"
            className={theme.customerDetails.label}
          >
            {t("CHECKOUT.CUSTOMER_DETAILS.CITY")}
          </label>
          <input
            id="city"
            type="text"
            autoComplete="address-level2"
            disabled={isSubmitting}
            {...register("city")}
            className={theme.customerDetails.input(!!errors.city)}
            placeholder={t("CHECKOUT.CUSTOMER_DETAILS.CITY_PLACEHOLDER")}
          />
          {errors.city && (
            <p className={theme.customerDetails.errorText}> {errors.city.message} </p>
          )}
        </div>

        {/* Street + Building */}
        <div className={theme.customerDetails.gridRow}>
          {/* Street */}
          <div className={theme.customerDetails.streetCol}>
            <label
              htmlFor="streetAddress"
              className={theme.customerDetails.label}
            >
              {t("CHECKOUT.CUSTOMER_DETAILS.STREET_ADDRESS")}
            </label>
            <input
              id="streetAddress"
              type="text"
              autoComplete="street-address"
              disabled={isSubmitting}
              {...register("streetAddress")}
              className={theme.customerDetails.input(!!errors.streetAddress)}
              placeholder={t(
                "CHECKOUT.CUSTOMER_DETAILS.STREET_ADDRESS_PLACEHOLDER",
              )}
            />
            {errors.streetAddress && (
              <p className={theme.customerDetails.errorText}>
                {errors.streetAddress.message}
              </p>
            )}
          </div>
          {/* Building Number */}
          <div>
            <label
              htmlFor="buildingNumber"
              className={theme.customerDetails.label}
            >
              {t("CHECKOUT.CUSTOMER_DETAILS.BUILDING_NUMBER")}
            </label>
            <input
              id="buildingNumber"
              type="number"
              min={1}
              disabled={isSubmitting}
              {...register("buildingNumber", { valueAsNumber: true })}
              className={theme.customerDetails.input(!!errors.buildingNumber)}
              placeholder={t(
                "CHECKOUT.CUSTOMER_DETAILS.BUILDING_NUMBER_PLACEHOLDER",
              )}
            />
            {errors.buildingNumber && (
              <p className={theme.customerDetails.errorText}>
                {errors.buildingNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Additional Note */}
        <div>
          <label
            htmlFor="additionalNote"
            className={theme.customerDetails.label}
          >
            {t("CHECKOUT.CUSTOMER_DETAILS.ADDITIONAL_NOTE")}
            <span className={theme.customerDetails.optionalLabel}>
              {" "} ({t("COMMON.OPTIONAL")})
            </span>
          </label>
          <textarea
            id="additionalNote"
            rows={4}
            disabled={isSubmitting}
            {...register("additionalNote")}
            className={theme.customerDetails.textarea(!!errors.additionalNote)}
            placeholder={t(
              "CHECKOUT.CUSTOMER_DETAILS.ADDITIONAL_NOTE_PLACEHOLDER",
            )}
          />
          {errors.additionalNote && (
            <p className={theme.customerDetails.errorText}>
              {errors.additionalNote.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className={theme.customerDetails.submitSection}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={theme.customerDetails.submitButton}
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