import React from "react";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuLink,
} from "../ui/navigation-menu";
import { UtensilsCrossed } from "lucide-react";

const Header = () => {
	return (
		<header className="w-full">
			<NavigationMenu className="px-4 py-3 flex w-full max-w-screen">
				<ul className="flex justify-between w-full max-w-[1200px]">
					{/* Menú alineado a la izquierda */}
					<div className="flex gap-[24px] md:gap-[56px] lg:gap-[120px] items-center ">
						<NavigationMenuItem>
							<NavigationMenuLink href="/menu">Menu</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink href="/reseñas">Reseñas</NavigationMenuLink>
						</NavigationMenuItem>
					</div>
					<div className="center flex items-center justify-center gap-2">
						{/* Logo del restaurante */}
						<UtensilsCrossed className="h-5 w-5" />
						<span className="font-bold italic ">Restaurante</span>
					</div>
					{/* Menú alineado a la derecha */}
					<div className="flex gap-[24px] md:gap-[56px] lg:gap-[120px] items-center ">
						<NavigationMenuLink href="/testimonios">
							Testimonios
						</NavigationMenuLink>
						<NavigationMenuItem>
							<NavigationMenuLink href="/contacto">Contacto</NavigationMenuLink>
						</NavigationMenuItem>
					</div>
				</ul>
			</NavigationMenu>
		</header>
	);
};
export default Header;
