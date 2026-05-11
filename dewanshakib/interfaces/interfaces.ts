export interface ITransactionType {
  type: "income" | "expense";
}

export interface ITransactionRow  {
  id: string;
  amount: number;
  description: string | null;
  category_icon: string;
  category_name: string;
  type: string;
  created_at: Date;
};

export interface ITransactionsPageProps  {
  searchParams?: {
    page?: string;
    limit?: string;
    orderBy?: string;
    orderDir?: string;
  };
};