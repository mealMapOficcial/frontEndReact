import { useState } from 'react';

const FloatingButton: React.FC<{
  onOpenAddIngredient: () => void;
  onOpenAddDish: () => void;
}> = ({ onOpenAddIngredient, onOpenAddDish }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleAddIngredient = () => {
    onOpenAddIngredient(); // Abre el modal de añadir ingrediente
    setIsOpen(false); // Cierra el menú del botón flotante
  };

  const handleAddDish = () => {
    onOpenAddDish(); // Abre el modal de añadir plato
    setIsOpen(false); // Cierra el menú del botón flotante
  };

  return (
    <div className="fixed left-4 bottom-4 flex items-start">
      <button
        onClick={toggleMenu}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
      >
        +
      </button>

      {isOpen && (
        <div className="flex space-x-1 mt-2">
          <button
            onClick={handleAddIngredient}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Ingredient
          </button>
          <button
            onClick={handleAddDish}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Dish
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
