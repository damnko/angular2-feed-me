import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Recipe, RecipeIngredient } from './../../models/recipe';
import { RecipeActions } from './../../actions/recipe-actions';
import { Ingredient } from './../../models/ingredient';
import { AppState } from '../../models/app-state';

@Component({
  selector: 'factsheet',
  styles: [`
    .save-button {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    h3 {
      margin-right: 40px;
    }
  `],
  template: `
    <h3>{{ currentIngredient.name }}</h3>
    <ngx-datatable
      class="material"
      [rows]="nutrients"
      [columns]="columns"
      [headerHeight]="50"
      [footerHeight]="50"
      [rowHeight]="'auto'">
    </ngx-datatable>
    <button md-mini-fab class="save-button" (click)="toggleIngredient(currentIngredient)">
      <i class="fa fa-star-o" aria-hidden="true" *ngIf="!isSaved(currentIngredient.ndbno)"></i>
      <i class="fa fa-star" aria-hidden="true" *ngIf="isSaved(currentIngredient.ndbno)"></i>
    </button>
  `
})

export class FactsheetComponent implements OnInit {
  public ingredient$: Observable<Ingredient>;
  public recipe$: Observable<Recipe>;
  private savedIngredients: Map<string, RecipeIngredient> = new Map();
  public nutrients: any[];
  public columns: any = [{
    prop: 'name'
  }, {
    prop: 'value'
  }];
  public currentIngredient: any;

  constructor(
    private store: Store<AppState>,
    private recipeActions: RecipeActions
  ) {}

  public ngOnInit() {
    this.ingredient$ = this.store.select('ingredient');
    this.ingredient$
      .do(ing => this.currentIngredient = ing.selectedIngredient.report.food)
      .map(ing => ing.selectedIngredient.report.food.nutrients)
      .map(nutrients => nutrients.map((nutrient: any) => {
        return {
          name: nutrient.name,
          value: nutrient.value + nutrient.unit
        };
      }))
      .subscribe(nutrients => this.nutrients = nutrients);

    this.recipe$ = this.store.select('recipe');
    this.recipe$.subscribe(res => {
      this.savedIngredients = res.ingredients;
    });
  }

  public isSaved(ndbno: string): boolean {
    return this.savedIngredients.has(ndbno);
  }

  public toggleIngredient(ingredient: any): void {
    const ingredientData = {
      name: ingredient.name,
      ndbno: ingredient.ndbno
    };
    if (this.isSaved(ingredient.ndbno)) {
      this.store.dispatch(
        this.recipeActions.removeIngredient(ingredient.ndbno)
      );
    } else {
      this.store.dispatch(
        this.recipeActions.addIngredient(ingredientData)
      );
    }
  }

}
