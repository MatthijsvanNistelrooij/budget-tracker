import { Injectable, signal, effect } from '@angular/core';
import { Budget } from './budget.model';
import { fromEvent } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  budgets = signal<Budget[]>(this.loadFromLocalStorage());

  constructor() {

    effect(() => {
      const value = this.budgets();
      localStorage.setItem('budgets', JSON.stringify(value));
    });

    fromEvent(document, 'click').subscribe(() => {
      console.log('Clicked!');
    });
  }

  private loadFromLocalStorage(): Budget[] {
    const stored = localStorage.getItem('budgets');
    return stored ? JSON.parse(stored) : [];
  }

  addBudget(name: string, amount: number) {
    const newBudget: Budget = {
      id: Date.now(),
      name,
      amount,
      expenses: [],
    };

    this.budgets.update((b) => [...b, newBudget]);
  }

  deleteBudget(budgetId: number) {
    this.budgets.update((budgets) => budgets.filter((b) => b.id !== budgetId));
  }

  addExpense(budgetId: number, amount: number, description: string) {
    const newExpense = {
      id: Date.now(),
      amount,
      description,
      budgetId,
    };

    this.budgets.update((budgets) =>
      budgets.map((b) =>
        b.id === budgetId ? { ...b, expenses: [...b.expenses, newExpense] } : b
      )
    );
  }

  deleteExpense(budgetId: number, expenseId: number) {
    this.budgets.update((budgets) =>
      budgets.map((b) =>
        b.id === budgetId
          ? {
              ...b,
              expenses: b.expenses.filter((e) => e.id !== expenseId),
            }
          : b
      )
    );
  }
}
