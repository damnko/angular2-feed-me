import { RecipeActions } from './../actions/recipe-actions';
import { Recipe } from './../models/recipe';
import { Observable } from 'rxjs/Observable';
import { AppState } from './../models/app-state';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .ingredient {
      position: relative;
      text-align: left;
    }
    .sidebar-content ul {
      list-style-type: none;
      padding-left: 0;
      padding-right: 15px;
    }
    .sidebar-content li {
      margin-bottom: 5px;
    }
    .ingredient i {
      position: absolute;
      right: -10px;
      top: 0;
    }
    .sidebar-content {
      text-align: center;
    }
    button.search-recipes {
      display: block;
      margin: 0 auto;
    }
  `],
  template: `
    <h3>Ingredients selected</h3>
    <em *ngIf="(recipe$|async)?.ingredients.size === 0; else ingredientsAdded">No ingredients added yet</em>
    <ng-template #ingredientsAdded>
      <div class="sidebar-content">
        <ul>
          <li *ngFor="let ingredient of (recipe$|async)?.ingredients.values()" class="ingredient">
            {{ ingredient.name }} <i (click)="removeIngredient(ingredient.ndbno)" class="fa fa-times-circle-o" aria-hidden="true"></i>
          </li>
        </ul>
        <button class="search-recipes" md-raised-button (click)="searchRecipes()" [disabled]="(recipe$|async)?.loadingRecipes">
          <span *ngIf="!(recipe$|async)?.loadingRecipes">Search recipes</span>
          <i class="fa fa-circle-o-notch fa-spin fa-fw" *ngIf="(recipe$|async)?.loadingRecipes"></i>
        </button>
        <button md-button (click)="clearIngredientsList()">Clear list</button>
      </div>
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

  public clearIngredientsList(): void {
    this.store.dispatch(
      this.recipeActions.clearIngredientList()
    );
  }
}
