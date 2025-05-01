import DashboardMetrics from "@/components/modules/dashboard/userMeta/DashboardMetrics";
import { getMeta } from "@/services/MetaService";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard",
  description: "View your shop performance and analytics",
};

const UserDashboardPage = async () => {
  const { data } = await getMeta();

  return (
    <div className="container mx-auto px-4 py-6">
      <DashboardMetrics data={data} />
    </div>
  );
};

export default UserDashboardPage;
