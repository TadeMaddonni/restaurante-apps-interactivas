export default function CategoryItem({ title, description, price, image, setProductImage }) {
	const handleClick = () => {
		setProductImage(image);
        showProductDetails(description);
	};

	return (
		<div onClick={handleClick} className="cursor-pointer w-full flex flex-col gap-4 text-[#DCE2CB] border-b border-[#DCE2CB] pb-2">
			<div className="w-full flex justify-between items-center">
                <h3>{title}</h3>
                <span>${price}</span>
            </div>
            <p className="overflow-hidden">{description}</p>
		</div>
	);
}
