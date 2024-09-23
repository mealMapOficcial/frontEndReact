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
  onClose: () => void; // Agregado para manejar el cierre desde el botón flotante
}

const AddIngredientModal: React.FC<AddIngredientModalProps> = ({ onAddIngredient, onClose }) => {
  const [newIngredient, setNewIngredient] = useState<{ name: string; price: number; quantity: number; measure: string }>({
    name: '',
    price: 0,
    quantity: 0,
    measure: 'unit',
  });

  const handleAddIngredient = () => {
    if (newIngredient.name.trim() === '') return;

    const newId = Date.now(); // Genera un ID único
    const ingredient: Ingredient = { id: newId, ...newIngredient };
    onAddIngredient(ingredient);
    onClose(); // Cierra el modal después de agregar el ingrediente
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
