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
    <div className="fixed right-4 bottom-4 flex items-center sm:right-6 sm:bottom-6 md:right-8 md:bottom-8">
      <button
        onClick={toggleMenu}
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 sm:p-4 md:p-5"
      >
        +
      </button>

      {isOpen && (
        <div className="flex flex-row-reverse space-x-2 space-x-reverse mr-4 sm:space-x-3 md:space-x-4">
          <button
            onClick={handleAddIngredient}
            className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 text-xs sm:text-sm md:text-base"
          >
            Add Ingredient
          </button>
          <button
            onClick={handleAddDish}
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-xs sm:text-sm md:text-base"
          >
            Add Dish
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
