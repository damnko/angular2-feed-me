import { RecipeActions } from './../actions/recipe-actions';
import { Recipe } from './../models/recipe';
import { Observable } from 'rxjs/Observable';
import { AppState } from './../models/app-state';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>Ingredients selected</h3>
    <em *ngIf="(recipe$|async)?.ingredients.size === 0; else ingredientsAdded">No ingredients added yet</em>
    <ng-template #ingredientsAdded>
      <ul>
        <li *ngFor="let ingredient of (recipe$|async)?.ingredients.values()">
          {{ ingredient.name }} | <span (click)="removeIngredient(ingredient.ndbno)">DELETE</span>
        </li>
      </ul>
      <button (click)="searchRecipes()">Search recipes with these ingredients</button>
    </ng-template>
  `
})

export class SidebarComponent implements OnInit {
  public recipe$: Observable<Recipe>;
  private ingredientsShort: string[] = [];

  constructor(
    private store: Store<AppState>,
    private recipeActions: RecipeActions
  ) { }

  public ngOnInit() {
    this.recipe$ = this.store.select('recipe');
    this.recipe$.map(res => Array.from(res.ingredients.values()))
      .map(ingredients => ingredients.map(ingredient => ingredient.name.split(',')[0]))
      .subscribe(ingredients => {
        this.ingredientsShort = ingredients;
      });
  }

  public removeIngredient(ndbno: string): void {
    this.store.dispatch(
      this.recipeActions.removeIngredient(ndbno)
    );
  }

  public searchRecipes(): void {
    const query = this.ingredientsShort.join(' ');
    this.store.dispatch(
      this.recipeActions.searchRecipe(query)
    );
  }
}
