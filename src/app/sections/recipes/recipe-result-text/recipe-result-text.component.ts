import { Store } from '@ngrx/store';
import { Component, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';

import { RecipeActions } from '../../../core/actions';
import { AppState } from '../../../core/models';

@Component({
  selector: 'recipe-result-text',
  styleUrls: ['./recipe-result-text.component.scss'],
  template: `
    <h3>
      <span *ngIf="resultsFound">Recipe search results for</span>
      <span *ngIf="!resultsFound">
        No results found for this search, maybe you can try to change the query:
      </span>
      <span
        #queryText
        class="query"
        *ngIf="!editingSearch"
        (click)="editSearch()">
        {{ query }} <i class="fa fa-pencil" aria-hidden="true"></i>
      </span>
      <input type="text"
        #searchText
        *ngIf="editingSearch"
        (keyup.enter)="searchRecipe(searchText.value);searchText.blur()"
        (blur)="editSearch()"
        [(ngModel)]="query"/>
    </h3>
  `
})

export class RecipeResultTextComponent {
  editingSearch: boolean = false;
  @Input() query: string = '';
  @Input() resultsFound: boolean = true;
  @Output() onSearchRecipe = new EventEmitter<string>();
  @ViewChild('searchText') searchText: ElementRef;

  constructor(
    private store: Store<AppState>,
    private recipeActions: RecipeActions
  ) { }

  editSearch(): void {
    this.editingSearch = !this.editingSearch;
    // wait a tick
    setTimeout(() => {
      if (this.searchText) {
        this.searchText.nativeElement.focus();
      }
    }, 0);
  }

  searchRecipe(searchText: string): void {
    this.onSearchRecipe.emit(searchText);
    this.store.dispatch(
      this.recipeActions.searchRecipe(searchText)
    );
  }
}
