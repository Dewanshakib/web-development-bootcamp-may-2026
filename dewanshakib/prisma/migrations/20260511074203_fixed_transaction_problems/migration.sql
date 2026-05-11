/*
  Warnings:

  - A unique constraint covering the columns `[userId,type,name]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[day,month,year,userId]` on the table `month_history` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[month,year,userId]` on the table `year_history` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "category_userId_type_name_idx";

-- CreateIndex
CREATE UNIQUE INDEX "category_userId_type_name_key" ON "category"("userId", "type", "name");

-- CreateIndex
CREATE UNIQUE INDEX "month_history_day_month_year_userId_key" ON "month_history"("day", "month", "year", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "year_history_month_year_userId_key" ON "year_history"("month", "year", "userId");
