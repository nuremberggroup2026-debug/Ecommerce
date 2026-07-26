import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("Home");
  

  return <h1>{t("title")}</h1>;
}
