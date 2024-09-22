import AddIngredientModal from "@/app/ui/inventory/components/AddIngredientModal"
import IngredientsTable from "@/app/ui/inventory/components/IngredientsTable"
const initialIngredients =[
    { id: 1, name: 'Tomato',quantity: 10, price: 200, measure: 'kg' },
    { id: 2, name: 'Onion', quantity: 10, price: 150, measure: 'kg' },
    { id: 3, name: 'Garlic', quantity: 10, price: 300, measure: 'kg' },
]

export default function InventoryPage() { // Así se enruta otra pagina
    return <section>
        <IngredientsTable initialIngredients={initialIngredients} />
        <AddIngredientModal />  
    </section>
}