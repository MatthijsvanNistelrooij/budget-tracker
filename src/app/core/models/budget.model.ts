export interface Budget {
  id: number;
  name: string;
  amount: number;
  expenses: Expense[];
}

export interface Expense {
  id: number;
  amount: number;
  budgetId: number;
  description: string;
}
