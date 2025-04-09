export default function CategoryItem({ title, description, price, image, setProductImage, id, selectedItem, setSelectedItem }) {
    const handleClick = () => {
        setProductImage(image);
        setSelectedItem(id);
    };

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer w-full flex flex-col text-[#DCE2CB] border-b border-[#DCE2CB] py-4 last:border-none transition-all duration-300 ease-in-out"
        >
            <div className="w-full flex justify-between items-center pb-2">
                <h3
                    className={`text-2xl ${
                        selectedItem === id ? "text-[#E3870E]" : "text-[#DCE2CB]"
                    } transition-colors duration-500 ease-in-out`}
                >
                    {title}
                </h3>
                <span
                    className={`text-1xl ${
                        selectedItem === id ? "text-[#E3870E]" : "text-[#DCE2CB]"
                    } transition-colors duration-500 ease-in-out`}
                >
                    ${price}
                </span>
            </div>
            <p
                className={`font-light w-4/5 ${
                    selectedItem === id ? "normal" : "hidden"
                }`}
            >
                {description}
            </p>
        </div>
    );
}