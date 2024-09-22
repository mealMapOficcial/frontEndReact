'use client';
import { useState } from 'react';

interface Ingredient {
  id: number;
  name: string;
  price: number;
  quantity: number;
  measure: string;
}

interface IngredientsTableProps {
  initialIngredients: Ingredient[];
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({ initialIngredients }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedQuantity, setUpdatedQuantity] = useState(0);
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [updatedMeasure, setUpdatedMeasure] = useState('');

  const handleDelete = (id: number) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const handleEdit = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    setUpdatedName(ingredient.name);
    setUpdatedQuantity(ingredient.quantity);
    setUpdatedPrice(ingredient.price);
    setUpdatedMeasure(ingredient.measure);
  };

  const handleSave = () => {
    if (editingIngredient) {
      const updatedIngredients = ingredients.map((ingredient) =>
        ingredient.id === editingIngredient.id
          ? { ...ingredient, name: updatedName,quantity:  updatedQuantity, price: updatedPrice, measure: updatedMeasure }
          : ingredient
      );
      setIngredients(updatedIngredients);
      setEditingIngredient(null); // Close the editing form
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Ingredients Table</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Measure</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{ingredient.id}</td>
              <td className="py-2 px-4 border-b">{ingredient.name}</td>
              <td className="py-2 px-4 border-b">{ingredient.quantity}</td>
              <td className="py-2 px-4 border-b">${ingredient.price}</td>
              <td className="py-2 px-4 border-b">{ingredient.measure}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleEdit(ingredient)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(ingredient.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingIngredient && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4">Edit Ingredient</h3>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Name</label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Quantity</label>
            <input
              type="number"
              className="border rounded w-full py-2 px-3 text-gray-700"
              value={updatedQuantity}
              onChange={(e) => setUpdatedQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Price</label>
            <input
              type="number"
              className="border rounded w-full py-2 px-3 text-gray-700"
              value={updatedPrice}
              onChange={(e) => setUpdatedPrice(parseFloat(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Measure</label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700"
              value={updatedMeasure}
              onChange={(e) => setUpdatedMeasure(e.target.value)}
            />
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default IngredientsTable;
