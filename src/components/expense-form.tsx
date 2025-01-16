'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addExpense } from '../actions'

export default function ExpenseForm() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addExpense(description, parseFloat(amount))
    setDescription('')
    setAmount('')
    router.refresh()
  }

  return (
    <div className='flex flex-col items-center justify-center rounded-md p-4 m-4'> 
        <form onSubmit={handleSubmit}>
        <input
            type="text" className="border-2 border-gray-300 rounded-md p-2 m-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Expense description"
            required
        />
        <input
            type="number" className="border-2 border-gray-300 rounded-md p-2 m-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            step="1.00"
            required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded m-4">Add Expense</button>
        </form>
    </div>
  )
}
