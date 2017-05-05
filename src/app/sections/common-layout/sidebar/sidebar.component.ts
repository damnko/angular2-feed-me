import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, Recipe } from '../../../core/models';
import { RecipeActions } from '../../../core/actions/recipe-actions';

@Component({
  selector: 'sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [`./sidebar.component.scss`],
  templateUrl: `./sidebar.component.html`
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

  public removeIngredient(ndbno: string, event: any): void {
    event.preventDefault();
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
