import React from "react";

const OurEnvironment = () => {
	return (
		<section className="bg-[#EDE7D4] py-20 px-6 md:px-12 lg:px-16 text-center w-full space-y-12">
			<div className="max-w-[1200px] mx-auto text-center">
				<div className="flex flex-col gap-4">
					<h2 className="text-4xl lg:text-6xl text-[#191514] font-medium text-center  tracking-tighter font-display">
						El encanto de nuestro espacio
					</h2>
					<p className="text-sm md:text-lg text-gray-700 mb-10 max-w-3xl mx-auto ">
						Inspirado en la calidez de la cultura argentina, nuestro entorno
						fusiona la naturaleza con la elegancia. Rodeado de vegetación, luz
						tenue y detalles cuidadosamente pensados, cada rincón invita a
						disfrutar de una experiencia gastronómica auténtica, relajada y con
						distinción.
					</p>
				</div>
				<img
					src="https://www.infobae.com/resizer/v2/4ABGAOBQTRE6VL6FXOINHSRNVE.jpg?auth=59fc2be393e652d5797ea3a7ab839af303368be33c2a6fd8c9c9b226b2bb5537&smart=true&width=1024&height=512&quality=85"
					alt="Nuestro entorno"
					className="w-[90vw] h-[55vh] object-cover mx-auto rounded-4xl shadow-xl transition-transform duration-1000 ease-in-out hover:scale-105"
				/>
			</div>
		</section>
	);
};

export default OurEnvironment;
