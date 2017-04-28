import { Ingredient } from './../../models/ingredient';
import { Observable } from 'rxjs/Observable';
import { IngredientActions } from './../../actions/ingredient-action';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/app-state';

@Component({
  selector: 'search-input',
  template: `
  Search the ingredient here
  <input type="text" #ingredient/>
  <button (click)="searchIngredient(ingredient.value)">search</button><br>
  <span *ngIf="(ingredient$|async)?.searchTerm == ''">No ingredient selected yet</span>
  <span *ngIf="(ingredient$|async)?.searchTerm != ''">
    You have searched {{ (ingredient$|async)?.searchTerm }}<br>
    <span *ngIf="(ingredient$|async)?.loading; else listLoaded">loading...<br><br><br></span>
    <ng-template #listLoaded>
      <ul>
        <li
          *ngFor="let ing of (ingredient$|async)?.details.list.item"
          (click)="searchIngredientDetails(ing.ndbno)"> {{ ing.name }}</li>
      </ul>
    </ng-template>
  </span>
  `
})

export class SearchInputComponent implements OnInit {
  public ingredient$: Observable<Ingredient>;

  constructor(
    private store: Store<AppState>,
    private ingredientActions: IngredientActions
  ) {}

  public ngOnInit() {
    this.ingredient$ = this.store.select('ingredient');
  }

  public searchIngredient(searchString: string): void {
    this.store.dispatch(
      this.ingredientActions.searchIngredient(searchString)
    );
  }

  public searchIngredientDetails(ndbno: string): void {
    this.store.dispatch(
      this.ingredientActions.searchIngredientDetails(ndbno)
    );
  }
}
