import { Locale } from "@/types";
import ChangePasswordForm from "@/features/users/components/auth/ChangePasswordForm";
import { generateStaticMetadata } from "@/lib/constants/metadata";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const locale = (await params).locale;
  return generateStaticMetadata("changePassword", locale);
};

export default function page() {
  return (
    <div>
      <ChangePasswordForm />
    </div>
  );
}
