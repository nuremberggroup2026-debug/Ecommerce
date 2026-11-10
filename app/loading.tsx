export default function Loading() {
  return (
    <main className="min-h-[90vh] w-full flex flex-col items-center justify-center bg-white text-black">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative h-12 w-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-neutral-200 border-t-black"></div>
        </div>
      </div>
    </main>
  );
}
