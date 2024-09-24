'use client';

import { useState } from 'react';
import { Dish, Ingredient as DishIngredient } from '@/app/shared/interfaces/dish';

interface AddDishModalProps {
  onAddDish: (dish: Omit<Dish, 'id'>) => void;
  onClose: () => void;
  availableIngredients: DishIngredient[];
}

const AddDishModal: React.FC<AddDishModalProps> = ({ onAddDish, onClose, availableIngredients }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [typeOfDishes, setTypeOfDishes] = useState('AFTERNOON');
  const [imageUrl, setImageUrl] = useState(''); // Nueva variable para la URL de la imagen
  const [ingredients, setIngredients] = useState<{ ingredient: DishIngredient; quantity: number }[]>([]);
  const [selectedIngredientId, setSelectedIngredientId] = useState<number | null>(null);
  const [ingredientQuantity, setIngredientQuantity] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleAddIngredient = () => {
    const ingredientToAdd = availableIngredients.find(ingredient => ingredient.id === selectedIngredientId);
    if (ingredientToAdd && ingredientQuantity > 0) {
      if (ingredientQuantity <= ingredientToAdd.quantity) {
        setIngredients([...ingredients, { ingredient: ingredientToAdd, quantity: ingredientQuantity }]);
        setSelectedIngredientId(null);
        setIngredientQuantity(0);
      } else {
        alert(`Cannot add more than ${ingredientToAdd.quantity} of this ingredient.`);
      }
    }
  };

  const handleSubmit = async () => {
    if (!name || price <= 0 || ingredients.length === 0 || !imageUrl) {
      alert('Please fill in all required fields.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/dish/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price,
          typeOfDishes,
          imageUrl,
          ingredients: ingredients.map(({ ingredient, quantity }) => ({ name: ingredient.name, quantity })),
          promotion: false,
        }),
      });
  
      // Verificar si la respuesta es válida
      const contentType = response.headers.get('Content-Type');
      let responseData;
  
      if (!response.ok) {
        // Tratar de extraer el mensaje de error
        responseData = await response.text(); // Obtener la respuesta como texto
        throw new Error(responseData || 'Failed to create dish');
      } else if (contentType && contentType.includes('application/json')) {
        responseData = await response.json(); // Solo analizar como JSON si el tipo de contenido es correcto
      } else {
        throw new Error('Received non-JSON response');
      }
  
      onAddDish(responseData); // Suponiendo que el servidor devuelve el plato creado
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  
  

  const selectedIngredient = availableIngredients.find(ingredient => ingredient.id === selectedIngredientId);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-2">Add Dish</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Dish Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded w-full mb-2 p-2"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="border rounded w-full mb-2 p-2"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border rounded w-full mb-2 p-2"
          required
        />
        <select
          value={typeOfDishes}
          onChange={(e) => setTypeOfDishes(e.target.value)}
          className="border rounded w-full mb-2 p-2"
          required
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
          required
        >
          <option value="">Select an ingredient</option>
          {availableIngredients.map(ingredient => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name} - ${ingredient.price} ({ingredient.measure})
            </option>
          ))}
        </select>

        {selectedIngredient && (
          <div className="mb-2 text-sm">
            <strong>Available Quantity:</strong> {selectedIngredient.quantity}
          </div>
        )}

        <input
          type="number"
          placeholder="Quantity"
          value={ingredientQuantity}
          onChange={(e) => setIngredientQuantity(parseFloat(e.target.value))}
          className="border rounded w-full mb-2 p-2"
          required
        />
        <button onClick={handleAddIngredient} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4">
          Add Ingredient
        </button>

        <h4 className="text-md font-bold">Added Ingredients:</h4>
        <ul className="mb-4">
          {ingredients.map(({ ingredient, quantity }) => (
            <li key={ingredient.id}>
              {ingredient.name} - ${ingredient.price} ({ingredient.measure}) - Quantity: {quantity}
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
