import { useEffect, useState } from "react";
import Category from "./Selected-category";
import CategoryData from "../../../data/category.json";

const Destacados = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch dishes
        setCategories(CategoryData);
    }, []);

    return (
        <section className="bg-[#EDE7D4] py-20 px-6 md:px-12 lg:px-16 text-left w-full space-y-12  gap-20">
            <div className="flex  justify-between align-top max-w-[1200px] mx-auto w-full flex-wrap gap-12 ">
                <div className="flex flex-col gap-8  text-left  w-full md:w-1/2">
                    <h2 className="text-4xl lg:text-6xl text-[#191514]font-display font-medium text-left  tracking-tighter ">
                        Categorías destacadas
                    </h2>
                    <div className="flex flex-wrap gap-2 ">
                        {categories.map((category) => (
                            <Category
                                key={category.id}
                                nombre={category.nombre}
                            />
                        ))}
                    </div>
                </div>
                <div  className="flex flex-col items-start  gap-10 md:gap-8 text-left w-full md:w-3/8 md:pt-4">
                    <p className="font-normal text-[#888272]">
                        Descubre los platos más exquisitos de nuestro restaurante argentino, donde la tradición y los sabores auténticos se combinan para ofrecerte una experiencia culinaria inolvidable. 
                    </p>
                    <a href="/menu" className="text-[#E3870E] underline flex gap-1 font-medium underline-offset-4">Ver Más <div className="rotate-[45deg] w-fit h-fit hover:rotate-[90deg] transition-all duration-300 ease-in-out">
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
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.8"
							d="M12 21V3m0 0l8.5 8.5M12 3l-8.5 8.5"
						/>
					</svg>
				</div></a>
                </div>
            </div>

        </section>
    );
}

export default Destacados;