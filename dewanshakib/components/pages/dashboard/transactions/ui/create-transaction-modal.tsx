"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTransactionSchema,
  type CreateTransactionInput,
} from "@/lib/schema";
import { createTransactionAction } from "@/app/actions/transactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { ITransactionType } from "@/interfaces/interfaces";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface CreateTransactionModalProps extends ITransactionType {
  modalTrigger: React.ReactNode;
}

export default function CreateTransactionModal({
  type,
  modalTrigger,
}: CreateTransactionModalProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    mode: "onChange",
    defaultValues: {
      type,
      date: new Date(),
    },
  });

  async function onSubmit(data: CreateTransactionInput) {
    const formData = new FormData();
    formData.set("amount", String(data.amount));
    if (data.description) {
      formData.set("description", data.description);
    }
    formData.set("category_icon", data.category_icon);
    formData.set("category_name", data.category_name);
    formData.set("type", data.type);
    formData.set(
      "date",
      data.date instanceof Date ? data.date.toISOString() : String(data.date),
    );

    const result = await createTransactionAction(formData);

    if (result.status === "success") {
      toast.success(result.message ?? "Transaction created");
      setOpen(false);
      return;
    }

    toast.error(result.message ?? "Server Error");
  }

  const watchDate = watch("date");
  const isBusy = isSubmitting;

  const handleSelectChange = (
    field: keyof CreateTransactionInput,
    value?: Date,
  ) => {
    setValue(field, value, { shouldValidate: true, shouldDirty: true });
    void trigger(field);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{modalTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle className="capitalize">Add {type}</DialogTitle>
            <DialogDescription>
              Add a new {type} transaction to track your finances.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("amount")}
                aria-invalid={!!errors.amount}
              />
              {errors.amount && (
                <span className="text-xs text-destructive">
                  {errors.amount.message}
                </span>
              )}
            </Field>

            <Field>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                placeholder="e.g. Monthly salary"
                {...register("description")}
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <span className="text-xs text-destructive">
                  {errors.description.message}
                </span>
              )}
            </Field>

            <Field>
              <Label htmlFor="category_name">Category Name</Label>
              <Input
                id="category_name"
                type="text"
                placeholder="e.g. Salary, Food, Rent"
                {...register("category_name")}
                aria-invalid={!!errors.category_name}
              />
              {errors.category_name && (
                <span className="text-xs text-destructive">
                  {errors.category_name.message}
                </span>
              )}
            </Field>

            <Field>
              <Label htmlFor="category_icon">Category Icon</Label>
              <Input
                id="category_icon"
                type="text"
                placeholder="e.g. 💰 or wallet"
                {...register("category_icon")}
                aria-invalid={!!errors.category_icon}
              />
              {errors.category_icon && (
                <span className="text-xs text-destructive">
                  {errors.category_icon.message}
                </span>
              )}
            </Field>

            <Field>
              <Label htmlFor="transaction_date">Transaction Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!watchDate}
                    className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    <CalendarIcon />

                    {watchDate ? (
                      format(watchDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={watchDate}
                    onSelect={(value) => handleSelectChange("date", value)}
                  />
                </PopoverContent>
              </Popover>
              {errors.date && (
                <span className="text-xs text-destructive">
                  {errors.date.message}
                </span>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isBusy}
            >
              {isBusy ? "Creating..." : `Add ${type}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
