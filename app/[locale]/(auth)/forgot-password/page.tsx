import { Locale } from "@/types";
import ForgotPasswordForm from "@/features/users/components/auth/ForgotPasswordForm";
import { generateStaticMetadata } from "@/lib/constants/metadata";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const locale = (await params).locale;
  return generateStaticMetadata("forgotPassword", locale);
};

export default function page() {
  return (
    <div>
      <ForgotPasswordForm />
    </div>
  );
}
