import React, { useState } from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
} from "../ui/navigation-menu";
import { UtensilsCrossed, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="w-full bg-background sticky top-0 z-50">
            {/* Menú para escritorio */}
            <NavigationMenu className="hidden md:flex px-4 py-3 w-full max-w-screen">
                <ul className="flex justify-between w-full max-w-[1200px]">
                    {/* Menú alineado a la izquierda */}
                    <div className="flex gap-[24px] md:gap-[56px] lg:gap-[120px] items-center">
                        <Link to={"/platos"}>
                            <NavigationMenuItem>
                                <NavigationMenuLink >Menu</NavigationMenuLink>
                            </NavigationMenuItem>
                        </Link>
                        <Link to={"/#categorias-destacadas"}>
                            <NavigationMenuItem>
                                <NavigationMenuLink >Categorias</NavigationMenuLink>
                            </NavigationMenuItem>
                        </Link>

                    </div>
                    <div className="center flex items-center justify-center ml-10 gap-2">
                        {/* Logo del restaurante */}
                        <UtensilsCrossed className="h-5 w-5" />
                        <span className="font-bold font-display">Restaurante</span>
                    </div>
                    {/* Menú alineado a la derecha */}
                    <div className="flex gap-[24px] md:gap-[56px] lg:gap-[120px] items-center">
                        <Link to={"/#nuevos-sabores"}>
                            <NavigationMenuLink>
                                Nuevos Sabores
                            </NavigationMenuLink>                        
                        </Link>
                        <Link to={"/#location"}>                        
                            <NavigationMenuItem>
                                <NavigationMenuLink >Nosotros</NavigationMenuLink>
                            </NavigationMenuItem>
                        </Link>
                    </div>
                </ul>
            </NavigationMenu>

            {/* Menú para móviles */}
            <div className="md:hidden h-16 px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <UtensilsCrossed className="h-5 w-5" />
                    <span className="font-bold font-display">Restaurante</span>
                </div>
                <button
                    className="text-gray-700 focus:outline-none"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>
            <div
                className={`md:hidden bg-[#f7f5f0] shadow-md transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
            >
                <ul className="flex flex-col gap-4 p-4">
                    <li>
                        <Link
                            to="/platos"
                            className="text-gray-700 hover:text-gray-900"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Menu
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/#categorias-destacadas"
                            className="text-gray-700 hover:text-gray-900"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Categorias
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/#nuevos-sabores"
                            className="text-gray-700 hover:text-gray-900"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Nuevos Sabores
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/#location"
                            className="text-gray-700 hover:text-gray-900"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Nosotros
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;