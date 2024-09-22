'use client';

import { useState } from 'react';
import AddDishModal from "@/app/ui/inventory/components/AddDishModal";
import AddIngredientModal from "@/app/ui/inventory/components/AddIngredientModal";
import IngredientsTable from "@/app/ui/inventory/components/IngredientsTable";
import DishesTable from "@/app/ui/inventory/components/DishesTable";
import useDishes from "@/app/ui/inventory/hooks/useDishes";
import useIngredients from "@/app/ui/inventory/hooks/useIngredients";

export default function InventoryPage() {
    const { ingredients, addIngredient, deleteIngredient, updateIngredient } = useIngredients();
    const { dishes, addDish, deleteDish, updateDish } = useDishes();
    const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false); // Estado para el modal
  
    const handleOpenAddDishModal = () => {
      setIsAddDishModalOpen(true);
    };
  
    const handleCloseAddDishModal = () => {
      setIsAddDishModalOpen(false);
    };
  
    return (
      <section className="p-6">
        <h1 className="text-3xl font-bold mb-4">Manage Ingredients</h1>
        <IngredientsTable
          initialIngredients={ingredients}
          onDeleteIngredient={deleteIngredient}
          onUpdateIngredient={updateIngredient}
        />
        <AddIngredientModal onAddIngredient={addIngredient} />
  
        <h1 className="text-3xl font-bold mb-4">Manage Dishes</h1>
        <DishesTable
          initialDishes={dishes}
          onDeleteDish={deleteDish}
          onUpdateDish={updateDish}
        />
        <button onClick={handleOpenAddDishModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4">
          Add Dish
        </button>
        {isAddDishModalOpen && (
          <AddDishModal 
            onAddDish={addDish} 
            onClose={handleCloseAddDishModal} 
            availableIngredients={ingredients} 
          />
        )}
      </section>
    );
  }