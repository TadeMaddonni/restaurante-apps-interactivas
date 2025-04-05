import { useEffect, useState } from "react";
import Item from "./Selected-item";

const SelectedDishes = () => {
	const [selectedDishes, setSelectedDishes] = useState([]);
	const [selectedImage, setSelectedImage] = useState(
		selectedDishes[0]?.image || "hero-image.png",
	);
	console.log(selectedImage);
	useEffect(() => {
		// Fetch dishes
		const dishes = [
			{
				name: "Empanadas fritas",
				description: "Empanada de pollo al verdeo con huevo hecha al souffle",
				image: "/assets/empanadas-fritas.png",
				slug: "empanadas-fritas",
			},
			{
				name: "Milanesas",
				description:
					"Milanesa de ternera con distintas variedades y guarniciones",
				image: "/assets/milanesa.png",
				slug: "milanesas",
			},
			{
				name: "Choripan",
				description:
					"Choripan con chimichurri en pan francés con chimichurri y salsa criolla",
				image: "/assets/choripan.png",
				slug: "choripan",
			},
			{
				name: "Budin de pan",
				description: "Budin de pan con dulce de leche y crema batida",
				image: "/assets/budin-de-pan.png",
				slug: "budin-de-pan",
			},
		];
		setSelectedDishes(dishes);
	}, []);

	return (
		<section className="bg-[#EDE7D4] py-20 px-6 md:px-12 lg:px-16 text-center w-full space-y-12">
			<h2 className="text-4xl lg:text-6xl text-[#191514]font-display font-medium text-center  tracking-tighter ">
				Nuestros nuevos sabores
			</h2>
			<div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 ">
				{/* Izquierda */}
				<div className="hidden md:block space-y-5 md:space-y-[96px] text-left w-[300px]">
					{selectedDishes.slice(0, 2).map((dish) => (
						<Item
							key={dish.slug}
							title={dish.name}
							description={dish.description}
							image={dish.image}
							setImage={setSelectedImage}
						/>
					))}
				</div>

				{/* Imagen */}
				<div className="w-[300px] h-[400px] md:w-[480px] md:h-[680px]  rounded-[350px] overflow-hidden shadow-lg shadow-stone-400/80 relative">
					<img
						src={selectedImage}
						alt="Delicious Steak"
						className="w-full h-full object-cover transition-all ease-in-out duration-300 hover:scale-105"
					/>
				</div>

				{/* Derecha */}
				<div className="hidden md:block space-y-5 md:space-y-[96px] text-left w-[300px]">
					{selectedDishes.slice(2, 4).map((dish) => (
						<Item
							key={dish.slug}
							title={dish.name}
							description={dish.description}
							image={dish.image}
							setImage={setSelectedImage}
						/>
					))}
				</div>
				{/* Mobile */}
				<div className="w-full block md:hidden space-y-2 md:space-y-[96px] text-left md:w-[300px]">
					{selectedDishes.map((dish) => (
						<Item
							key={dish.slug}
							title={dish.name}
							description={dish.description}
							image={dish.image}
							setImage={setSelectedImage}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default SelectedDishes;
