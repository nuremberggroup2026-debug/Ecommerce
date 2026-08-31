import { adminUsers } from "@/features/users/api/users.server.api";
import { UserDataTable } from "../../../../features/users/components/admin/users-data-table";

export default async function UsersPage() {
  const users = (await adminUsers()).data;

  return (
    <div className="container  mx-auto py-10">
      <UserDataTable data={users} />
    </div>
  );
}
