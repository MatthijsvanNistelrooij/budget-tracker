import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../budget';

@Component({
  selector: 'add-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-expense-form.html',
  styleUrls: ['./add-expense-form.css'],
})
export class AddExpenseForm {
  @Input() budgetId!: number;

  description = '';
  amount: number | null = null;

  constructor(private budgetService: BudgetService) {}

  submitExpense(event: Event) {
    event.preventDefault();
    if (!this.description || !this.amount || this.amount <= 0) return;

    this.budgetService.addExpense(this.budgetId, this.amount, this.description);

    // reset form
    this.description = '';
    this.amount = null;
  }
}
