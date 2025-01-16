import ExpenseForm from '../components/expense-form'
import ExpenseList from '../components/expense-list'
import TotalExpenses from '../components/total-expenses'
import { getExpenses } from '../actions'
import ExpenseChart from '@/components/expense-chart'

export default async function Home() {
  const expenses = await getExpenses()

  return (
    <main className="space-y-8">
      <ExpenseForm />
      <ExpenseChart />
      <ExpenseList initialExpenses={expenses} />
      <TotalExpenses />
    </main>
  )
}