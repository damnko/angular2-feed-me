import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IngredientService, RecipeService } from '../../core/services';
import { Recipe, RecipeIngredient, Ingredient, AppState } from '../../core/models';
import { RecipeActions } from '../../core/actions';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>{{ ingredient.selectedIngredientName$ | async}}</h3>
    <ngx-datatable
      class="material"
      [rows]="ingredient.selectedIngredientNutrients$ | async"
      [columns]="columns"
      [headerHeight]="50"
      [footerHeight]="50"
      [rowHeight]="'auto'">
    </ngx-datatable>
    <button md-mini-fab class="save-button" (click)="toggleIngredient()">
      <i class="fa fa-star-o" aria-hidden="true" *ngIf="!(isSaved() | async)"></i>
      <i class="fa fa-star" aria-hidden="true" *ngIf="isSaved() | async"></i>
    </button>
  `
})

export class FactsheetComponent implements OnInit {
  columns = [{
    prop: 'name'
  }, {
    prop: 'value'
  }];
  currentIngredient: {
    name: string,
    ndbno: string
  };

  constructor(
    private store: Store<AppState>,
    private recipeActions: RecipeActions,
    public recipe: RecipeService,
    public ingredient: IngredientService
  ) { }

  ngOnInit() {
    this.ingredient.selectedIngredient$
      .first()
      .subscribe(selectedIngredient => {
        const ingredient = selectedIngredient.report.food;
        const name = ingredient.name.split(',')[0].toLowerCase();
        this.currentIngredient = {
          name: name[0].toUpperCase() + name.slice(1),
          ndbno: ingredient.ndbno
        };
      });
  }

  isSaved(): Observable<boolean> {
    return this.recipe.isIngredientSaved$(this.currentIngredient.ndbno);
  }

  toggleIngredient(): void {
    this.recipe.isIngredientSaved$(this.currentIngredient.ndbno)
      .first()
      .subscribe(isSaved => {
        if (isSaved) {
          this.store.dispatch(
            this.recipeActions.removeIngredient(this.currentIngredient.ndbno)
          );
        } else {
          this.store.dispatch(
            this.recipeActions.addIngredient(this.currentIngredient)
          );
        }
      });
  }

}
