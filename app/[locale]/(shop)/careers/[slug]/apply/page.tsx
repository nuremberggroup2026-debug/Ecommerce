import notFound from "@/app/not-found";
import ApplicationPage from "@/features/applications/components/shop/ApplicationPage";
import { careerBySlug } from "@/features/careers/api/careers.server.api";
import { generateDynamicMetadata } from "@/lib/constants/metadata";
import { Locale } from "@/types";

interface Props {
  params: Promise<{ slug: string; locale: Locale }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const career = (await careerBySlug(slug, locale)).data;
  if (!career) return notFound();
  const metadata = generateDynamicMetadata.page({
    type: "applications",
    name: career.position,
    imageUrl: career.image,
    itemPath: `${career.slug}/apply`,
    locale,
  });

  return metadata;
}

async function page({ params }: Props) {
  const { slug, locale } = await params;
  const career = (await careerBySlug(slug, locale)).data;
  if (!career) return notFound();

  return (
    <div>
      <ApplicationPage career={career} />
    </div>
  );
}

export default page;
