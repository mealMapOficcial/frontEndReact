import SideNav from "../ui/dashboard/sidenav";

export default function Layout( // Ese layout solo funciona con los que está al mismo nivel y hacia abajo

    {children} : { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <header className="w-full d-flex item-center">
            <div><img src="/Logo.jepg" alt="Meal Map" /></div>
            </header>
            <div className="w-full flex-none md:w-64">
                <SideNav></SideNav>
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    )
}