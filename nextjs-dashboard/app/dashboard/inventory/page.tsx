'use client';

import { useState } from 'react';
import AddDishModal from "@/app/ui/inventory/components/AddDishModal";
import AddIngredientModal from "@/app/ui/inventory/components/AddIngredientModal";
import IngredientsTable from "@/app/ui/inventory/components/IngredientsTable";
import DishesTable from "@/app/ui/inventory/components/DishesTable";
import useDishes from "@/app/ui/inventory/hooks/useDishes";
import useIngredients from "@/app/ui/inventory/hooks/useIngredients";
import FloatingButton from '@/app/ui/inventory/components/FLoatingButton';


export default function InventoryPage() {
    const { ingredients, addIngredient, deleteIngredient, updateIngredient } = useIngredients();
    const { dishes, addDish, deleteDish, updateDish } = useDishes();
    const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false);
    const [isAddIngredientModalOpen, setIsAddIngredientModalOpen] = useState(false);

    const handleOpenAddDishModal = () => {
        setIsAddDishModalOpen(true);
    };

    const handleCloseAddDishModal = () => {
        setIsAddDishModalOpen(false);
    };

    const handleOpenAddIngredientModal = () => {
        setIsAddIngredientModalOpen(true);
    };

    const handleCloseAddIngredientModal = () => {
        setIsAddIngredientModalOpen(false);
    };

    return (
        <section className="p-2">
            <h1 className="text-3xl font-bold mb-4">Manage Ingredients</h1>
            <IngredientsTable
                initialIngredients={ingredients}
                onDeleteIngredient={deleteIngredient}
                onUpdateIngredient={updateIngredient}
            />
            {isAddIngredientModalOpen && (
                <AddIngredientModal 
                    onAddIngredient={(ingredient) => {
                        addIngredient(ingredient);
                        handleCloseAddIngredientModal();
                    }} 
                    onClose={handleCloseAddIngredientModal} // Agregado para manejar el cierre
                />
            )}

            <h1 className="text-3xl font-bold mb-4">Manage Dishes</h1>
            <DishesTable
                initialDishes={dishes}
                onDeleteDish={deleteDish}
                onUpdateDish={updateDish}
            />
            {isAddDishModalOpen && (
                <AddDishModal 
                    onAddDish={(dish) => {
                        addDish(dish);
                        handleCloseAddDishModal();
                    }} 
                    onClose={handleCloseAddDishModal} 
                    availableIngredients={ingredients} 
                />
            )}
            
            <FloatingButton 
                onOpenAddIngredient={handleOpenAddIngredientModal} 
                onOpenAddDish={handleOpenAddDishModal} 
            />
        </section>
    );
}
