import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';

import { ingredient, recipe, layout } from './reducers';
import { LayoutActions, RecipeActions, IngredientActions } from './actions';
import { RecipeEffects, IngredientEffects } from './effects';
import { RecipeService, IngredientService } from './services';
import { initialIngredient, initialRecipe, initialLayout } from './models';

const NGRX_ACTIONS = [
  LayoutActions,
  RecipeActions,
  IngredientActions
];

const SERVICES = [
  RecipeService,
  IngredientService
];

@NgModule({
  imports: [
    EffectsModule.run(IngredientEffects),
    EffectsModule.run(RecipeEffects),
    StoreModule.provideStore(
      { ingredient, recipe, layout },
      { ingredient: initialIngredient, recipe: initialRecipe, layout: initialLayout }
    ),
  ],
  exports: [
  ],
  declarations: [],
  providers: [
    ...NGRX_ACTIONS,
    ...SERVICES
  ],
})
export class CoreModule { }
