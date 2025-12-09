import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../budget';

@Component({
  selector: 'add-budget-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-budget-form.html',
  styleUrls: ['./add-budget-form.css'],
})
export class AddBudgetFormComponent {
  name = signal('');
  amount = signal<number | null>(null);

  constructor(private budgetService: BudgetService) {}

  submit(event: Event) {
    event.preventDefault();

    const name = this.name().trim();
    const amount = this.amount();

    if (!name || amount == null || amount <= 0) return;

    this.budgetService.addBudget(name, amount);

    this.name.set('');
    this.amount.set(null);
  }
}
