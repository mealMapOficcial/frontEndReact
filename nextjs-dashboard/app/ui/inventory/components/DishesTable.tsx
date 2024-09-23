'use client';

import { useState } from 'react';
import { Dish } from '@/app/shared/interfaces/dish';
import React from 'react';

interface DishesTableProps {
  initialDishes: Dish[];
  onDeleteDish: (id: number) => void;
  onUpdateDish: (updatedDish: Dish) => void;
}

const DishesTable: React.FC<DishesTableProps> = ({
  initialDishes,
  onDeleteDish,
  onUpdateDish,
}) => {
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [openDishId, setOpenDishId] = useState<number | null>(null); // Estado para manejar el dropdown

  const handleEdit = (dish: Dish) => {
    setEditingDish(dish);
  };

  const handleSave = (updatedDish: Dish) => {
    onUpdateDish(updatedDish);
    setEditingDish(null);
  };

  const toggleDropdown = (id: number) => {
    setOpenDishId(openDishId === id ? null : id);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dishes Table</h2>

      {/* Tabla responsive */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialDishes.map((dish) => (
              <React.Fragment key={dish.id}>
                <tr className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{dish.id}</td>
                  <td className="py-2 px-4 border-b">{dish.name}</td>
                  <td className="py-2 px-4 border-b">${dish.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{dish.typeOfDishes}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEdit(dish)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs sm:text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteDish(dish.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2 text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => toggleDropdown(dish.id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 ml-2 text-xs sm:text-sm"
                    >
                      {openDishId === dish.id ? 'Hide Ingredients' : 'Show Ingredients'}
                    </button>
                  </td>
                </tr>
                {openDishId === dish.id && (
                  <tr>
                    <td colSpan={5} className="border-b">
                      <ul className="pl-4">
                        {dish.ingredients.map((ingredient) => (
                          <li key={ingredient.id} className="text-sm sm:text-base">
                            {ingredient.name} - ${ingredient.price.toFixed(2)} ({ingredient.measure}) - Qty: {ingredient.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulario de edición responsive */}
      {editingDish && (
        <div className="mt-4 p-4 border border-gray-300">
          <h3 className="text-lg font-bold mb-2">Edit Dish</h3>
          <input
            type="text"
            placeholder="Name"
            value={editingDish.name}
            onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
            className="border rounded w-full mb-2 p-2 text-sm sm:text-base"
          />
          <input
            type="number"
            placeholder="Price"
            value={editingDish.price}
            onChange={(e) => setEditingDish({ ...editingDish, price: parseFloat(e.target.value) })}
            className="border rounded w-full mb-2 p-2 text-sm sm:text-base"
          />
          <select
            value={editingDish.typeOfDishes}
            onChange={(e) => setEditingDish({ ...editingDish, typeOfDishes: e.target.value })}
            className="border rounded w-full mb-2 p-2 text-sm sm:text-base"
          >
            <option value="AFTERNOON">Afternoon</option>
            <option value="MORNING">Morning</option>
            <option value="EVENING">Evening</option>
          </select>
          <button
            onClick={() => handleSave(editingDish)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm sm:text-base"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default DishesTable;
