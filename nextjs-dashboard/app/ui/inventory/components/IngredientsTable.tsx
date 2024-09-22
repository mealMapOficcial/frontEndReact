// IngredientsTable.tsx

import React from 'react';
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
              <td className="py-2 px-4 border-b">
                <button onClick={() => onUpdateIngredient(ingredient)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
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
    </div>
  );
};

export default IngredientsTable;
