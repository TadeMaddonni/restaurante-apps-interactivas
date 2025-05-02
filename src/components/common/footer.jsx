import React from "react";
import { Instagram, Facebook } from "lucide-react";
import { RestaurantLogo } from "../icons/RestaurantLogo";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="w-full bg-[#4B5728] text-[#E0E0E0] py-15 px-4 md:px-12 lg:px-16 flex flex-col items-center justify-center space-y-8">
			{/* Logo */}
			<div className="w-full max-w-[1200px] flex items-center justify-center md:justify-start">
				<div className="flex items-center gap-4">
					<RestaurantLogo />
					<span className="font-bold font-display text-4xl">Restaurante</span>
				</div>
			</div>

			{/* Links y Redes Sociales */}
			<div className="flex flex-col md:flex-row w-full max-w-[1200px] items-center md:items-start justify-between gap-6 border-b border-[#E0E0E0] pb-6">
				{/* Navegación */}
				<ul className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm md:text-base">
					<li>
						<Link to="/platos">
							Menú
						</Link>
					</li>
				  <li>
						<Link
							to="/#categorias-destacadas"
						
						>
							Categorias destacadas
						</Link>
					</li>
					<li>
						<Link
							to="/#nuevos-sabores"
						
						>
							Nuevos Sabores
						</Link>
					</li>
					<li>
						<Link
							to="/#location"
						
						>
							Nosotros
						</Link>
					</li>
				</ul>

				{/* Redes Sociales */}
				<ul className="flex gap-4">
					<li>
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Instagram className="w-6 h-6 text-[#acacac] hover:opacity-80" />
						</a>
					</li>
					<li>
						<a
							href="https://facebook.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Facebook className="w-6 h-6 text-[#acacac] hover:opacity-80" />
						</a>
					</li>
				</ul>
			</div>

			{/* Copyright */}
			<div className="w-full max-w-[1200px]">
				<p className="text-sm text-center md:text-left text-[#acacac]">
					© 2023 Restaurante Argentino. Todos los derechos reservados.
				</p>
			</div>
		</footer>
	);
};
export default Footer;
