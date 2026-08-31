import { Locale } from "@/types";
import VerifyEmailForm from "@/features/users/components/auth/VerifyEmailForm";
import { generateStaticMetadata } from "@/lib/constants/metadata";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const locale = (await params).locale;
  return generateStaticMetadata("verifyEmail", locale);
};

export default function page() {
  return (
    <div>
      <VerifyEmailForm />
    </div>
  );
}
