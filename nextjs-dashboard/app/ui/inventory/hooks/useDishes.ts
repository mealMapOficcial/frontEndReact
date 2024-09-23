import { useState } from 'react';
import { Dish } from '@/app/shared/interfaces/dish';

const useDishes = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);

  const addDish = (dish: Omit<Dish, 'id'>) => {
    setDishes((prev) => [...prev, { ...dish, id: prev.length + 1 }]);
  };

  const deleteDish = (id: number) => {
    setDishes((prev) => prev.filter((dish) => dish.id !== id));
  };

  const updateDish = (updatedDish: Dish) => {
    setDishes((prev) =>
      prev.map((dish) => (dish.id === updatedDish.id ? updatedDish : dish))
    );
  };

  return {
    dishes,
    addDish,
    deleteDish,
    updateDish,
  };
};

export default useDishes;
