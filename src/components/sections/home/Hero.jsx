import { FaStar } from "react-icons/fa";

const Hero = () => {
	return (
		<section className="w-full flex items-center justify-between py-12  bg-[#f7f5f0]">
			<div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-18 lg:px-0 lg:gap-8">
				<h1 className="text-4xl md:text-6xl lg:text-[150px] text-[#191514] lg:leading-[120px] font-display font-medium text-center mb-12 tracking-tighter ">
					Famous <br /> beef dishes 
				</h1>

				<div className="flex flex-col lg:flex-row items-center justify-between lg:gap-7">
					{/* Left - Beef Dish Image */}
					<div>
						{/*             
            <img 
                src={heroBeefDish} 
                alt="Delicious beef kebabs" 
                className="w-full h-auto object-cover"
                /> 
            */}
					</div>

					{/* Center - Green Circle */}
					<div className="relative cursor-pointer hover:scale-105 transform transition-transform duration-300">
						<div className="bg-[#1a472a] text-white rounded-full w-32 h-32 flex flex-col items-center justify-center">
							<span className="text-md font-display font-medium">Explore</span>
							<span className="text-md font-display font-medium">menu</span>
						</div>
					</div>

					{/* Right - Chef and Rating */}
					<div>
						{/*     
                <img 
                    src={chefImage} 
                    alt="Chef presenting dish" 
                    className="w-full h-auto object-cover mb-6"
                /> 
            */}

						{/* Rating Section */}
						<div className="flex items-center gap-6 mt-4">
							{/* Customer Avatars */}
							<div className="flex">
								{/*                
                    <img src={userAvatar1} alt="Customer" className="w-8 h-8 rounded-full border-2 border-white" />
                    <img src={userAvatar2} alt="Customer" className="w-8 h-8 rounded-full border-2 border-white -ml-2" />
                    <img src={userAvatar3} alt="Customer" className="w-8 h-8 rounded-full border-2 border-white -ml-2" /> 
                */}
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center justify-center gap-7">
					<p className="text-left mt-8 max-w-3xl mx-auto text-[#191514]">
						From mouthwatering chuck steaks to richest smoked prime ribs, we've
						got the meats. Enjoy our juicy beef and flavor through the purity of
						smoke and taste at home.
					</p>
					<div className="w-full max-w-[800px] h-[0.5px] bg-[#191514]" />
					<div className="flex justify-between items-center w-full max-w-[800px]">

						{/* Customers */}
						<div className="flex gap-4  justify-center items-center w-[175px]">
							<div className="relative w-12 h-10">
								<div className="absolute left-0 w-7 h-7 rounded-full bg-[#1a472a] flex items-center justify-center">
									{" "}
								</div>
								<div className="absolute left-3 w-7 h-7 rounded-full bg-[#aaaaaa] flex items-center justify-center">
									{" "}
								</div>
								<div className="absolute left-6 w-7 h-7 rounded-full bg-[#E0890C] flex items-center justify-center">
									{" "}
								</div>
							</div>
							<p className="text-sm ">
								{" "}
								Satisfied <br />
								<span className="text-sm font-normal">
									Customer reviews
								</span>{" "}
							</p>
						</div>

						{/* Reviews */}
						<div className="flex flex-1 flex-col items-center justify-center gap-2  ">
							<span className="text-4xl font-display">4.9</span>
							<div className="flex ml-2">
								{[1, 2, 3, 4, 5].map((star) => (
									<FaStar
										key={star}
										className={`${star <= 4 ? "text-yellow-400" : "text-yellow-200"}`}
									/>
								))}
							</div>
						</div>

						{/* Dishes */}
						<div className="flex gap-4 items-center w-[175px]">
							<div className="relative w-12 h-10">
								<div className="absolute left-0 w-7 h-7 rounded-full bg-[#1a472a] flex items-center justify-center">
									{" "}
								</div>
								<div className="absolute left-3 w-7 h-7 rounded-full bg-[#aaaaaa] flex items-center justify-center">
									{" "}
								</div>
								<div className="absolute left-6 w-7 h-7 rounded-full bg-[#E0890C] flex items-center justify-center">
									{" "}
								</div>
							</div>
							<p className="text-sm ">
								{" "}
								20+  <br />
								<span className="text-sm font-normal">  famous dishes</span>{" "}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
