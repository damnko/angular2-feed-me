import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { MdDialog, MdDialogRef } from '@angular/material';

import { IngredientActions, RecipeActions } from '../../../core/actions';
import { AppState, Recipe, RecipeIngredient, Ingredient } from '../../../core/models';
import { FactsheetComponent } from '../factsheet.component';

declare const Typed: any;

@Component({
  selector: 'search-input',
  styleUrls: [`./search-input.component.scss`],
  templateUrl: `./search-input.component.html`
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
      .filter((searchStr: string) => searchStr !== '' && searchStr.length > 2)
      .subscribe((searchStr: string) => {
        this.searchIngredient(searchStr);
      });

    this.ingredient$
      .map(res => res.selectedIngredient)
      .distinctUntilChanged()
      .filter(res => res !== null)
      .subscribe(() => this.showIngredientDetails());

    this.ingredient$.map(res => res.searchTerm)
      .subscribe(term => {
        if (term === '') {
          this.initTypewriter();
        }
      });

    this.recipe$.subscribe(res => {
      this.savedIngredients = res.ingredients;
    });
  }

  ngAfterViewInit() {
    this.initTypewriter();
  }

  private initTypewriter(): void {
    Typed.new('.typewriter', {
      strings: ['tomato', 'potatoes', 'milk', 'chocolate', 'butter', 'sunflower seeds', 'olive oil', 'apple pie', 'sugar'],
      shuffle: true,
      loop: true,
      showCursor: true,
      typeSpeed: 0,
      backDelay: 1500,
      startDelay: 1000
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
      height: '80%'
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

  public clearSearch(event: any): void {
    event.preventDefault();
    this.store.dispatch(
      this.ingredientActions.clearSearch()
    );
    this.searchBox.nativeElement.value = '';
    // wait until next tick
    setTimeout(() => {
      this.initTypewriter();
    }, 0);
  }

  public searchSampleString(event: HTMLElement) {
    this.searchBox.nativeElement.value = event.innerText;
    this.searchIngredient(event.innerText);
  }
}
