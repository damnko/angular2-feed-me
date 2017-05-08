export interface RecipeIngredient {
  name: string;
  ndbno: string;
}

export type Ingredients = Map<string, RecipeIngredient>;

export interface Recipe {
  ingredients: Ingredients;
  loadingRecipes: boolean;
  recipes: any;
  selectedRecipe: string;
}
