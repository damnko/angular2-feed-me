import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { MdDialog, MdDialogRef } from '@angular/material';

import { IngredientActions } from './../../actions/ingredient-action';
import { AppState } from '../../models/app-state';
import { RecipeActions } from './../../actions/recipe-actions';
import { Recipe, RecipeIngredient } from './../../models/recipe';
import { FactsheetComponent } from './factsheet.component';
import { Ingredient } from './../../models/ingredient';

@Component({
  selector: 'search-input',
  styles: [`
    .boh {
      margin-bottom: 10px;
      padding-bottom: 45px;
    }
    .main-search {
      width: 100%;
    }
    .progress-bar {
      position: absolute;
      left: 0;
      top: 0;
    }
    .save-button {
      position: absolute;
      bottom: 18px;
      margin-left: -20px;
    }
    /deep/ .mat-card-header-text {
      width: 100%;
    }
  `],
  template: `
  <div fxLayout="row" fxLayoutAlign="center">
    <div fxFlex="50">
      <md-input-container align="center" class="main-search">
        <input mdInput placeholder="Search ingredient here" #searchBox>
      </md-input-container>
    </div>
  </div>
  <div *ngIf="(ingredient$|async)?.searchTerm != ''">
    <h2>Search results for <md-chip color="accent">{{ (ingredient$|async)?.searchTerm }}</md-chip></h2>
    <span *ngIf="(ingredient$|async)?.loading; else listLoaded">loading...<br><br><br></span>
    <ng-template #listLoaded>
      <div fxLayout="row" fxLayoutWrap="wrap" fxLayoutGap="10px" fxLayoutAlign="center">
          <md-card
            *ngFor="let ing of (ingredient$|async)?.details.item"
            class="boh"
            fxFlex="10"
            (click)="searchIngredientDetails(ing)">
            <md-progress-bar *ngIf="ing.loadingDetails" mode="indeterminate" class="progress-bar"></md-progress-bar>
            <md-card-header>
              <md-card-title>{{ ing.title }}</md-card-title>
            </md-card-header>
            <md-card-content>{{ ing.name }}</md-card-content>
            <button md-mini-fab class="save-button" (click)="toggleIngredient(ing, $event)">
              <i class="fa fa-star-o" aria-hidden="true" *ngIf="!isSaved(ing.ndbno)"></i>
              <i class="fa fa-star" aria-hidden="true" *ngIf="isSaved(ing.ndbno)"></i>
            </button>
          </md-card>
      </div>
    </ng-template>
  </div>
  `
})

export class SearchInputComponent implements OnInit {
  public ingredient$: Observable<Ingredient>;
  public recipe$: Observable<Recipe>;
  private savedIngredients: Map<string, RecipeIngredient> = new Map();
  @ViewChild('searchBox') public searchBox: ElementRef;

  constructor(
    private store: Store<AppState>,
    private ingredientActions: IngredientActions,
    private dialog: MdDialog,
    private recipeActions: RecipeActions
  ) {}

  public ngOnInit() {
    this.ingredient$ = this.store.select('ingredient');
    this.recipe$ = this.store.select('recipe');

    Observable.fromEvent(this.searchBox.nativeElement, 'keyup')
      .map((res: any) => res.target.value)
      .distinctUntilChanged()
      .debounceTime(400)
      .filter((searchStr: string) => searchStr !== '')
      .subscribe((searchStr: string) => {
        this.searchIngredient(searchStr);
      });

    this.ingredient$
      .map(res => res.selectedIngredient)
      .distinctUntilChanged()
      .filter(res => res !== null)
      .subscribe(() => this.showIngredientDetails());

    this.recipe$.subscribe(res => {
      this.savedIngredients = res.ingredients;
    });
  }

  public searchIngredient(searchString: string): void {
    this.store.dispatch(
      this.ingredientActions.searchIngredient(searchString)
    );
  }

  public searchIngredientDetails(ingredient: any): void {
    this.store.dispatch(
      this.ingredientActions.searchIngredientDetails(ingredient.ndbno)
    );
  }

  public showIngredientDetails(): void {
    this.dialog.open(FactsheetComponent, {
      height: '400px',
      width: '600px',
    });
  }

  public isSaved(ndbno: string): boolean {
    return this.savedIngredients.has(ndbno);
  }

  public toggleIngredient(ingredient: any, event: any): void {
    event.stopPropagation();
    const ingredientData = {
      name: ingredient.title,
      ndbno: ingredient.ndbno
    };
    if (this.isSaved(ingredient.ndbno)) {
      this.store.dispatch(
        this.recipeActions.removeIngredient(ingredient.ndbno)
      );
    } else {
      this.store.dispatch(
        this.recipeActions.addIngredient(ingredientData)
      );
    }
  }
}
