"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

export default function DashboardNavbar() {
  const { data: session } = useSession();

  return (
    <div className="px-5 mb-10 flex flex-col md:flex md:flex-row md:justify-between w-full">
      <h1 className="text-2xl mb-5 md:mb-0 md:text-3xl font-bold">
        Hello, {session?.user.name} 👋
      </h1>

      <div className="flex items-center gap-x-3">
        <Button size={"lg"} variant={"default"}>
          Add Income <BanknoteArrowDown />
        </Button>
        <Button size={"lg"} variant={"destructive"}>
          Add Expense <BanknoteArrowUp />{" "}
        </Button>
      </div>
    </div>
  );
}
