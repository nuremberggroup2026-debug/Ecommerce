import { dashboardNumbers } from "@/features/dashboardNumbers/api/dashboard-server-api";
import { DashboardStats } from "@/features/dashboardNumbers/components/DashboardStats";
import { QuickActions } from "@/features/dashboardNumbers/components/QuickActions";

export default async function Page() {
  const numbers = await dashboardNumbers();

  return (
    <main className="min-h-screen  pb-6">
      <div className="mx-auto max-w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row  border-b border-gray-300 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Overview</p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-950">
              Dashboard
            </h1>

            <p className="mt-2 text-sm mb-1 text-gray-500">
              Manage your store and keep track of its activity.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <DashboardStats numbers={numbers.data} />

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </main>
  );
}
