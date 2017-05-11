import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IngredientService } from '../../core/services/ingredient.service';

@Component({
  selector: 'ingredient-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    h2.title {
      text-shadow: 2px 2px 0px rgb(255, 255, 255);
      text-transform: uppercase;
      font-size: 2em;
    }
    .content {
      text-align: center;
      -webkit-transition: all 500ms cubic-bezier(0.120, 1, 0.720, 0.955); /* older webkit */
      -webkit-transition: all 500ms cubic-bezier(0.120, 1.245, 0.720, 0.955);
         -moz-transition: all 500ms cubic-bezier(0.120, 1.245, 0.720, 0.955);
           -o-transition: all 500ms cubic-bezier(0.120, 1.245, 0.720, 0.955);
              transition: all 500ms cubic-bezier(0.120, 1.245, 0.720, 0.955); /* custom */
    }
    .content.no-search {
      margin-top: 100px;
    }
  `],
  template: `
  <div fxLayout="row" fxLayoutAlign="space-around center">
    <div fxFlex="100" class="content" [class.no-search]="(ingredient.searchTerm$ | async) === ''">
      <h2 class="title">Ingredient search</h2>
      <search-input></search-input>
    </div>
  </div>
  `
})

export class IngredientSearchComponent {
  constructor(public ingredient: IngredientService) { }
}
