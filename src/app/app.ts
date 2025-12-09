import { Component } from '@angular/core';
import { BudgetListComponent } from './components/budget-list/budget-list';
import { AddBudgetFormComponent } from './components/add-budget-form/add-budget-form';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddBudgetFormComponent, BudgetListComponent],
  templateUrl: './app.html',
  styleUrls: ['./styles/app.css'],
})
export class App {
  addBudget = false;

  setAddBudget() {
    this.addBudget = !this.addBudget;
  }
}
