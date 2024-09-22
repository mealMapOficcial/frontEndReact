'use client';
import { useState } from 'react';

interface Ingredient {
  id: number;
  name: string;
}

const AddIngredientModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState('');

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim() === '') return;

    const newId = ingredients.length + 1;
    const ingredient = { id: newId, name: newIngredient };
    setIngredients([...ingredients, ingredient]);
    setNewIngredient(''); // Limpiar el campo de texto
  };

  return (
    <div>
      {/* Botón fixado en la parte inferior derecha */}
      <button
        onClick={handleOpenModal}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
      >
        +
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Agregar Ingrediente</h2>

            {/* Input para nuevo ingrediente */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Nombre del ingrediente"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>

            {/* Botón para agregar el nuevo ingrediente */}
            <button
              onClick={handleAddIngredient}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Agregar Ingrediente
            </button>

            {/* Lista de ingredientes */}
            <ul className="mt-4">
              {ingredients.map((ingredient) => (
                <li key={ingredient.id} className="border-b py-2">
                  {ingredient.name}
                </li>
              ))}
            </ul>

            {/* Botón para cerrar el modal */}
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddIngredientModal;
