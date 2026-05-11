import { z } from "zod/v3";

export const createTransactionSchema = z.object({
  amount: z.coerce
    .number()
    .positive({ message: "Amount must be greater than 0" }),
  description: z.string().optional(),
  category_icon: z.string().min(1, { message: "Category icon is required" }),
  category_name: z.string().min(1, { message: "Category name is required" }),
  type: z.enum(["income", "expense"]),
  date: z.coerce.date({message:"Please enter the datetime"}),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
