import { useEffect, useState } from "react";
import Category from "./Selected-category";
import ProductData from "../../../data/products.json"; // Importa los productos
import CategoryItem from "./Category-item";
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { getActiveCategories } from "../../../services/categories";

const Destacados = () => {
	const [categories, setCategories] = useState([]); // Categorías
	const [selectedCategory, setSelectedCategory] = useState(1); // Categoría seleccionada
	const [selectedDishes, setSelectedDishes] = useState([]); // Platos filtrados
	const [selectedItem, setSelectedItem] = useState(null); // Plato seleccionado
	const [selectedImage, setSelectedImage] = useState("hero-image.png"); // Imagen seleccionada
	const [isImageLoading, setIsImageLoading] = useState(true); // Estado de carga de la imagen
	const [loading, setLoading] = useState(true); // Estado de carga de categorías

	// Cargar categorías dinámicamente desde la API
	useEffect(() => {
		const loadCategories = async () => {
			try {
				setLoading(true)
				const result = await getActiveCategories()
				
				if (result.success) {
					// Filtrar solo las categorías que están seleccionadas
					const activeCategories = result.categories.filter(ctg => ctg.selected_category !== false)
					setCategories(activeCategories)
				} else {
					console.error('Error al cargar categorías:', result.error)
					setCategories([])
				}
			} catch (error) {
				console.error('Error al cargar categorías:', error)
				setCategories([])
			} finally {
				setLoading(false)
			}
		}
		
		loadCategories()
	}, []);

	// Filtrar platos según la categoría seleccionada
	useEffect(() => {
		const filteredDishes = ProductData.filter(
			(dish) => dish.id_categoria === selectedCategory,
		);
		setSelectedDishes(filteredDishes);

		// Seleccionar el primer plato de la categoría y su imagen
		if (filteredDishes.length > 0) {
			setSelectedItem(filteredDishes[0].id); // Selecciona el primer plato
			setSelectedImage(filteredDishes[0].imagen || "hero-image.png"); // Selecciona su imagen
			setIsImageLoading(true); // Reinicia el estado de carga de la imagen
		}
	}, [selectedCategory]);

	const handleImageLoad = () => {
		setIsImageLoading(false); // Marca la imagen como cargada
	};

	const handleImageChange = (image) => {
		if (selectedImage === image) return;
		
		setSelectedImage(image)
		setIsImageLoading(true)
	}

	return (
		<section id="categorias-destacadas" className="bg-[#EDE7D4] py-20 px-6 md:px-12 lg:px-16 text-left w-full space-y-12 md:gap-6 flex flex-col justify-center items-center overflow-hidden">
			<div className="flex justify-between align-top max-w-[1200px] mx-auto w-full flex-wrap gap-12">
				<div className="flex flex-col gap-8 text-left w-full md:w-1/2">
					<h2 className="text-4xl lg:text-6xl text-[#191514] font-display font-medium text-left tracking-tighter">
						Categorías destacadas
					</h2>
					<div className="flex overflow-x-visible md:flex-wrap gap-2">
						{loading ? (
							// Loading skeleton para categorías
							Array.from({ length: 4 }).map((_, index) => (
								<div key={index} className="animate-pulse">
									<div className="h-10 w-24 bg-gray-200 rounded-3xl"></div>
								</div>
							))
						) : (
							categories.map((category) => (
								<Category
									key={category.id}
									nombre={category.nombre}
									id={category.id}
									setCategory={setSelectedCategory}
									selectedCategory={selectedCategory} // Pasar el estado seleccionado
								/>
							))
						)}
					</div>
				</div>
				<div className="hidden md:flex flex-col items-start gap-10 md:gap-8 text-left w-full md:w-3/8 md:pt-4">
					<p className="font-normal text-[#888272]">
						Descubre los platos más exquisitos de nuestro restaurante argentino,
						donde la tradición y los sabores auténticos se combinan para
						ofrecerte una experiencia culinaria inolvidable.
					</p>
					<a
						href="/platos"
						className="text-[#E3870E] underline flex gap-1 font-medium underline-offset-4"
					>
						Ver Más
						<div className="rotate-[45deg] w-fit h-fit hover:rotate-[90deg] transition-all duration-300 ease-in-out">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
							>
								<title>Arrow pointing upwards</title>
								<path
									fill="none"
									stroke="#E0890C"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.8"
									d="M12 21V3m0 0l8.5 8.5M12 3l-8.5 8.5"
								/>
							</svg>
						</div>
					</a>
				</div>
			</div>

			<div className="bg-[#4B5728] rounded-3xl flex flex-col-reverse md:flex-row	  justify-between gap-4 p-6 md:p-8 w-full max-w-[1200px] flex-wrap md:gap-0 ">
				<div className="w-full flex flex-col gap-4 text-[#DCE2CB] md:w-1/2 md:pr-8">
					<div className="flex flex-col ">
						{selectedDishes.slice(0, 5).map((dish) => (
							<CategoryItem
								key={dish.id}
								title={dish.nombre}
								description={dish.descripcion}
								price={dish.precio}
								image={dish.imagen || "default-image.png"}
								setProductImage={handleImageChange}
								id={dish.id}
								selectedItem={selectedItem} // Pasar el estado seleccionado
								setSelectedItem={setSelectedItem} // Pasar la función para actualizar el seleccionado
							/>
						))}
					</div>
				</div>
				<div className="md:pl-8 w-full md:w-1/2 h-[250px] md:h-[450px]  max-h-[450px] md:max-w-1/2 relative">
					{isImageLoading && (
						<div className="absolute inset-0 W-full max-w-full flex flex-col gap-3 items-center justify-center rounded-3xl">
							<span className="text-gray-200">Cargando...</span>
							<LoaderCircle className="text-white animate-spin "/>
						</div>
					)}
					<img
						src={selectedImage}
						alt="Plato seleccionado"
						className={`rounded-3xl object-cover min-w-full w-full h-full max-h-[450px] transition-opacity duration-500 ${
							isImageLoading ? "opacity-0" : "opacity-100"
						}`}
						onLoad={handleImageLoad}
					/>
				</div>
			</div>

			<div className="flex flex-col items-start gap-10 md:gap-8 text-left w-full md:w-3/8 md:pt-4 md:hidden">
				<p className="font-normal text-[#888272]">
					Descubre los platos más exquisitos de nuestro restaurante argentino,
					donde la tradición y los sabores auténticos se combinan para ofrecerte
					una experiencia culinaria inolvidable.
				</p>
				<Link
					href="/platos"
					className="text-[#E3870E] underline flex gap-1 font-medium underline-offset-4"
				>
					Ver Más
					<div className="rotate-[45deg] w-fit h-fit hover:rotate-[90deg] transition-all duration-300 ease-in-out">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
						>
							<title>Arrow pointing upwards</title>
							<path
								fill="none"
								stroke="#E0890C"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.8"
								d="M12 21V3m0 0l8.5 8.5M12 3l-8.5 8.5"
							/>
						</svg>
					</div>
				</Link>
			</div>
		</section>
	);
};

export default Destacados;
