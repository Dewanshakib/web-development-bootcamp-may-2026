import React from "react";
import DashboardNavbar from "./dashboard-navbar";
import DashboardOverview from "./dashboard-overview";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  return (
    <div className="w-full">
      <DashboardNavbar />

      <DashboardOverview />
    </div>
  );
}
