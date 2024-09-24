'use client';

import { useState } from 'react';

interface Ingredient {
  id: number;
  name: string;
  price: number;
  quantity: number;
  measure: string;
}

interface AddIngredientModalProps {
  onAddIngredient: (ingredient: Ingredient) => void;
  onClose: () => void;
}

const AddIngredientModal: React.FC<AddIngredientModalProps> = ({ onAddIngredient, onClose }) => {
  const [newIngredient, setNewIngredient] = useState<{ name: string; price: number; quantity: number; measure: string }>({
    name: '',
    price: 0,
    quantity: 0,
    measure: 'unit',
  });

  const handleAddIngredient = async () => {
    if (newIngredient.name.trim() === '' || newIngredient.price <= 0 || newIngredient.quantity <= 0) {
      alert('Please fill in all fields correctly.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/ingredients/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIngredient),
      });

      if (!response.ok) {
        throw new Error('Failed to create ingredient');
      }

      const createdIngredient: Ingredient = await response.json();
      onAddIngredient(createdIngredient); // Llama a la función para agregar el ingrediente en el estado principal
      onClose(); // Cierra el modal
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Add Ingredient</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Ingredient Name"
            value={newIngredient.name}
            onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Price"
            value={newIngredient.price}
            onChange={(e) => setNewIngredient({ ...newIngredient, price: parseFloat(e.target.value) })}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Quantity"
            value={newIngredient.quantity}
            onChange={(e) => setNewIngredient({ ...newIngredient, quantity: parseInt(e.target.value) })}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Measure</label>
          <select
            value={newIngredient.measure}
            onChange={(e) => setNewIngredient({ ...newIngredient, measure: e.target.value })}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          >
            <option value="unit">Unit</option>
            <option value="kg">Kg</option>
            <option value="lb">Lb</option>
          </select>
        </div>
        <button onClick={handleAddIngredient} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-2">
          Add Ingredient
        </button>
        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Close
        </button>
      </div>
    </div>
  );
};

export default AddIngredientModal;
