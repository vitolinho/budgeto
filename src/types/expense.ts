export interface Expense {
  id: string
  expense: string
  cost: number
  quantity: string
  date: string
}

export interface SortedExpenses {
  [date: string]: Expense[]
}
