"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getTransactionHistoryData, getYearlyTransactionHistoryData } from "@/utils/transactions";

const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

type ViewType = "monthly" | "yearly";

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },

  expense: {
    label: "Expense",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function TransactionHistoryChart({
  userId,
  initialMonthlyData,
  initialYearlyData,
}: {
  userId: string;
  initialMonthlyData: { day: number; income: number; expense: number }[];
  initialYearlyData: { month: string; income: number; expense: number }[];
}) {
  const [viewType, setViewType] = React.useState<ViewType>("monthly");
  const [month, setMonth] = React.useState(new Date().getMonth() + 1);
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [monthlyData, setMonthlyData] = React.useState(initialMonthlyData);
  const [yearlyData, setYearlyData] = React.useState(initialYearlyData);
  const [loading, setLoading] = React.useState(false);

  const fetchMonthlyData = async (m: number, y: number) => {
    setLoading(true);
    const data = await getTransactionHistoryData(userId, m, y);
    setMonthlyData(data);
    setLoading(false);
  };

  const fetchYearlyData = async (y: number) => {
    setLoading(true);
    const data = await getYearlyTransactionHistoryData(userId, y);
    setYearlyData(data);
    setLoading(false);
  };

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
    fetchMonthlyData(newMonth, year);
  };

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    if (viewType === "monthly") {
      fetchMonthlyData(month, newYear);
    } else {
      fetchYearlyData(newYear);
    }
  };

  const handleViewTypeChange = (newView: ViewType) => {
    setViewType(newView);
    if (newView === "monthly") {
      fetchMonthlyData(month, year);
    } else {
      fetchYearlyData(year);
    }
  };

  return (
    <Card className="border-none shadow-none mt-10">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-3xl font-bold">Transaction History</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex rounded-md bg-muted p-1">
              <button
                onClick={() => handleViewTypeChange("monthly")}
                className={`rounded-sm px-3 py-1 text-sm font-medium transition-all ${
                  viewType === "monthly"
                    ? "bg-background text-foreground shadow"
                    : "text-muted-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => handleViewTypeChange("yearly")}
                className={`rounded-sm px-3 py-1 text-sm font-medium transition-all ${
                  viewType === "yearly"
                    ? "bg-background text-foreground shadow"
                    : "text-muted-foreground"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Select
            value={year.toString()}
            onValueChange={(value) => handleYearChange(Number(value))}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {viewType === "monthly" && (
            <Select
              value={month.toString()}
              onValueChange={(value) => handleMonthChange(Number(value))}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m.value} value={m.value.toString()}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex h-[350px] items-center justify-center">
            <span className="text-muted-foreground">Loading...</span>
          </div>
        ) : viewType === "monthly" ? (
          monthlyData.length === 0 ? (
            <div className="flex h-[350px] items-center justify-center text-muted-foreground">
              No information to show
            </div>
          ) : (
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <LineChart accessibilityLayer data={monthlyData}>
                <CartesianGrid vertical={false} />

                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />

                <YAxis tickLine={false} axisLine={false} tickMargin={8} />

                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="var(--color-income)"
                  strokeWidth={3}
                  dot={false}
                />

                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="var(--color-expense)"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          )
        ) : yearlyData.length === 0 ? (
          <div className="flex h-[350px] items-center justify-center text-muted-foreground">
            No information to show
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart accessibilityLayer data={yearlyData}>
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />

              <YAxis tickLine={false} axisLine={false} tickMargin={8} />

              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

              <Bar dataKey="income" fill="var(--color-income)" radius={6} />

              <Bar dataKey="expense" fill="var(--color-expense)" radius={6} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}