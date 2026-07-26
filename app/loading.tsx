export default function Loading() {
  return (
    <main className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-white text-black">
      <div className="flex flex-col items-center space-y-4">
        {/* شريط التحميل الدائري المينيماليزم */}
        <div className="relative h-12 w-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-neutral-200 border-t-black"></div>
        </div>
        
        {/* اسم البراند بلمسة خفيفة */}
        <p className="text-xs uppercase tracking-[0.3em] font-medium text-neutral-400 animate-pulse">
          Loading <span className="text-black font-semibold">AURA</span>
        </p>
      </div>
    </main>
  );
}