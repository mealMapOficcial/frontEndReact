import React, { useState } from 'react';
import { Ingredient } from '@/app/shared/interfaces/dish';
import Swal from 'sweetalert2';
import useIngredients from '../hooks/useIngredients';
interface IngredientsTableProps {
  // Eliminamos initialIngredients porque usaremos el hook para obtener los ingredientes
  onUpdateIngredient: (updatedIngredient: Ingredient) => void;
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({
  onUpdateIngredient,
}) => {
  const { ingredients, deleteIngredient } = useIngredients(); // Usamos el hook
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

  const handleUpdateIngredient = async () => {
    if (currentIngredient) {
      const updatedIngredient = {
        ...currentIngredient,
        name: updatedName,
        price: updatedPrice,
        measure: updatedMeasure,
        quantity: updatedQuantity,
      };

      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this ingredient?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!',
      });

      if (result.isConfirmed) {
        await onUpdateIngredient(updatedIngredient);
        setIsEditing(false);
        setCurrentIngredient(null);
        Swal.fire('Updated!', 'Your ingredient has been updated.', 'success');
      }
    }
  };

  const handleDeleteClick = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this ingredient!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (result.isConfirmed) {
      await deleteIngredient(id); // Usamos la función del hook para eliminar
      await Swal.fire('Deleted!', 'Your ingredient has been deleted.', 'success');
  
      // Espera 2 segundos antes de recargar la página
      setTimeout(() => {
        window.location.reload();
      }, 500); // Cambia 2000 a cualquier cantidad de milisegundos que desees
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Ingredients Table</h2>

      <div className="overflow-x-auto">
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
            {ingredients.map((ingredient) => (
              <tr key={ingredient.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{ingredient.id}</td>
                <td className="py-2 px-4 border-b">{ingredient.name}</td>
                <td className="py-2 px-4 border-b">${ingredient.price}</td>
                <td className="py-2 px-4 border-b">{ingredient.measure}</td>
                <td className="py-2 px-4 border-b">{ingredient.quantity}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEditClick(ingredient)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs sm:text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(ingredient.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs sm:text-sm ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditing && currentIngredient && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h3 className="text-xl font-bold mb-2">Edit Ingredient</h3>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="border rounded w-full mb-2 p-2 text-sm sm:text-base"
            placeholder="Ingredient Name"
          />
          <input
            type="number"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(parseFloat(e.target.value))}
            className="border rounded w-full mb-2 p-2 text-sm sm:text-base"
            placeholder="Price"
          />
          <input
            type="text"
            value={updatedMeasure}
            onChange={(e) => setUpdatedMeasure(e.target.value)}
            className="border rounded w-full mb-2 p-2 text-sm sm:text-base"
            placeholder="Measure"
          />
          <input
            type="number"
            value={updatedQuantity}
            onChange={(e) => setUpdatedQuantity(parseInt(e.target.value))}
            className="border rounded w-full mb-2 p-2 text-sm sm:text-base"
            placeholder="Quantity"
          />
          <button
            onClick={handleUpdateIngredient}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm sm:text-base"
          >
            Update
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2 text-sm sm:text-base"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default IngredientsTable;
