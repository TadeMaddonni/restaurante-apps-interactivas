import React from "react";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuLink,
} from "../ui/navigation-menu";

const HeaderTomi = () => {
	return (
		<header className="">
			<div className="container mx-auto px-4 py-3 flex justify-between items-center">
				{/* Menú alineado a la izquierda */}
				<NavigationMenu>
					<NavigationMenuList className="flex gap-48">
						<NavigationMenuItem>
							<NavigationMenuLink href="/menu">Menu</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink href="/testimonios">
								Testimonios
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				{/* Menú alineado a la derecha */}
				<NavigationMenu>
					<NavigationMenuList className="flex gap-48">
						<NavigationMenuItem>
							<NavigationMenuLink href="/reseñas">Reseñas</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink href="/contacto">Contacto</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</header>
	);
};
export default HeaderTomi;
