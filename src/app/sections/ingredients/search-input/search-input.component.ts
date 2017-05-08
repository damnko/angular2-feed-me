import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { MdDialog } from '@angular/material';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  AfterViewInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';

import { RecipeService, IngredientService } from './../../../core/services';
import { IngredientActions, RecipeActions } from '../../../core/actions';
import { AppState, Recipe, RecipeIngredient, Ingredient } from '../../../core/models';
import { FactsheetComponent } from '../factsheet.component';

@Component({
  selector: 'search-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [`./search-input.component.scss`],
  templateUrl: `./search-input.component.html`
})

export class SearchInputComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchBox') searchBox: ElementRef;
  private searchIngredient$: Subscription;
  private showDetails$: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingredientActions: IngredientActions,
    private dialog: MdDialog,
    private recipeActions: RecipeActions,
    private ingredient: IngredientService,
    private recipe: RecipeService,
  ) { }

  ngOnInit() {
    this.searchIngredient$ = Observable.fromEvent(this.searchBox.nativeElement, 'keyup')
      .let(this.ingredient.keyupSearch)
      .subscribe((searchStr: string) => {
        this.searchIngredient(searchStr);
      });

    this.showDetails$ = this.ingredient.selectedIngredient$
      .subscribe(() => this.showIngredientDetails());
  }

  ngAfterViewInit() {
    this.initTypewriter();
  }

  private initTypewriter(): void {
    Typed.new('.typewriter', {
      strings: [
        'tomato',
        'potatoes',
        'milk',
        'chocolate',
        'butter',
        'sunflower seeds',
        'olive oil',
        'apple pie',
        'sugar'
      ],
      shuffle: true,
      loop: true,
      showCursor: true,
      typeSpeed: 0,
      backDelay: 1500,
      startDelay: 1000
    });
  }

  searchIngredient(searchString: string): void {
    this.store.dispatch(
      this.ingredientActions.searchIngredient(searchString)
    );
  }

  searchIngredientDetails(ingredient: any): void {
    this.store.dispatch(
      this.ingredientActions.searchIngredientDetails(ingredient.ndbno)
    );
  }

  showIngredientDetails(): void {
    this.dialog.open(FactsheetComponent, {
      height: '80%'
    });
  }

  toggleIngredient(ingredient: any, event: any): void {
    event.stopPropagation();
    const ingredientData = {
      name: ingredient.title,
      ndbno: ingredient.ndbno
    };

    this.recipe.isIngredientSaved$(ingredient.ndbno)
      .first()
      .subscribe(isSaved => {
        if (isSaved) {
          this.store.dispatch(
            this.recipeActions.removeIngredient(ingredient.ndbno)
          );
        } else {
          this.store.dispatch(
            this.recipeActions.addIngredient(ingredientData)
          );
        }
      });
  }

  clearSearch(event: any): void {
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

  searchSampleString(event: HTMLElement): void {
    this.searchBox.nativeElement.value = event.innerText;
    this.searchIngredient(event.innerText);
  }

  ngOnDestroy(): void {
    this.searchIngredient$.unsubscribe();
    this.showDetails$.unsubscribe();
  }
}
