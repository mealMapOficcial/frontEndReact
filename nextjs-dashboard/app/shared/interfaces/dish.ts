export interface Ingredient {
    id: number;
    name: string;
    quantity: number;
    price: number;
    measure: string;
  }
  
  export interface Dish {
    id: number;
    name: string;
    price: number;
    promotion: boolean;
    typeOfDishes: string;
    ingredients: Ingredient[];
  }
  