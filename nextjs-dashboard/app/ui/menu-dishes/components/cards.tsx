'use client';

import { useState } from 'react';

interface CardProps {
  image: string;
  name: string;
  description: string; // Aquí se pasará el precio
  addToCart: (dish: string, quantity: number) => void;
}

const Card: React.FC<CardProps> = ({ image, name, description, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleCheckboxChange = () => {
    setIsRemoved(!isRemoved);
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
    addToCart(name, quantity);
  };

  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <img className="w-full h-48 object-cover" src={image} alt={name} />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-700 mb-4">{description}</p>

        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id={`remove-${name}`}
            className="mr-2"
            checked={isRemoved}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={`remove-${name}`} className="text-gray-700">
            Remove ingredient
          </label>
        </div>

        {isRemoved && (
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
