import Link from "next/link";
import { theme } from "@/themes";

export default function PromoBanner() {
  return (
    <section className={theme.promoBanner.section}>
      <div className={theme.promoBanner.container}>
        <div className={theme.promoBanner.bannerWrapper}>
          
          {/* الجانب الأيسر البصري (الصورة السينمائية) */}
          <div className={theme.promoBanner.imageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1000&q=80"
              alt="Mid Season Sale"
              className={theme.promoBanner.image}
            />
            <div className={theme.promoBanner.overlay} />
          </div>

          {/* الجانب الأيمن (المحتوى والنصوص الفاخرة) */}
          <div className={theme.promoBanner.contentWrapper}>
            <div className={theme.promoBanner.textWrapper}>
              <span className={theme.promoBanner.badge}>
                Limited Curation
              </span>
              <h2 className={theme.promoBanner.title}>
                Mid Season Sale
              </h2>
              <p className={theme.promoBanner.description}>
                Elevate your everyday layout. Enjoy up to 40% off selected objects across all architectural and lifestyle categories.
              </p>
            </div>

            <Link
              href="/shop"
              className={theme.promoBanner.button}
            >
              <span>Explore Collection</span>
              <span className={theme.promoBanner.buttonArrow}>→</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}