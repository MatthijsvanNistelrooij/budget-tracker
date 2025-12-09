import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../budget';
@Component({
  selector: 'add-expense-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-expense-form.html',
  styleUrls: ['./add-expense-form.css'],
})
export class AddExpenseForm {
  budgetId = input.required<number>();

  description = signal('');
  amount = signal<number | null>(null);

  constructor(private budgetService: BudgetService) {}

  submitExpense(event: Event) {
    event.preventDefault();

    const desc = this.description().trim();
    const amt = this.amount();

    if (!desc || !amt || amt <= 0) return;

    this.budgetService.addExpense(this.budgetId(), amt, desc);

    this.description.set('');
    this.amount.set(null);
  }
}
