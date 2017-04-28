import { RecipeActions } from './../../actions/recipe-actions';
import { Ingredient } from './../../models/ingredient';
import { AppState } from '../../models/app-state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'factsheet',
  template: `
  <span *ngIf="(ingredient$|async)?.loadingDetails">Loading...</span>
  <div *ngIf="(ingredient$|async)?.selectedIngredient as ingredient; else noIngredient">
    You have searched for {{ ingredient.report.food.name }}<br>
    <button (click)="addIngredientToList(ingredient.report.food)">Add this to ingredients list</button>
    <ul>
      <li *ngFor="let nutrient of ingredient.report.food.nutrients">{{ nutrient.name }} | {{ nutrient.value }}{{ nutrient.unit }}</li>
    </ul>
  </div>
  <ng-template #noIngredient>No ingredient selected yet</ng-template>
  `
})

export class FactsheetComponent implements OnInit {
  public ingredient$: Observable<Ingredient>;

  constructor(
    private store: Store<AppState>,
    private recipeActions: RecipeActions
  ) {}

  public ngOnInit() {
    this.ingredient$ = this.store.select('ingredient');
  }

  public addIngredientToList(ingredient: any): void {
    const ingredientData = {
      name: ingredient.name,
      ndbno: ingredient.ndbno
    };
    this.store.dispatch(
      this.recipeActions.addIngredient(ingredientData)
    );
  }

}
