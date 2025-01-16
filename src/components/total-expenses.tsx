import { getTotalExpenses } from '../actions'

export default async function TotalExpenses() {
  const total = await getTotalExpenses()

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-2xl font-bold">Total Expenses</h2>
      <p className="text-3xl font-bold text-green-600">₹{total.toFixed(2)}</p>
    </div>
  )
}

