'use client';

import { useState } from 'react';
import { Dish, Ingredient as DishIngredient } from '@/app/shared/interfaces/dish';

interface AddDishModalProps {
  onAddDish: (dish: Omit<Dish, 'id'>) => void;
  onClose: () => void;
  availableIngredients: DishIngredient[]; // Prop para ingredientes disponibles
}

const AddDishModal: React.FC<AddDishModalProps> = ({ onAddDish, onClose, availableIngredients }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [typeOfDishes, setTypeOfDishes] = useState('AFTERNOON');
  const [ingredients, setIngredients] = useState<DishIngredient[]>([]);
  const [selectedIngredientId, setSelectedIngredientId] = useState<number | null>(null); // Para el select

  const handleAddIngredient = () => {
    const ingredientToAdd = availableIngredients.find(ingredient => ingredient.id === selectedIngredientId);
    if (ingredientToAdd) {
      setIngredients([...ingredients, ingredientToAdd]);
      setSelectedIngredientId(null); // Reiniciar selección
    }
  };

  const handleSubmit = () => {
    onAddDish({
      name,
      price,
      typeOfDishes,
      ingredients,
      promotion: false, // Ajusta según tu lógica
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-2">Add Dish</h2>
        <input
          type="text"
          placeholder="Dish Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded w-full mb-2 p-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="border rounded w-full mb-2 p-2"
        />
        <select
          value={typeOfDishes}
          onChange={(e) => setTypeOfDishes(e.target.value)}
          className="border rounded w-full mb-2 p-2"
        >
          <option value="AFTERNOON">Afternoon</option>
          <option value="MORNING">Morning</option>
          <option value="EVENING">Evening</option>
        </select>

        <h3 className="text-lg font-bold mt-4">Select Ingredients</h3>
        <select
          value={selectedIngredientId || ''}
          onChange={(e) => setSelectedIngredientId(parseInt(e.target.value))}
          className="border rounded w-full mb-2 p-2"
        >
          <option value="">Select an ingredient</option>
          {availableIngredients.map(ingredient => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name} - ${ingredient.price} ({ingredient.measure})
            </option>
          ))}
        </select>
        <button onClick={handleAddIngredient} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4">
          Add Ingredient
        </button>

        <h4 className="text-md font-bold">Added Ingredients:</h4>
        <ul className="mb-4">
          {ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.name} - ${ingredient.price} ({ingredient.measure})
            </li>
          ))}
        </ul>

        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Save Dish
        </button>
        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddDishModal;
