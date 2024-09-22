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
}

const AddIngredientModal: React.FC<AddIngredientModalProps> = ({ onAddIngredient }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newIngredient, setNewIngredient] = useState<{ name: string; price: number; quantity: number; measure: string }>({
    name: '',
    price: 0,
    quantity: 0,
    measure: 'unit',
  });

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setNewIngredient({ name: '', price: 0, quantity: 0, measure: 'unit' });
  };

  const handleAddIngredient = () => {
    if (newIngredient.name.trim() === '') return;

    const newId = Date.now(); // Genera un ID único
    const ingredient: Ingredient = { id: newId, ...newIngredient };
    onAddIngredient(ingredient);
    handleCloseModal();
  };

  return (
    <div>
      <button onClick={handleOpenModal} className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600">
        +
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Add Ingredient</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Ingredient Name"
                value={newIngredient.name}
                onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Price"
                value={newIngredient.price}
                onChange={(e) => setNewIngredient({ ...newIngredient, price: parseFloat(e.target.value) })}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Quantity"
                value={newIngredient.quantity}
                onChange={(e) => setNewIngredient({ ...newIngredient, quantity: parseInt(e.target.value) })}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Measure</label>
              <select
                value={newIngredient.measure}
                onChange={(e) => setNewIngredient({ ...newIngredient, measure: e.target.value })}
                className="border rounded w-full py-2 px-3 text-gray-700"
              >
                <option value="unit">Unit</option>
                <option value="kg">Kg</option>
                <option value="lb">Lb</option>
              </select>
            </div>
            <button onClick={handleAddIngredient} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Add Ingredient
            </button>
            <button onClick={handleCloseModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddIngredientModal;
