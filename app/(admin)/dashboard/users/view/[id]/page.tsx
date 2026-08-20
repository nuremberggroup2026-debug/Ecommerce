import { adminUserById } from "@/features/users/api/users.server.api";
import ViewUser from "@/features/users/components/admin/ViewUsers";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await adminUserById(id);
  const user = response.data;

  if (!user) {
    return <div className="p-6">User not found</div>;
  }

  return (
    <div className="p-6">
      <ViewUser user={user} />
    </div>
  );
}
