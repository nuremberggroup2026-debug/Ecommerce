import { Locale } from "@/types";
import type { Metadata } from "next";
import {
  type PageName,
  type DynamicMetadataType,
  COMMON_KEYWORDS,
  staticMetadata,
  SITE_TITLE,
  SITE_URL,
  siteMetadata,
} from "./metadataConstants";

/*     **********************     Site Metadata     ***********************/

export const generateSiteMetadata = (locale: Locale): Metadata => {
  const metadata = siteMetadata[locale];

  const isArabic = locale === "ar";
  const localeTag = isArabic ? "ar_JO" : "en_US";

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      siteName: metadata.title,
      locale: localeTag,
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: ["/og-image.jpg"],
    },
  };
};

/*     **********************     Static Metadata     ***********************/

export const generateStaticMetadata = (
  pageName: PageName,
  locale: Locale,
): Metadata => {
  const keywords = [SITE_TITLE, ...Array.from(COMMON_KEYWORDS)];
  const isArabic = locale === "ar";
  const localeTag = isArabic ? "ar-JO" : "en-US";
  const pageMetadata = staticMetadata[pageName][locale];
  const publicPath: Record<PageName, string> = {
    home: "",
    cart: "cart",
    wishlist: "wishlist",
    orders: "orders",
    products: "products",
    categories: "categories",
    careers: "careers",
    aboutUs: "about-us",
    login: "login",
    verifyEmail: "verify-email",
    resetPassword: "reset-password",
    forgotPassword: "forgot-password",
    changePassword: "change-password",
    register: "register",
    checkout: "checkout",
  };
  const canonicalUrl = `${SITE_URL}/${publicPath[pageName]}`;
  return {
    title: `${pageMetadata.title} | ${SITE_TITLE} `,
    description: pageMetadata.description,
    keywords,
    openGraph: {
      title: pageMetadata.title,
      description: pageMetadata.description,
      url: canonicalUrl,
      siteName: SITE_TITLE,
      locale: localeTag,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: pageName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageMetadata.title} | ${SITE_TITLE} `,
      description: pageMetadata.description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
};

/*     **********************     Dynamic Metadata    ***********************/

export const generateDynamicMetadata = {
  page: (opts: {
    type: DynamicMetadataType;
    name: string;
    description?: string;
    itemPath: string;
    imageUrl?: string;
    locale: "en" | "ar";
  }): Metadata => {
    const isArabic = opts.locale === "ar";
    const localeTag = isArabic ? "ar-JO" : "en-US";

    const typeLabels: Record<DynamicMetadataType, { en: string; ar: string }> =
      {
        products: { en: "Products", ar: "المنتجات" },
        orders: { en: "My Orders", ar: "طلباتي" },
        careers: { en: "Careers", ar: "الوظائف" },
        applications: { en: "Apply Now", ar: "قدم الأن" },
      };

    const pathSegments: Record<DynamicMetadataType, string> = {
      products: "products",
      orders: "orders",
      careers: "careers",
      applications: `careers`,
    };

    const defaultDesc: Record<DynamicMetadataType, { en: string; ar: string }> =
      {
        products: {
          en: `${opts.name} at ${SITE_TITLE}. Explore product details, features, and more.`,
          ar: `${opts.name} لدى ${SITE_TITLE}. تعرّف على تفاصيل المنتج ومميزاته والمزيد.`,
        },

        orders: {
          en: `View order ${opts.name} at ${SITE_TITLE}. Check your order details, status, and information.`,
          ar: `اطلع على تفاصيل الطلب ${opts.name} لدى ${SITE_TITLE}. تحقق من حالة طلبك وتفاصيله ومعلوماته.`,
        },

        careers: {
          en: `Explore the ${opts.name} career opportunity at ${SITE_TITLE}. Learn more about the role and apply today.`,
          ar: `تعرّف على فرصة العمل لوظيفة ${opts.name} لدى ${SITE_TITLE}. اطلع على تفاصيل الوظيفة وقدّم طلبك اليوم.`,
        },
        applications: {
          en: `Apply for the ${opts.name} position at ${SITE_TITLE}. Review the job details and submit your application today.`,
          ar: `قدّم طلبك لوظيفة ${opts.name} لدى ${SITE_TITLE}. اطلع على تفاصيل الوظيفة وقدّم طلبك اليوم.`,
        },
      };

    const typeLabel = typeLabels[opts.type][opts.locale ?? "en"];
    const description =
      opts.description ?? defaultDesc[opts.type][opts.locale ?? "en"];

    const segment = pathSegments[opts.type];
    const publicPath = `${segment}/${opts.itemPath}`;
    const canonicalUrl = `${SITE_URL}/${publicPath}`;
    const altEn = `${SITE_URL}/en/${segment}/${opts.itemPath}`;
    const altAr = `${SITE_URL}/ar/${segment}/${opts.itemPath}`;

    const keywords = [
      SITE_TITLE,
      opts.name,
      typeLabel,
      ...Array.from(COMMON_KEYWORDS),
    ];

    const title = `${opts.name} | ${SITE_TITLE}`;

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: canonicalUrl,
        languages: {
          en: altEn,
          ar: altAr,
        },
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: SITE_TITLE,
        locale: localeTag,
        type: "website",
        images: [
          {
            url: opts.imageUrl ? opts.imageUrl : `${SITE_URL}/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: opts.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [opts.imageUrl ? opts.imageUrl : `${SITE_URL}/og-image.jpg`],
      },
    };
  },
};
