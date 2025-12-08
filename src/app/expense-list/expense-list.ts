import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense } from '../budget.model';
import { BudgetService } from '../budget';
import { FormsModule } from '@angular/forms';
import { AddExpenseForm } from "../add-expense-form/add-expense-form";

@Component({
  selector: 'expense-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AddExpenseForm],
  templateUrl: './expense-list.html',
  styleUrls: ['./expense-list.css'],
})
export class ExpenseListComponent {
  @Input() expenses: Expense[] = [];
  @Input() budgetId!: number;
  showExpensesMap = signal<{ [key: number]: boolean }>({});

  newDescription = '';
  newAmount: number | null = null;

  constructor(private budgetService: BudgetService) {}

  delete(budgetId: number, expenseId: number) {
    this.budgetService.deleteExpense(budgetId, expenseId);
  }

  submitExpense(event: Event) {
    event.preventDefault();
    if (!this.newDescription || !this.newAmount || this.newAmount <= 0) return;

    this.budgetService.addExpense(this.budgetId, this.newAmount, this.newDescription);

    this.newDescription = '';
    this.newAmount = null;
  }

  totalExpenses(): number {
    return this.expenses.reduce((sum, e) => sum + e.amount, 0);
  }

    deleteBudget(budgetId: number) {
      this.budgetService.deleteBudget(budgetId);

      this.showExpensesMap.update((map) => {
        const newMap = { ...map };
        delete newMap[budgetId];
        return newMap;
      });
    }
  
}
