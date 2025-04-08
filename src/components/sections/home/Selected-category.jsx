import { Button } from "../../ui/button"; // Import correcto
import React from "react";

export default function Category({ nombre, setProducts, products }) {
	const handleClick = () => {
		setProducts(products);
	};

	return (
		<div>
			<Button className="border cursor-pointer rounded-3xl bg-[#eeeeee00] text-black hover:bg-[#eeeeee00] hover:border-[#E3870E] border-[#000000]"  size="lg" onClick={handleClick}>
				{nombre}
			</Button>
		</div>
	);
}
