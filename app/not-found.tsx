import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";

export default function NotFound() {
  return (
    <main className="min-h-[85vh] w-full flex flex-col items-center justify-center bg-white text-black px-6 text-center">
      <div className="max-w-md w-full space-y-6">
        {/* رمز الخطأ البصري */}
        <div className="space-y-2">
          <h1 className="text-7xl font-light tracking-tighter text-neutral-200 md:text-8xl select-none">
            404
          </h1>
          <h2 className="text-xl font-semibold tracking-tight uppercase">
            Page Not Found
          </h2>
          <p className="text-xs text-neutral-400 font-light max-w-xs mx-auto leading-relaxed">
            The page you are looking for doesn't exist or has been moved to another URL.
          </p>
        </div>

        {/* خط فاصل ناعم متناسق مع النوافذ لديك */}
        <div className="w-12 h-[1px] bg-neutral-200 mx-auto my-8" />

        {/* أزرار التوجيه */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={ROUTES.HOME}
            className="w-full sm:w-auto rounded-full bg-black px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-neutral-800 shadow-sm active:scale-[0.98]"
          >
            Go to Home
          </Link>
          
          <Link
            href={ROUTES.PRODUCTS}
            className="w-full sm:w-auto rounded-full border border-neutral-200 bg-neutral-50/50 px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-600 transition hover:bg-neutral-100 hover:text-black active:scale-[0.98]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}