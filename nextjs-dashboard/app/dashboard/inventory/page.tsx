'use client';
import AddIngredientModal from "@/app/ui/inventory/components/AddIngredientModal";
import IngredientsTable from "@/app/ui/inventory/components/IngredientsTable";
import useIngredients from "@/app/ui/inventory/hooks/useIngredients";

export default function InventoryPage() {
  const { ingredients, addIngredient, deleteIngredient, updateIngredient } = useIngredients();

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Ingredients</h1>
      <IngredientsTable
        initialIngredients={ingredients}
        onDeleteIngredient={deleteIngredient}
        onUpdateIngredient={updateIngredient}
      />
      <AddIngredientModal onAddIngredient={addIngredient} />
    </section>
  );
}
