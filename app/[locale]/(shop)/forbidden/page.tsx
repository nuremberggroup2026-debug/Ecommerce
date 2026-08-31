export default function ForbiddenPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-600">403 - Forbidden</h1>
      <p className="mt-2 text-gray-600">عذراً، لا تمتلك الصلاحيات الكافية لعرض هذه الصفحة.</p>
    </div>
  );
}