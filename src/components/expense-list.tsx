'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateExpense, deleteExpense } from '../actions'
import type { Expense } from '../actions'

interface ExpenseListProps {
  initialExpenses: Expense[]
}

function formatDate(date: Date): string {
    return date.toISOString().split('T')[0].split('-').reverse().join('-'); 
}

function groupExpensesByDate(expenses: Expense[]): Record<string, Expense[]> {
  return expenses.reduce((acc, expense) => {
    const date = formatDate(new Date(expense.date))
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(expense)
    return acc
  }, {} as Record<string, Expense[]>)
}

export default function ExpenseList({ initialExpenses }: ExpenseListProps) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editDescription, setEditDescription] = useState('')
  const [editAmount, setEditAmount] = useState('')
  const router = useRouter()

  const groupedExpenses = groupExpensesByDate(expenses)

  const handleEdit = (expense: Expense) => {
    setEditingId(expense.id)
    setEditDescription(expense.description)
    setEditAmount(expense.amount.toString())
  }

  const handleUpdate = async (id: number) => {
    await updateExpense(id, editDescription, parseFloat(editAmount))
    setExpenses(expenses.map(expense => 
      expense.id === id 
        ? { ...expense, description: editDescription, amount: parseFloat(editAmount) } 
        : expense
    ))
    setEditingId(null)
    router.refresh()
  }

  const handleDelete = async (id: number) => {
    await deleteExpense(id)
    setExpenses(expenses.filter(expense => expense.id !== id))
    router.refresh()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Expense List</h2>
      {Object.entries(groupedExpenses).map(([date, dateExpenses]) => (
        <div key={date} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{date}</h3>
          <ul className="space-y-4 items-center justify-center">
            {dateExpenses.map((expense) => (
              <li key={expense.id} className="bg-gray-100 p-4 rounded shadow">
                {editingId === expense.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      step="1.00"
                    />
                    <button onClick={() => handleUpdate(expense.id)} className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <p className="font-bold">{expense.description}</p>
                    <p>Amount: ₹{expense.amount.toFixed(2)}</p>
                    <div className="mt-2 space-x-2">
                      <button onClick={() => handleEdit(expense)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                      <button onClick={() => handleDelete(expense.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                    </div>            
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
