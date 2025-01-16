import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BarChart from "@/components/ui/barchart";
import { getExpensesByDate } from "../actions";

export default async function ExpenseChart() {
  const expenseData = await getExpensesByDate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Chart</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div style={{ width: "100%", height: "350px" }} className="flex justify-center items-center w-full">
          <BarChart
            data={expenseData.map((item) => ({
              label: item.date,
              value: item.totalAmount,
            }))}
            width={700}
            height={350}
          />
        </div>
      </CardContent>
    </Card>
  );
}
