import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DashboardOverview() {
  return (
    <div className="">
      <div className="px-5 mb-3">
        <h1 className="font-bold text-2xl md:text-3xl">Overview</h1>
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Income</CardDescription>
            <CardTitle className="text-2xl mt-3 font-semibold tabular-nums @[250px]/card:text-3xl">
              $100.00
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <TrendingUp color="green" />
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Expense</CardDescription>
            <CardTitle className="text-2xl mt-3 font-semibold tabular-nums @[250px]/card:text-3xl">
              $50.00
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <TrendingDown color="red" />
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Balance</CardDescription>
            <CardTitle className="text-2xl mt-3 font-semibold tabular-nums @[250px]/card:text-3xl">
              $400.00
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <Wallet />
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
