import { IngredientActions } from './ingredient-actions';
import {
  SEARCH_INGREDIENT,
  SEARCH_INGREDIENT_SUCCESS,
  SEARCH_INGREDIENT_FAIL,
  CLEAR_SEARCH,
  SET_LOADING,
  SET_LOADING_DETAILS,
  SEARCH_INGREDIENT_DETAILS,
  SEARCH_INGREDIENT_DETAILS_SUCCESS,
  SEARCH_INGREDIENT_DETAILS_FAILED
} from './ingredient-actions';
import { Action } from '@ngrx/store';

describe('ingredient-actions', () => {
  let actions: IngredientActions;

  beforeEach(() => {
    actions = new IngredientActions();
  });

  describe('searchIngredient', () => {
    it('should create an action', () => {
      const name = 'milk';
      const page = 1;
      const action = actions.searchIngredient(name, page);

      const result: Action = {
        type: SEARCH_INGREDIENT,
        payload: { name, page }
      };

      expect(action).toEqual(result);
    });
  });

  describe('searchSuccess', () => {
    it('should return an action', () => {
      const data = {
        status: 'success',
        data: ['element 1', 'element 2']
      };
      const action = actions.searchSuccess(data);

      const result: Action = {
        type: SEARCH_INGREDIENT_SUCCESS,
        payload: data
      };

      expect(action).toEqual(result);
    });
  });

  describe('searchFailed', () => {
    it('should return an action', () => {
      const error = 'An error occurred';
      const action = actions.searchFailed(error);

      const result: Action = {
        type: SEARCH_INGREDIENT_FAIL,
        payload: error
      };

      expect(action).toEqual(result);
    });
  });

  describe('clearSearch', () => {
    it('should return an action', () => {
      const action = actions.clearSearch();

      const result: Action = {
        type: CLEAR_SEARCH
      };

      expect(action).toEqual(result);
    });
  });

  describe('setLoading', () => {
    it('should return an action', () => {
      const isLoading = true;
      const action = actions.setLoading(isLoading);

      const result: Action = {
        type: SET_LOADING,
        payload: isLoading
      };

      expect(action).toEqual(result);
    });
  });

  describe('setLoadingDetails', () => {
    it('should return an action', () => {
      const isLoading = true;
      const action = actions.setLoadingDetails(isLoading);

      const result: Action = {
        type: SET_LOADING_DETAILS,
        payload: isLoading
      };

      expect(action).toEqual(result);
    });
  });

  describe('searchIngredientDetails', () => {
    it('should return an action', () => {
      const ndbno = 'xhyd740j';
      const action = actions.searchIngredientDetails(ndbno);

      const result: Action = {
        type: SEARCH_INGREDIENT_DETAILS,
        payload: ndbno
      };

      expect(action).toEqual(result);
    });
  });

  describe('searchDetailsSuccess', () => {
    it('should return an action', () => {
      const data = {
        status: 'success',
        data: ['element 1', 'element 2']
      };
      const action = actions.searchDetailsSuccess(data);

      const result: Action = {
        type: SEARCH_INGREDIENT_DETAILS_SUCCESS,
        payload: data
      };

      expect(action).toEqual(result);
    });
  });

  describe('searchDetailsFailed', () => {
    it('should return an action', () => {
      const error = 'An error occurred';
      const action = actions.searchDetailsFailed(error);

      const result: Action = {
        type: SEARCH_INGREDIENT_DETAILS_FAILED,
        payload: error
      };

      expect(action).toEqual(result);
    });
  });
});
