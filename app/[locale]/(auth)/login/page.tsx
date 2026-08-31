import LoginForm from "@/features/users/components/auth/LoginForm";
import { Locale } from "@/types";
import { generateStaticMetadata } from "@/lib/constants/metadata";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const locale = (await params).locale;
  return generateStaticMetadata("login", locale);
};

export default function page() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
