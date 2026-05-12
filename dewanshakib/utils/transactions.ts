"use server";
import {
  ITransactionTotals,
  ITransactionTotalsWhere,
} from "@/interfaces/interfaces"; // totals type
import prisma from "@/prisma/prisma"; // prisma client

export async function getTransactionTotalsByUser(
  userId: string,
  from?: Date,
  to?: Date,
): Promise<ITransactionTotals> {
  const where: ITransactionTotalsWhere = { userId }; // base filter

  if (from || to) {
    where.created_at = {}; // add date filter only when needed
    if (from) where.created_at.gte = from; // start date
    if (to) where.created_at.lte = to; // end date
  }

  const totals = await prisma.transactions.groupBy({
    by: ["type"], // group by income/expense
    where, // apply filters
    _sum: { amount: true }, // sum amounts
  });

  const income = totals.find((t) => t.type === "income")?._sum.amount || 0; // income total
  const expense = totals.find((t) => t.type === "expense")?._sum.amount || 0; // expense total

  return { income, expense }; // return totals
}

export async function getTransactionHistoryData(
  userId: string,
  month?: number,
  year?: number,
) {
  const currentDate = new Date();
  const selectedMonth = month ?? currentDate.getMonth() + 1;
  const selectedYear = year ?? currentDate.getFullYear();

  const history = await prisma.monthHistory.findMany({
    where: {
      userId,
      month: selectedMonth,
      year: selectedYear,
    },

    orderBy: {
      day: "asc",
    },
  });

  const data = history.map((item) => ({
    day: item.day,
    income: item.income,
    expense: item.expense,
  }));

  return data;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export async function getYearlyTransactionHistoryData(
  userId: string,
  year?: number,
) {
  const currentDate = new Date();
  const selectedYear = year ?? currentDate.getFullYear();

  const history = await prisma.yearHistory.findMany({
    where: {
      userId,
      year: selectedYear,
    },

    orderBy: {
      month: "asc",
    },
  });

  const data = history.map((item) => ({
    month: monthNames[item.month - 1] || item.month.toString(),
    income: item.income,
    expense: item.expense,
  }));

  return data;
}
