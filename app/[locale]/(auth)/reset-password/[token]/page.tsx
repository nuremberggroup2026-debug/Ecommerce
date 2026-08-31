import { Locale } from "@/types";
import ResetPasswordForm from "@/features/users/components/auth/ResetPasswordForm";
import { generateStaticMetadata } from "@/lib/constants/metadata";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const locale = (await params).locale;
  return generateStaticMetadata("resetPassword", locale);
};

export default function page() {
  return (
    <div>
      <ResetPasswordForm />
    </div>
  );
}
