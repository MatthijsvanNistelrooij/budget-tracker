import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense } from '../../core/models/budget.model';
import { BudgetService } from '../../core/services/budget.service';
import { AddExpenseForm } from '../add-expense-form/add-expense-form';

@Component({
  selector: 'expense-list',
  standalone: true,
  imports: [CommonModule, AddExpenseForm],
  templateUrl: './expense-list.html',
  styleUrls: ['./expense-list.css'],
})
export class ExpenseListComponent {
  expenses = input.required<Expense[]>();
  budgetId = input.required<number>();

  showExpensesMap = signal<{ [key: number]: boolean }>({});

  constructor(private budgetService: BudgetService) {}

  delete(expenseId: number) {
    this.budgetService.deleteExpense(this.budgetId(), expenseId);
  }

  totalExpenses(): number {
    return this.expenses().reduce((sum, e) => sum + e.amount, 0);
  }

  deleteBudget() {
    const id = this.budgetId();

    this.budgetService.deleteBudget(id);

    this.showExpensesMap.update((map) => {
      const newMap = { ...map };
      delete newMap[id];
      return newMap;
    });
  }
}
