
"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-neutral-50/50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">

        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12 mb-16">

          {/* الجانب الأيسر: البراند والاشتراك البريدي */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                AURA<span className="font-light text-neutral-400">.STUDIO</span>
              </h2>
              <p className="max-w-sm text-xs leading-relaxed text-gray-400 font-light">
                A curated retail experience built for simplicity, fluid interaction, and timeless quality goods.
              </p>
            </div>

            {/* حقل الاشتراك البريدي */}
            <div className="space-y-2 max-w-sm">
              <label htmlFor="footer-email" className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 block">
                Stay Updated
              </label>
              <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center">
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-white border border-neutral-200 rounded-2xl px-4 py-3 text-xs text-black placeholder-gray-400 focus:outline-none focus:border-black transition shadow-sm"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 bg-black text-white px-4 py-1.5 text-[10px] font-medium uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition active:scale-95"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* الجانب الأيمن: القوائم والروابط */}
          <div className="grid grid-cols-3 gap-6 sm:gap-8 lg:col-span-7">
            
            {/* Shop */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-900">Shop</h3>
              <ul className="space-y-2.5 text-xs text-gray-400 font-light">
                <li><Link href="/products" className="transition hover:text-black">All Products</Link></li>
                <li><Link href="/categories" className="transition hover:text-black">Categories</Link></li>
                <li><Link href="/best-sellers" className="transition hover:text-black">Best Sellers</Link></li>
                <li><Link href="/new" className="transition hover:text-black">New Arrivals</Link></li>
              </ul>
            </div>

            {/* Account */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-900">Account</h3>
              <ul className="space-y-2.5 text-xs text-gray-400 font-light">
                <li><Link href="/profile" className="transition hover:text-black">Profile</Link></li>
                <li><Link href="/orders" className="transition hover:text-black">Orders</Link></li>
                <li><Link href="/cart" className="transition hover:text-black">Cart</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-900">Support</h3>
              <ul className="space-y-2.5 text-xs text-gray-400 font-light">
                <li><Link href="/contact" className="transition hover:text-black">Contact</Link></li>
                <li><Link href="/faq" className="transition hover:text-black">FAQ</Link></li>
                <li><Link href="/shipping" className="transition hover:text-black">Shipping</Link></li>
                <li><Link href="/returns" className="transition hover:text-black">Returns</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* الحقوق والسياسات */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-200/60 pt-8 text-[11px] text-gray-400 font-light md:flex-row">
          <p>© {new Date().getFullYear()} AURA Studio. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy" className="transition hover:text-black">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-black">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

