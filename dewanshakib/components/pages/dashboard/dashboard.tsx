import DashboardNavbar from "./dashboard-navbar";
import DashboardOverview from "./dashboard-overview";

export default function Dashboard() {
  return (
    <div className="w-full md:px-6">
      <DashboardNavbar />

      <DashboardOverview />
    </div>
  );
}
