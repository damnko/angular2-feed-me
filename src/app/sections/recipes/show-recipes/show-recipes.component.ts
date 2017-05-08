import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { RecipeService } from '../../../core/services';
import { RecipeActions } from '../../../core/actions';
import { AppState, Recipe } from '../../../core/models';

@Component({
  selector: 'show-recipes',
  styleUrls: ['./show-recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./show-recipes.component.html`
})

export class ShowRecipesComponent implements OnInit, OnDestroy {
  query: string = '';
  updateUrlParams$: Subscription;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private recipeActions: RecipeActions,
    private router: Router,
    public recipe: RecipeService
  ) { }

  ngOnInit() {
    this.checkQueryParams();

    this.updateUrlParams$ = this.recipe.updateUrlParams(this.query, this.route)
      .subscribe((navExtras: NavigationExtras) => this.router.navigate(['.'], navExtras));
  }

  isSelected(name: string, recipe: any): boolean {
    return name === recipe.name;
  }

  selectRecipe(name: string): void {
    this.store.dispatch(
      this.recipeActions.selectRecipe(name)
    );
  }

  searchRecipe(searchText: string): void {
    this.query = searchText;
    this.store.dispatch(
      this.recipeActions.searchRecipe(searchText)
    );
  }

  ngOnDestroy() {
    this.updateUrlParams$.unsubscribe();
  }

  private checkQueryParams(): void {
    this.route.queryParams
      .map(params => {
        this.query = params['q'];
        return { q: params['q'], s: params['s'] };
      }).withLatestFrom(this.store.select('recipe'))
      .first()
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
  }
}
