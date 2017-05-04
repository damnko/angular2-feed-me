import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Ingredient } from './../../models/ingredient';
import { AppState } from './../../models/app-state';

@Component({
  selector: 'ingredient-search',
  styles: [`
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
    <div fxFlex="100" class="content" [class.no-search]="(ingredient$|async)?.searchTerm === ''">
      <h2>Ingredient search</h2>
      <search-input></search-input>
    </div>
  </div>
  `
})

export class IngredientSearchComponent implements OnInit {
  public ingredient$: Observable<Ingredient>;

  constructor(
    private store: Store<AppState>
  ) {}

  public ngOnInit() {
    this.ingredient$ = this.store.select('ingredient');
  }

}
