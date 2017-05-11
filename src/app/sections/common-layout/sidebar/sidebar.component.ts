import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState, Recipe } from '../../../core/models';
import { RecipeActions } from '../../../core/actions';
import { RecipeService } from '../../../core/services';

@Component({
  selector: 'sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [`./sidebar.component.scss`],
  templateUrl: `./sidebar.component.html`
})

export class SidebarComponent {
  ingredientsShort: string[] = [];

  constructor(
    private store: Store<AppState>,
    private recipeActions: RecipeActions,
    public recipe: RecipeService
  ) { }

  removeIngredient(ndbno: string, event: any): void {
    event.preventDefault();
    this.store.dispatch(
      this.recipeActions.removeIngredient(ndbno)
    );
  }

  searchRecipes(): void {
    this.recipe.getAllIngredients$()
      .map((ingredients: string[]) => ingredients.join(' '))
      .first()
      .subscribe((query: string) => {
        this.store.dispatch(
          this.recipeActions.searchRecipe(query)
        );
      });
  }

  clearIngredientsList(): void {
    this.store.dispatch(
      this.recipeActions.clearIngredientList()
    );
  }
}
