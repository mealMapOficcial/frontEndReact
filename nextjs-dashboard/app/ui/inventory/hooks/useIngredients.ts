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
 develop
      // Actualiza el estado local eliminando el ingrediente4
      main
      setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const updateIngredient = async (updatedIngredient: Ingredient) => {
    try {
      const response = await fetch(`http://localhost:8080/ingredients/update/${updatedIngredient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedIngredient),
      });

      if (!response.ok) {
        throw new Error('Failed to update ingredient');
      }

      setIngredients((prev) =>
        prev.map((ingredient) =>
          ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
        )
      );
    } catch (err) {
      alert(err.message);
    }
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
