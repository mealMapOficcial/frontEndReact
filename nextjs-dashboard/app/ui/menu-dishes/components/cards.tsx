// components/Card.tsx
'use client';

import { useState } from 'react';

interface Ingredient {
  id: number;
  name: string;
  price: number;
  measure: string;
}

interface CardProps {
  image: string;
  name: string;
  description: string; // Aquí se pasará el precio
  ingredients: Ingredient[]; // Agregar la prop para los ingredientes
  addToCart: (dish: string, quantity: number, price: number) => void;
}

const Card: React.FC<CardProps> = ({ image, name, description, ingredients, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [removedIngredients, setRemovedIngredients] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    if (removedIngredients.includes(id)) {
      setRemovedIngredients(removedIngredients.filter(ingId => ingId !== id));
    } else {
      setRemovedIngredients([...removedIngredients, id]);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const price = parseFloat(description.split('$')[1]); // Extraer el precio de la descripción
    addToCart(name, quantity, price);
  };

  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <img className="w-full h-48 object-cover" src={image} alt={name} />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-700 mb-4">{description}</p>

        {ingredients.map(ingredient => (
          <div key={ingredient.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`remove-${ingredient.id}`}
              className="mr-2"
              checked={removedIngredients.includes(ingredient.id)}
              onChange={() => handleCheckboxChange(ingredient.id)}
            />
            <label htmlFor={`remove-${ingredient.id}`} className="text-gray-700">
              Remove {ingredient.name}
            </label>
          </div>
        ))}

        {removedIngredients.length > 0 && (
          <p className="text-red-500 text-sm mb-2">Ingredient removed</p>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button
              onClick={handleDecrease}
              className="bg-gray-300 px-2 py-1 rounded-lg text-gray-700"
            >
              -
            </button>
            <span className="px-4 text-lg">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="bg-gray-300 px-2 py-1 rounded-lg text-gray-700"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
