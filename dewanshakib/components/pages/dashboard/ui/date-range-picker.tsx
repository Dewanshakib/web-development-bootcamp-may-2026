"use client";

import { addDays, differenceInCalendarDays, format } from "date-fns"; 
import { CalendarIcon } from "lucide-react"; 
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button"; 
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; 
import { useState } from "react"; 
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DateRangePicker() {
  const router = useRouter(); 
  const maxRangeDays = 60;
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  }); // local state

  const handleSelect = (range: DateRange | undefined) => {
    if (!range?.from) return;
    
    const overLimit =
      range?.from &&
      range.to &&
      differenceInCalendarDays(range.to, range.from) > maxRangeDays;
    const nextRange = overLimit
      ? { from: range.from, to: addDays(range.from, maxRangeDays) }
      : range;

    if (overLimit) {
      toast.error(`Please select a range of ${maxRangeDays} days or less.`);
    }

    setDate(nextRange);

    if (!nextRange?.from) return;
    const params = new URLSearchParams(); 
    params.set("from", nextRange.from.toISOString());
    if (nextRange.to) {
      params.set("to", nextRange.to.toISOString());
    }
    router.push(`/dashboard?${params.toString()}`); 
  }; 

  return (
    <Field className="w-full sm:w-auto">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start px-2.5 font-normal sm:w-[260px]"
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
