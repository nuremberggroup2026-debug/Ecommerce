import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[32px] bg-neutral-50 border border-neutral-100 shadow-sm grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[420px]">
          
          {/* الجانب الأيسر البصري (الصورة السينمائية) */}
          <div className="relative md:col-span-5 min-h-[260px] md:min-h-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1000&q=80"
              alt="Mid Season Sale"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/20 to-transparent" />
          </div>

          {/* الجانب الأيمن (المحتوى والنصوص الفاخرة) */}
          <div className="md:col-span-7 flex flex-col justify-center items-start p-8 sm:p-12 md:p-16 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block">
                Limited Curation
              </span>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-neutral-900 leading-tight">
                Mid Season Sale
              </h2>
              <p className="max-w-md text-sm text-gray-400 font-light leading-relaxed">
                Elevate your everyday layout. Enjoy up to 40% off selected objects across all architectural and lifestyle categories.
              </p>
            </div>

            <Link
              href="/shop"
              className="group relative inline-flex items-center gap-4 bg-black px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white rounded-full overflow-hidden transition-all shadow-sm hover:bg-neutral-800 active:scale-[0.98]"
            >
              <span>Explore Collection</span>
              <span className="text-neutral-400 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}