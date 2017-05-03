import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ingredient-search',
  styles: [`
    .content {
      width: 100%;
      text-align: center;
    }
  `],
  template: `
  <div fxLayout="row">
    <div class="content">
      <h3>Ingredient search</h3>
      <search-input></search-input>
    </div>
  </div>
  `
})

export class IngredientSearchComponent {

}
