import { Ingredient } from './ingredients';

export interface CartItem {
  name: string;
  quantity: number;
  price: number;
  ingredients: Ingredient[]; 
  removedIngredients?: number[];
}