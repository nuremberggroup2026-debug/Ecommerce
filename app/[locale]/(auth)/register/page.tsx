import { Locale } from "@/types";
import RegisterForm from "@/features/users/components/auth/RegisterForm";
import { generateStaticMetadata } from "@/lib/constants/metadata";
interface Props {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const locale = (await params).locale;
  return generateStaticMetadata("register", locale);
};

export default function page() {
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
