'use server';
import { db } from '@/db';

export type ExpenseByDate = {
  date: string
  totalAmount: number
}

export type Expense = {
  id: number
  description: string
  amount: number
  date: Date  
}

export async function addExpense(description: string, amount: number) {
  await db.expense.create({
    data: {
      description,
      amount,
    },
  })
}

export async function getExpenses(): Promise<Expense[]> {
  return await db.expense.findMany({
    orderBy: {
      date: 'desc',
    },
  })
}

export async function updateExpense(id: number, description: string, amount: number) {
  await db.expense.update({
    where: { id },
    data: { description, amount },
  })
}

export async function deleteExpense(id: number) {
  await db.expense.delete({
    where: { id },
  })
}

export async function getTotalExpenses(): Promise<number> {
  const result = await db.expense.aggregate({
    _sum: {
      amount: true,
    },
  })
  return result._sum.amount || 0
}

export async function getExpensesByDate(): Promise<ExpenseByDate[]> {
  const expenses = await db.expense.groupBy({
    by: ['date'],
    _sum: {
      amount: true
    },
    orderBy: {
      date: 'asc'
    }
  })

  return expenses.map(expense => ({
    date: expense.date.toISOString().split('T')[0].split('-').reverse().join('-'), 
    totalAmount: expense._sum.amount || 0
  }))
}
