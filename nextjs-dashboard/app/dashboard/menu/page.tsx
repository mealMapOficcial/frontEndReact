import Card from "@/app/ui/menu-dishes/cards"

export default function MenusPage() { // Así se enruta otra pagina
    return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
            image="https://via.placeholder.com/150"
            name="Dish 1"
            description="This is a delicious dish."
        />
        <Card
            image="https://via.placeholder.com/150"
            name="Dish 2"
            description="This is another tasty dish."
        />
        <Card
            image="https://via.placeholder.com/150"
            name="Dish 3"
            description="Enjoy this amazing dish."
        />
    </div>
)
}