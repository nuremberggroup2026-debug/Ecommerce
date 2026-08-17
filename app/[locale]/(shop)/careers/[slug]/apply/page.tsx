import ApplicationPage from "@/features/applications/components/ApplicationPage";
import { careerBySlug } from "@/features/careers/api/careers.server.api";
import { Locale } from "@/types";

interface Props {
  params: Promise<{ slug: string; locale: Locale }>;
}

async function page({ params }: Props) {
  const { slug, locale } = await params;
  const career = (await careerBySlug(slug, locale)).data;

  return (
    <div>
      <ApplicationPage career={career} />
    </div>
  );
}

export default page;
