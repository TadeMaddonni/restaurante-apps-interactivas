import { Link } from "react-router-dom";

export default function Item({ title, description, image, setImage, id }) {
	const handleClick = () => {
		setImage(image);
	};
	return (
		<div
			className="w-full  pb-2 flex flex-col gap-2 md:gap-4 cursor-pointer"
			onClick={handleClick}
			onKeyUp={(e) => e.key === "Enter" && handleClick()}
		>
			<h3 className=" text-[20px] md:text-[24px] font-display leading-tighter font-semibold text-[#191514] flex items-center justify-between border-b border-[#191514] pb-2">
				{title}
				<Link to={`/plato/${id}`}>
					<div className="rotate-[45deg] w-fit h-fit hover:rotate-[90deg] transition-all duration-300 ease-in-out">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 24 24"
						>
							<title>Arrow pointing upwards</title>
							<path
								fill="none"
								stroke="#E0890C"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M12 21V3m0 0l8.5 8.5M12 3l-8.5 8.5"
							/>
						</svg>
					</div>
				</Link>
			</h3>
			<p className="text-[#191514] text-sm md:text-[16px]`x">{description}</p>
		</div>
	);
}
