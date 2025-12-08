import { Component, computed, signal } from '@angular/core';
import { BudgetService } from '../budget';
import { CommonModule } from '@angular/common';
import { Budget } from '../budget.model';
import { ExpenseListComponent } from '../expense-list/expense-list';

@Component({
  selector: 'budget-list',
  standalone: true,
  imports: [CommonModule, ExpenseListComponent],
  templateUrl: './budget-list.html',
  styleUrls: ['./budget-list.css'],
})
export class BudgetListComponent {
  showExpensesMap = signal<{ [key: number]: boolean }>({});

  constructor(private budgetService: BudgetService) {}

  get budgetsArray(): Budget[] {
    return this.budgetService.budgets();
  }

  

  toggleShowExpenses(id: number) {
    this.showExpensesMap.update((map) => ({
      ...map,
      [id]: !map[id],
    }));
  }

  deleteBudget(budgetId: number) {
    this.budgetService.deleteBudget(budgetId);

    this.showExpensesMap.update((map) => {
      const newMap = { ...map };
      delete newMap[budgetId];
      return newMap;
    });
  }

  totalExpenses(budget: Budget): number {
    return budget.expenses.reduce((sum, e) => sum + e.amount, 0);
  }

  percentageOfGoal(budget: Budget): number {
    if (budget.amount === 0) return 0; // voorkom deling door nul
    const total = budget.expenses.reduce((sum, e) => sum + e.amount, 0);
    return Math.min(100, Math.round((total / budget.amount) * 100));
  }

  totalSavings(): number {
    return this.budgetsArray.reduce((sum, budget) => {
      const budgetTotal = budget.expenses.reduce((s, e) => s + e.amount, 0);
      return sum + budgetTotal;
    }, 0);
  }
}
