import React from "react";

const ProductCard = ({ item }) => {
	const { nombre, descripcion, imagen, precio } = item;
	return (
		<div>
			<img src={imagen} alt={nombre} className="w-full h-48 object-cover" />
			<h2 className="text-xl font-bold mt-4">{nombre}</h2>
			<p className="text-gray-700">{descripcion}</p>
			<p className="text-lg font-semibold mt-2">{precio}</p>
			<button
				type="button"
				className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition duration-200"
			>
				Agregar al carrito
			</button>
		</div>
	);
};

export default ProductCard;
