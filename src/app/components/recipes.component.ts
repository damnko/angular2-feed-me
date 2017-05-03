import { RecipeActions } from './../actions/recipe-actions';
import { Recipe } from './../models/recipe';
import { Observable } from 'rxjs/Observable';
import { AppState } from './../models/app-state';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <span *ngIf="(recipes$|async)?.loadingRecipes">Searching for recipes with {{ query }}</span>
  <h3>Recipe search results for {{ (recipes$|async)?.recipes.query }}</h3>
  <div fxLayout="row" fxLayoutWrap="wrap" fxLayoutGap="10px" fxLayoutAlign="left">
    <md-card
      *ngFor="let recipe of (recipes$|async)?.recipes.hits"
      class="boh"
      [fxFlex]="isSelected((recipes$|async)?.selectedRecipe, recipe) ? 40: 20"
      (click)="selectRecipe(recipe.name)">
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

  public uno: any;
  public due: any;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private recipeActions: RecipeActions,
    private router: Router
  ) { }

  public ngOnInit() {
    this.recipes$ = this.store.select('recipe');

    this.uno = this.route.queryParams
      .map(params => {
        this.query = params['q'];
        return { q: params['q'], s: params['s'] };
      }).withLatestFrom(this.store.select('recipe'))
      .subscribe(([query, recipe]: [any, Recipe]) => {
        // trigger search if arriving here from direct link
        if (query.q !== recipe.recipes.query) {
          this.store.dispatch(
            this.recipeActions.searchRecipe(query.q)
          );
        }
        // trigger selected recipe if arriving here from direct link
        if (query.s !== recipe.selectedRecipe) {
          this.selectRecipe(query.s);
        }
      });

    this.due = this.recipes$.map(recipes => recipes.selectedRecipe)
      .subscribe(selectedRecipe => {
        console.log('selected recipe is', selectedRecipe, this.query);
        if (selectedRecipe !== undefined) {
          const q = this.query;
          const s = selectedRecipe;
          const navExtras: NavigationExtras = {
            queryParams: (!selectedRecipe) ? { q } : { q, s },
            relativeTo: this.route,
            // skipLocationChange: true,
            // queryParamsHandling: 'merge',
          };
          this.router.navigate(['.'], navExtras);
        }
      });
  }

  public isSelected(name: string, recipe: any): boolean {
    return name === recipe.name;
  }

  public selectRecipe(name: string): void {
    this.store.dispatch(
      this.recipeActions.selectRecipe(name)
    );
  }

  ngOnDestroy() {
    this.uno.unsubscribe();
    this.due.unsubscribe();
  }
}
