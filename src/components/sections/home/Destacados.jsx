import { useEffect, useState } from "react";
import Category from "./Selected-category";
import CategoryData from "../../../data/category.json";
import ProductData from "../../../data/products.json"; // Importa los productos
import CategoryItem from "./Category-item";

const Destacados = () => {
    const [categories, setCategories] = useState([]); // Categorías
    const [selectedCategory, setSelectedCategory] = useState(1); // Categoría seleccionada
    const [selectedDishes, setSelectedDishes] = useState([]); // Platos filtrados
    const [selectedImage, setSelectedImage] = useState("hero-image.png"); // Imagen seleccionada

    // Cargar categorías al montar el componente
    useEffect(() => {
        setCategories(CategoryData); // Carga las categorías desde el archivo JSON
    }, []);

    // Filtrar platos según la categoría seleccionada
    useEffect(() => {
        const filteredDishes = ProductData.filter(
            (dish) => dish.id_categoria === selectedCategory
        );
        setSelectedDishes(filteredDishes);

        // Cambiar la imagen al primer plato de la categoría seleccionada
        if (filteredDishes.length > 0) {
            setSelectedImage(filteredDishes[0].image || "hero-image.png");
        }
    }, [selectedCategory]);

    return (
        <section className="bg-[#EDE7D4] py-20 px-6 md:px-12 lg:px-16 text-left w-full space-y-12 gap-20">
            <div className="flex justify-between align-top max-w-[1200px] mx-auto w-full flex-wrap gap-12">
                <div className="flex flex-col gap-8 text-left w-full md:w-1/2">
                    <h2 className="text-4xl lg:text-6xl text-[#191514] font-display font-medium text-left tracking-tighter">
                        Categorías destacadas
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Category
                                key={category.id}
                                nombre={category.nombre}
                                id={category.id}
                                setCategory={setSelectedCategory}
                                selectedCategory={selectedCategory} // Pasar el estado seleccionado
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-start gap-10 md:gap-8 text-left w-full md:w-3/8 md:pt-4">
                    <p className="font-normal text-[#888272]">
                        Descubre los platos más exquisitos de nuestro restaurante argentino, donde la tradición y los sabores auténticos se combinan para ofrecerte una experiencia culinaria inolvidable.
                    </p>
                    <a
                        href="/menu"
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

            <div className="bg-[#4B5728] rounded-3xl flex flex-row justify-between gap-4 p-2 w-full max-w-[1200px]">
                <div className="w-full flex flex-col gap-4 text-[#DCE2CB]">
                    <h2>SABORES TRADICIONALES PARA EXIGENTES PALADARES</h2>
                    <div className="flex flex-col  gap-4">
                        {selectedDishes.map((dish) => (
                            <CategoryItem
                                key={dish.id}
                                title={dish.nombre}
                                description={dish.descripcion}
                                price={dish.precio}
                                image={dish.image || "default-image.png"}
                                setProductImage={setSelectedImage}
                            />
                        ))}
                    </div>
                </div>
                <img src={selectedImage} alt="Plato seleccionado" />
            </div>
        </section>
    );
};

export default Destacados;