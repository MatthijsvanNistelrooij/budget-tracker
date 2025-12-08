import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../budget';

@Component({
  selector: 'add-budget-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-budget-form.html',
  styleUrls: ['./add-budget-form.css']
})
export class AddBudgetFormComponent {
  name = '';
  amount: number | null = null;

  constructor(private budgetService: BudgetService) {}

  submit() {
    if (!this.name || this.amount == null) return;

    this.budgetService.addBudget(this.name, this.amount);

    this.name = '';
    this.amount = null;
  }
}
