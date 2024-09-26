
  export interface Dish {
    id: number;
  name: string;
  price: number;
  promotion: boolean;
  typeOfDishes: string;
  ingredients: { id: number; name: string; price: number; measure: string }[];
  imageUrl: string; // Agrega la propiedad imageUrl
  }
  