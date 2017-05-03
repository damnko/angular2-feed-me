import { RecipeActions } from './../actions/recipe-actions';
import { Recipe } from './../models/recipe';
import { Observable } from 'rxjs/Observable';
import { AppState } from './../models/app-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'recipes',
  styles: [`
    .boh {
      margin-bottom: 10px;
      padding-bottom: 45px;
    }
    /deep/ .mat-card-header-text {
      width: 100%;
    }
    .recipe-tag {
      display: inline-block;
      padding: 3px;
    }
  `],
  template: `
  <span *ngIf="(recipes$|async)?.loadingRecipes">Searching for recipes with {{ query }}</span>
  <h3>Recipe search results for {{ (recipes$|async)?.recipes.query }}</h3>
  <div fxLayout="row" fxLayoutWrap="wrap" fxLayoutGap="10px" fxLayoutAlign="left">
    <md-card
      *ngFor="let recipe of (recipes$|async)?.recipes.hits"
      class="boh"
      fxFlex="20">
      <md-card-header>
        <md-card-title>{{ recipe.name }}</md-card-title>
      </md-card-header>
      <img md-card-image [src]="recipe.img">
      <md-card-content>
        <div>{{ recipe.ingredients.join(', ') }}</div>
        <h5>Health labels:</h5>
        <span class="recipe-tag" *ngFor="let label of recipe.labels">{{ label }}</span>
      </md-card-content>
    </md-card>
  </div>
  `
})

export class RecipesComponent implements OnInit {
  public recipes$: Observable<Recipe>;
  public query: string = '';

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private recipeActions: RecipeActions
  ) { }

  public ngOnInit() {
    this.recipes$ = this.store.select('recipe');

    this.route.queryParams
      .map(params => params['q'])
      .withLatestFrom(this.store.select('recipe'))
      .subscribe(([query, recipe]: [string, Recipe]) => {
        // trigger search if arriving here from direct link
        if (query !== recipe.recipes.query) {
          this.store.dispatch(
            this.recipeActions.searchRecipe(query)
          );
        }
      });
  }
}
