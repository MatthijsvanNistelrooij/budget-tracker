import { Component } from '@angular/core';
import { AddBudgetFormComponent } from './add-budget-form/add-budget-form';
import { BudgetListComponent } from './budget-list/budget-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddBudgetFormComponent, BudgetListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  addBudget = false;

  setAddBudget() {
    this.addBudget = !this.addBudget; 
  }
}
