import { combineReducers, ActionReducer, Action } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';

import { AppState } from '../models';
import { ingredient } from './ingredient';
import { layout } from './layout';
import { recipe } from './recipe';

const reducers = { ingredient, recipe, layout };

const developmentReducer: ActionReducer<AppState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

const PROD = process.env.NODE_ENV === 'production';

export function reducer(state: AppState, action: Action) {
  return PROD ? productionReducer(state, action) : developmentReducer(state, action);
}
