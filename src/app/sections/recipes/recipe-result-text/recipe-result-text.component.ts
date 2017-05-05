import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { RecipeActions } from '../../../core/actions/recipe-actions';
import { AppState } from '../../../core/models/app-state';

@Component({
  selector: 'recipe-result-text',
  styleUrls: ['./recipe-result-text.component.scss'],
  template: `
    <h3>
      <span *ngIf="resultsFound">Recipe search results for</span>
      <span *ngIf="!resultsFound">No results found for this search, maybe you can try to change the query:</span>
      <span (click)="editSearch()" *ngIf="!editingSearch" #queryText class="query">{{ query }} <i class="fa fa-pencil" aria-hidden="true"></i></span>
      <input type="text" #searchText *ngIf="editingSearch" (keyup.enter)="searchRecipe(searchText.value);searchText.blur()" (blur)="editSearch()" [(ngModel)]="query"/>
    </h3>
  `
})

export class RecipeResultTextComponent {
  public editingSearch: boolean = false;
  @Input() public query: string = '';
  @Input() public resultsFound: boolean = true;
  @Output() public onSearchRecipe = new EventEmitter<string>();
  @ViewChild('searchText') public searchText: ElementRef;

  constructor(
    private store: Store<AppState>,
    private recipeActions: RecipeActions
  ) {}

  public editSearch(): void {
    this.editingSearch = !this.editingSearch;
    // wait a tick
    setTimeout(() => {
      if (this.searchText) {
        this.searchText.nativeElement.focus();
      }
    }, 0);
  }

  public searchRecipe(searchText: string): void {
    this.onSearchRecipe.emit(searchText);
    // this.query = searchText;
    this.store.dispatch(
      this.recipeActions.searchRecipe(searchText)
    );
  }
}
