export default function ServerErrorPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-gray-800">500 / 503 - Server Error</h1>
      <p className="mt-2 text-gray-600">نواجه مشكلة مؤقتة في الخادم أو أن الموقع تحت الصيانة.</p>
    </div>
  );
}