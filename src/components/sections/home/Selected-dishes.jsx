import { useEffect, useState } from "react";
import data from "../../../data/products.json";
import Item from "./Selected-item";
import { getAllPlates } from "../../../services/plates";

const SelectedDishes = () => {
	const [selectedDishes, setSelectedDishes] = useState([]);
	const [selectedImage, setSelectedImage] = useState(
		selectedDishes[0]?.image || "/assets/hero-image.png",
	);

	useEffect(() => {
		// Fetch dishes
		const fetchDishes = async () => {
			const allDishes = await getAllPlates();
			setSelectedDishes(allDishes.dishes.slice(0, 4));
			setSelectedImage(allDishes[0]?.image_path || "/assets/hero-image.png");
		}
		fetchDishes();

		setSelectedImage(selectedDishes[0]?.imagen || "/assets/hero-image.png");
	}, []);

	return (
		<section id="nuevos-sabores" className="bg-[#EDE7D4] py-20 px-6 md:px-12 lg:px-16 text-center w-full space-y-12">
			<h2 className="text-4xl lg:text-6xl text-[#191514]font-display font-medium text-center  tracking-tighter ">
				Nuestros nuevos sabores
			</h2>
			<div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 ">
				{/* Izquierda */}
				<div className="hidden md:block space-y-8 md:space-y-[96px] text-left w-[300px]">
					{selectedDishes.slice(0, 2).map((dish) => (
						<Item
							key={dish.id}
							id={dish.id}
							title={dish.nombre}
							description={dish.descripcion}
							image={dish.image_path}
							setImage={setSelectedImage}
						/>
					))}
				</div>

				{/* Imagen */}
				<div className="w-[300px] h-[400px] md:w-[480px] md:h-[680px]  rounded-[350px] overflow-hidden shadow-lg shadow-stone-400/80 relative">
					<img
						src={selectedImage || "hero-image.png"}
						alt="Delicious Steak"
						className="w-full h-full object-cover transition-all ease-in-out duration-300 hover:scale-105"
					/>
				</div>

				{/* Derecha */}
				<div className="hidden md:block space-y-5 md:space-y-[96px] text-left w-[300px]">
					{selectedDishes.slice(2, 4).map((dish) => (
						<Item
							key={dish.id}
							id={dish.id}
							title={dish.nombre}
							description={dish.descripcion}
							image={dish.image_path}
							setImage={setSelectedImage}
						/>
					))}
				</div>
				{/* Mobile */}
				<div className="w-full block md:hidden space-y-2 md:space-y-[96px] text-left md:w-[300px]">
					{selectedDishes.map((dish) => (
						<Item
							key={dish.id}
							id={dish.id}
							title={dish.nombre}
							description={dish.descripcion}
							image={dish.image_path}
							setImage={setSelectedImage}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default SelectedDishes;
