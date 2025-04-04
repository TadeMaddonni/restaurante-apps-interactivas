import React, { useEffect, useState } from "react";
import data from "../../../api/data.json";
import ProductCard from "./ProductCard";

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState("empanadas");

	useEffect(() => {
		setTimeout(() => {
			setProducts(data);
		}, 3000);
	}, []);

	const handleCategoryChange = (ctg) => {
		setSelectedCategory(ctg);
	};
	console.log(data);

	return (
		<section className="w-full max-w-[980px] flex flex-col gap-10">
			<div className="flex  gap-3">
				<button
					type="button"
					className={` ${selectedCategory === "empanadas" ? "bg-blue-500 text-white" : "bg-gray-200"} px-4 py-2 rounded mt-4 hover:bg-blue-600 transition duration-200`}
					onClick={() => handleCategoryChange("empanadas")}
				>
					empanadas
				</button>
				<button
					type="button"
					className={` ${selectedCategory === "pastas" ? "bg-blue-500 text-white" : "bg-gray-200"} px-4 py-2 rounded mt-4 hover:bg-blue-600 transition duration-200`}
					onClick={() => handleCategoryChange("pastas")}
				>
					pastas
				</button>
				<button
					type="button"
					onClick={() => handleCategoryChange("minutas")}
					className={` ${selectedCategory === "minutas" ? "bg-blue-500 text-white" : "bg-gray-200"} px-4 py-2 rounded mt-4 hover:bg-blue-600 transition duration-200`}
				>
					minutas
				</button>
			</div>
			<div className="flex gap-10">
				{data.map((item) => {
					if (item.categoria === selectedCategory) {
						return (
							<div key={item.id} className="w-1/4">
								<ProductCard item={item} />
							</div>
						);
					}
				})}
			</div>
		</section>
	);
};

export default ProductList;
