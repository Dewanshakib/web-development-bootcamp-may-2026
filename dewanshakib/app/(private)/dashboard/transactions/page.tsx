import Transactions from "@/components/pages/dashboard/transactions/transactions";

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    orderBy?: string;
    orderDir?: string;
  }>;
}) {
  const params = await searchParams;

  return <Transactions searchParams={params} />;
}
