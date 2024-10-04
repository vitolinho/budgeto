import { Expense, SortedExpenses } from "@/types/expense"

// This function is checking if the user is entering a digit or not
export function CheckDigit(event: KeyboardEvent) {
  const allowedKeys = [
    'Backspace',
    'Tab',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'Delete',
    '.',
    ','
  ]
  if (!allowedKeys.includes(event.key) && isNaN(Number(event.key))) {
    event.preventDefault()
  }
}

export function SerializeDate(date: Date) {
  const day = date.getDate()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const formattedDate = `${day}/${month}/${year}`
  return formattedDate
}

export function SortExpensesByDate(expenses: Expense[]) {
  const sortedExpenses: SortedExpenses = {}
  expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  expenses.map((expense) => {
    if (!sortedExpenses[expense.date]) {
      sortedExpenses[expense.date] = []
    }
    sortedExpenses[expense.date].push(expense)
  })
  return sortedExpenses
}
