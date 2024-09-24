'use client';
import { useState, useEffect } from 'react';
import { Ingredient } from '@/app/shared/interfaces/dish';

const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch('http://localhost:8080/ingredients/readAll');
        if (!response.ok) {
          throw new Error('Failed to fetch ingredients');
        }
        const data: Ingredient[] = await response.json();
        setIngredients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const addIngredient = (ingredient: Ingredient) => {
    setIngredients((prev) => [...prev, ingredient]);
  };

  const deleteIngredient = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/ingredients/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete ingredient');
      }
      // Solo actualiza el estado si la eliminación fue exitosa
      setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const updateIngredient = (updatedIngredient: Ingredient) => {
    setIngredients((prev) =>
      prev.map((ingredient) =>
        ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
      )
    );
  };

  return {
    ingredients,
    loading,
    error,
    addIngredient,
    deleteIngredient,
    updateIngredient,
  };
};

export default useIngredients;
