import { auth } from "@/lib/auth/auth";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div>
      <h1>Dashboard</h1>

      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
