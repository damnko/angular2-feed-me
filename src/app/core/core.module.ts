import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';

import { reducer } from './reducers';
import { LayoutActions, RecipeActions, IngredientActions } from './actions';
import { RecipeEffects, IngredientEffects } from './effects';
import { RecipeService, IngredientService, LayoutService } from './services';

const NGRX_ACTIONS = [
  LayoutActions,
  RecipeActions,
  IngredientActions
];

const SERVICES = [
  RecipeService,
  IngredientService,
  LayoutService
];

@NgModule({
  imports: [
    EffectsModule.run(IngredientEffects),
    EffectsModule.run(RecipeEffects),
    StoreModule.provideStore(reducer),
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
