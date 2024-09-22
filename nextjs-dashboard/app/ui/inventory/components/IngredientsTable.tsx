'use client';
import { useState, useEffect } from 'react';

interface Ingredient {
  id: number;
  name: string;
  price: number;
  quantity: number;
  measure: string;
}

interface IngredientsTableProps {
  initialIngredients: Ingredient[];
  onDeleteIngredient: (id: number) => void;
  onUpdateIngredient: (ingredient: Ingredient) => void;
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({
  initialIngredients,
  onDeleteIngredient,
  onUpdateIngredient,
}) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedQuantity, setUpdatedQuantity] = useState(0);
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [updatedMeasure, setUpdatedMeasure] = useState('');

  // Actualiza el estado de ingredientes cuando cambie initialIngredients
  useEffect(() => {
    setIngredients(initialIngredients);
  }, [initialIngredients]);

  const handleEdit = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    setUpdatedName(ingredient.name);
    setUpdatedQuantity(ingredient.quantity);
    setUpdatedPrice(ingredient.price);
    setUpdatedMeasure(ingredient.measure);
  };

  const handleSave = () => {
    if (editingIngredient) {
      const updatedIngredient = {
        ...editingIngredient,
        name: updatedName,
        quantity: updatedQuantity,
        price: updatedPrice,
        measure: updatedMeasure,
      };
      onUpdateIngredient(updatedIngredient);
      setEditingIngredient(null); // Cierra el formulario de edición
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
              <td className="py-2 px-4 border-b">{ingredient.price}</td>
              <td className="py-2 px-4 border-b">{ingredient.measure}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleEdit(ingredient)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button onClick={() => onDeleteIngredient(ingredient.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingIngredient && (
        <div className="mt-4 p-4 border border-gray-300">
          <h3 className="text-lg font-bold mb-2">Edit Ingredient</h3>
          <input
            type="text"
            placeholder="Name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="border rounded w-full mb-2 p-2"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={updatedQuantity}
            onChange={(e) => setUpdatedQuantity(parseInt(e.target.value))}
            className="border rounded w-full mb-2 p-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(parseFloat(e.target.value))}
            className="border rounded w-full mb-2 p-2"
          />
          <select
            value={updatedMeasure}
            onChange={(e) => setUpdatedMeasure(e.target.value)}
            className="border rounded w-full mb-2 p-2"
          >
            <option value="unit">Unit</option>
            <option value="kg">Kg</option>
            <option value="lb">Lb</option>
          </select>
          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default IngredientsTable;
