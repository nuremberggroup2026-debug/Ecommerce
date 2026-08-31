export const SITE_TITLE = process.env.APP_NAME ?? "AURA";

export const SITE_DESCRIPTION =
  process.env.APP_DESCRIPTION ?? "AURA description";

export const siteMetadata = {
  en: {
    title: "Aura",
    description:
      "Discover our products and enjoy a seamless online shopping experience.",
  },
  ar: {
    title: "اورا",
    description: "اكتشف منتجاتنا واستمتع بتجربة تسوق إلكترونية سهلة ومميزة.",
  },
};

export const SITE_URL = process.env.APP_URL ?? "http://localhost:3000";

export type PageName =
  | "home"
  | "aboutUs"
  | "categories"
  | "products"
  | "login"
  | "register"
  | "changePassword"
  | "resetPassword"
  | "forgotPassword"
  | "verifyEmail"
  | "wishlist"
  | "cart"
  | "orders"
  | "wishlist"
  | "careers"
  | "checkout";

export type DynamicMetadataType =
  | "products"
  | "orders"
  | "careers"
  | "applications";

export const COMMON_KEYWORDS = [
  // English
  // Arabic
] as const;

export const staticMetadata: Record<
  PageName,
  {
    en: { title: string; description: string };
    ar: { title: string; description: string };
  }
> = {
  home: {
    en: {
      title: "Home",
      description:
        "Discover our products and enjoy a seamless online shopping experience.",
    },
    ar: {
      title: "الرئيسية",
      description: "اكتشف منتجاتنا واستمتع بتجربة تسوق إلكترونية سهلة ومميزة.",
    },
  },

  aboutUs: {
    en: {
      title: "About Us",
      description:
        "Learn more about us, our story, and our commitment to providing quality products and services.",
    },
    ar: {
      title: "من نحن",
      description:
        "تعرّف علينا وعلى قصتنا والتزامنا بتقديم منتجات وخدمات ذات جودة عالية.",
    },
  },

  categories: {
    en: {
      title: "Categories",
      description:
        "Explore our product categories and find the products that suit your needs.",
    },
    ar: {
      title: "الفئات",
      description:
        "استكشف فئات منتجاتنا واعثر على المنتجات التي تناسب احتياجاتك.",
    },
  },

  products: {
    en: {
      title: "Products",
      description:
        "Explore our products and discover a wide selection of quality items.",
    },
    ar: {
      title: "المنتجات",
      description: "تصفح منتجاتنا واكتشف مجموعة متنوعة من المنتجات ذات الجودة.",
    },
  },

  cart: {
    en: {
      title: "Shopping Cart",
      description:
        "Review the items in your shopping cart and proceed with your order.",
    },
    ar: {
      title: "سلة التسوق",
      description: "راجع المنتجات في سلة التسوق الخاصة بك وتابع لإتمام طلبك.",
    },
  },

  orders: {
    en: {
      title: "My Orders",
      description: "View and manage your orders and track your purchases.",
    },
    ar: {
      title: "طلباتي",
      description: "اطلع على طلباتك وقم بإدارتها وتتبع مشترياتك.",
    },
  },

  wishlist: {
    en: {
      title: "Wishlist",
      description:
        "Save your favorite products to your wishlist and find them whenever you need them.",
    },
    ar: {
      title: "المفضلة",
      description:
        "احفظ منتجاتك المفضلة في قائمة المفضلة للرجوع إليها متى شئت.",
    },
  },

  login: {
    en: {
      title: "Login",
      description:
        "Log in to your account to access your orders, wishlist, and personalized shopping experience.",
    },
    ar: {
      title: "تسجيل الدخول",
      description:
        "سجّل الدخول إلى حسابك للوصول إلى طلباتك ومفضلاتك والاستمتاع بتجربة تسوق مخصصة.",
    },
  },

  register: {
    en: {
      title: "Create an Account",
      description:
        "Create your account and enjoy a seamless and personalized shopping experience.",
    },
    ar: {
      title: "إنشاء حساب",
      description: "أنشئ حسابك واستمتع بتجربة تسوق سهلة ومخصصة.",
    },
  },
  changePassword: {
    en: {
      title: "Change Password",
      description: "Change your account password to keep your account secure.",
    },
    ar: {
      title: "تغيير كلمة المرور",
      description: "غيّر كلمة مرور حسابك للحفاظ على أمان حسابك.",
    },
  },

  resetPassword: {
    en: {
      title: "Reset Password",
      description:
        "Reset your password and regain secure access to your account.",
    },
    ar: {
      title: "إعادة تعيين كلمة المرور",
      description: "أعد تعيين كلمة المرور واستعد الوصول الآمن إلى حسابك.",
    },
  },

  forgotPassword: {
    en: {
      title: "Forgot Password",
      description:
        "Forgot your password? Enter your email address to reset your password.",
    },
    ar: {
      title: "نسيت كلمة المرور",
      description:
        "هل نسيت كلمة المرور؟ أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور.",
    },
  },

  verifyEmail: {
    en: {
      title: "Verify Email",
      description:
        "Verify your email address to activate and secure your account.",
    },
    ar: {
      title: "تأكيد البريد الإلكتروني",
      description: "أكد بريدك الإلكتروني لتفعيل حسابك والحفاظ على أمان حسابك.",
    },
  },

  careers: {
    en: {
      title: "Careers",
      description:
        "Explore career opportunities and join our team. Find your next opportunity with us.",
    },
    ar: {
      title: "الوظائف",
      description:
        "استكشف الفرص الوظيفية وانضم إلى فريقنا. اعثر على فرصتك القادمة معنا.",
    },
  },
  checkout: {
    en: {
      title: "Checkout",
      description:
        "Complete your order securely by providing your details and choosing your preferred payment method.",
    },
    ar: {
      title: "إتمام الطلب",
      description:
        "أكمل طلبك بأمان من خلال إدخال بياناتك واختيار طريقة الدفع المفضلة لديك.",
    },
  },
};
