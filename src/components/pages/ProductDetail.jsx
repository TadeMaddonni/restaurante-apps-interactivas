import { Link, useParams } from "react-router-dom";
import React from "react";
import ProductData from "../../data/products.json"; // Importa los datos de los platos

export default function ProductDetail() {
    const { id } = useParams(); // Obtiene el ID del plato desde la URL
    const plato = ProductData.find((dish) => dish.id === parseInt(id)); // Busca el plato por ID

    if (!plato) {
        return <p>Plato no encontrado</p>;
    }

    return (
        <section className="bg-background py-20 px-6 md:px-12 lg:px-16 text-center w-full space-y-12 max-w-[1200px]">
            <h2 className="text-4xl lg:text-6xl text-[#191514] font-display font-medium text-center tracking-tighter">{plato.nombre}</h2>
            <div className="flex flex-col md:flex-row items-start justify-center gap-10 md:gap-16 ">
                {/* Izquierda */}
                <div className="hidden md:block space-y-8 md:space-y-[96px] text-left w-[300px] ">
                    <div className="w-full  pb-2 flex flex-col gap-2 md:gap-2  ">
                        <h3 className=" text-[20px] md:text-[24px] font-display leading-tighter font-semibold text-[#4B5728] flex items-center justify-between ">Descripción</h3>
                        <p className="pt-2 w-[200px]">{plato.descripcion}</p>
                    </div>
                    <div className="w-full  pb-2 flex flex-col gap-2 md:gap-2 ">
                        <h3 className=" text-[20px] md:text-[24px] font-display leading-tighter font-semibold text-[#4B5728] flex items-center justify-between ">Alérgenos</h3>
                        <ul className="space-y-1 py-2">
                            {plato.alergenos.length > 0 ? (
                                plato.alergenos.map((alergenos, index) => (
                                    <li
                                        key={index}
                                        className="list-none "
                                    >
                                        {alergenos}
                                    </li>
                                ))
                            ) : (
                                <li className="list-none">No contiene</li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="w-[320px] h-[450px] md:w-[520px] md:h-[580px]  rounded-[350px] overflow-hidden shadow-lg shadow-stone-400/80 relative">
                    <img
                        className="w-full h-full object-cover transition-all ease-in-out duration-300 hover:scale-105" src={plato.imagen} alt={plato.nombre} />
                </div>
                {/* Derecha */}
                <div className="hidden md:block space-y-8 md:space-y-[96px] text-left w-[300px] pl-4">
                    <div className="w-full  pb-2 flex flex-col gap-2 md:gap-2 min-h-[132px]">
                        <h3 className=" text-[20px] md:text-[24px] font-display leading-tighter font-semibold text-[#4B5728] flex items-center justify-between ">Precio</h3>
                        <p className="pt-2">${plato.precio}</p>
                    </div>
                    <div className="w-full  pb-2 flex flex-col gap-2 md:gap-2 ">
                        <h3 className=" text-[20px] md:text-[24px] font-display leading-tighter font-semibold text-[#4B5728] flex items-center justify-between ">Ingredientes</h3>
                        <ul className="space-y-1 py-2">
                            {plato.ingredientes.map((ingrediente, index) => (
                                <li
                                    key={index}
                                    className="list-none text-"
                                >
                                    {ingrediente}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Mobile */}
                <div className="flex flex-col gap-4  md:hidden space-y-2 md:space-y-[96px] text-left md:w-[300px] pt-10">
                    <div className="  pb-2 flex flex-col gap-2 md:gap-2  ">
                        <h3 className=" border-b border-[#191514] pb-2 text-[20px] md:text-[24px] font-display leading-tighter font-semibold text-[#4B5728] flex items-center justify-between ">Descripción</h3>
                        <p className="pt-2">{plato.descripcion}</p>
                    </div>
                    <div className="w-full  pb-2 flex flex-col gap-2 md:gap-2 ">
                        <h3 className=" border-b border-[#191514] pb-2 text-[20px] md:text-[24px] font-display leading-tighter font-semibold text-[#4B5728] flex items-center justify-between ">Precio</h3>
                        <p className="pt-2">${plato.precio}</p>
                    </div>
                    <div className="w-full  pb-2 flex flex-col gap-2 md:gap-2 ">
                        <h3 className=" border-b border-[#191514] pb-2 text-[20px] md:text-[24px] font-display leading-tighter font-semibold text-[#4B5728] flex items-center justify-between ">Ingredientes</h3>
                        <ul className="space-y-1 py-2">
                            {plato.ingredientes.map((ingrediente, index) => (
                                <li
                                    key={index}
                                    className="list-none text-"
                                >
                                    {ingrediente}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full  pb-2 flex flex-col gap-2 md:gap-2 ">
                        <h3 className=" border-b border-[#191514] pb-2 text-[20px] md:text-[24px] font-display leading-tighter font-semibold text-[#4B5728] flex items-center justify-between ">Alérgenos</h3>
                        <ul className="space-y-1 py-2">
                            {plato.alergenos.length > 0 ? (
                                plato.alergenos.map((alergenos, index) => (
                                    <li
                                        key={index}
                                        className="list-none "
                                    >
                                        {alergenos}
                                    </li>
                                ))
                            ) : (
                                <li className="list-none">No contiene</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div >
            <div className="w-full flex justify-center py-10">
                <Link className=" cursor-pointer flex flex-col bg-[#E3870E] text-[#FEFDF8] py-4 px-8 text-2xl font-medium rounded-4xl">Volver al menú </Link>
            </div>
        </section>
    );
}