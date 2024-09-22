import React, { useState } from 'react';
import { Ingredient } from '@/app/shared/interfaces/dish';

interface IngredientsTableProps {
  initialIngredients: Ingredient[];
  onDeleteIngredient: (id: number) => void;
  onUpdateIngredient: (updatedIngredient: Ingredient) => void;
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({
  initialIngredients,
  onDeleteIngredient,
  onUpdateIngredient,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient | null>(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [updatedMeasure, setUpdatedMeasure] = useState('');
  const [updatedQuantity, setUpdatedQuantity] = useState(0);

  const handleEditClick = (ingredient: Ingredient) => {
    setCurrentIngredient(ingredient);
    setUpdatedName(ingredient.name);
    setUpdatedPrice(ingredient.price);
    setUpdatedMeasure(ingredient.measure);
    setUpdatedQuantity(ingredient.quantity);
    setIsEditing(true);
  };

  const handleUpdateIngredient = () => {
    if (currentIngredient) {
      onUpdateIngredient({
        ...currentIngredient,
        name: updatedName,
        price: updatedPrice,
        measure: updatedMeasure,
        quantity: updatedQuantity,
      });
      setIsEditing(false);
      setCurrentIngredient(null);
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
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Measure</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {initialIngredients.map((ingredient) => (
            <tr key={ingredient.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{ingredient.id}</td>
              <td className="py-2 px-4 border-b">{ingredient.name}</td>
              <td className="py-2 px-4 border-b">${ingredient.price}</td>
              <td className="py-2 px-4 border-b">{ingredient.measure}</td>
              <td className="py-2 px-4 border-b">{ingredient.quantity}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleEditClick(ingredient)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
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

      {isEditing && currentIngredient && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h3 className="text-xl font-bold mb-2">Edit Ingredient</h3>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="border rounded w-full mb-2 p-2"
            placeholder="Ingredient Name"
          />
          <input
            type="number"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(parseFloat(e.target.value))}
            className="border rounded w-full mb-2 p-2"
            placeholder="Price"
          />
          <input
            type="text"
            value={updatedMeasure}
            onChange={(e) => setUpdatedMeasure(e.target.value)}
            className="border rounded w-full mb-2 p-2"
            placeholder="Measure"
          />
          <input
            type="number"
            value={updatedQuantity}
            onChange={(e) => setUpdatedQuantity(parseInt(e.target.value))}
            className="border rounded w-full mb-2 p-2"
            placeholder="Quantity"
          />
          <button onClick={handleUpdateIngredient} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Update
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default IngredientsTable;
