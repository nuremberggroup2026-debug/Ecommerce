export default function TooManyRequestsPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-yellow-600">429 - Too Many Requests</h1>
      <p className="mt-2 text-gray-600">لقد قمت بالكثير من الطلبات في وقت قصير. يرجى الانتظار قليلاً.</p>
    </div>
  );
}