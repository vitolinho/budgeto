import { Expense } from './expense'

export interface Budgets {
  id: string
  name: string
  budget: string
  expenses: Expense[]
}
