export interface RecipeIngredient {
  name: string;
  ndbno: string;
}

export interface Recipe {
  ingredients: Map<string, RecipeIngredient>;
  loadingRecipes: boolean;
  recipes: any;
  recipeDetails: any;
}
