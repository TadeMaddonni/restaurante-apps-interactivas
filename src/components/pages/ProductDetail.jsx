import { Link, useParams } from "react-router-dom";
import { Info, CircleCheck, LoaderCircle } from 'lucide-react';
import React, { useState, useEffect } from "react";
import { getPlateById } from "../../services/plates";

export default function ProductDetail() {
    const { id } = useParams(); // Obtiene el ID del plato desde la URL
    const [plato, setPlato] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar datos del plato dinámicamente
    useEffect(() => {
        const loadPlate = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const result = await getPlateById(id);
                
                if (result.success) {
                    setPlato(result.dish);
                } else {
                    setError(result.error?.message || 'Error al cargar el plato');
                }
            } catch (error) {
                console.error('Error al cargar el plato:', error);
                setError('Error al cargar el plato');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadPlate();
        }
    }, [id]);

    // Estado de carga
    if (loading) {
        return (
            <section className="bg-background py-20 px-6 md:px-12 lg:px-16 text-center w-full space-y-12 max-w-[1200px]">
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <LoaderCircle className="animate-spin text-[#E3870E]" size={48} />
                    <p className="mt-4 text-gray-600">Cargando plato...</p>
                </div>
            </section>
        );
    }

    // Estado de error
    if (error) {
        return (
            <section className="bg-background py-20 px-6 md:px-12 lg:px-16 text-center w-full space-y-12 max-w-[1200px]">
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <h2 className="text-2xl text-red-600 mb-4">Error</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link to="/platos" className="cursor-pointer flex flex-col bg-[#E3870E] text-[#FEFDF8] py-4 px-8 text-xl font-medium rounded-4xl">
                        Volver al menú
                    </Link>
                </div>
            </section>
        );
    }

    // Plato no encontrado
    if (!plato) {
        return (
            <section className="bg-background py-20 px-6 md:px-12 lg:px-16 text-center w-full space-y-12 max-w-[1200px]">
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <h2 className="text-2xl text-gray-600 mb-4">Plato no encontrado</h2>
                    <p className="text-gray-500 mb-6">El plato que buscas no existe o ha sido eliminado.</p>
                    <Link to="/platos" className="cursor-pointer flex flex-col bg-[#E3870E] text-[#FEFDF8] py-4 px-8 text-xl font-medium rounded-4xl">
                        Volver al menú
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-background py-20 px-6 md:px-12 lg:px-16 text-center w-full space-y-12 max-w-[1200px]">
            <h2 className="text-4xl lg:text-6xl text-[#191514] font-display font-medium text-center tracking-tighter">{plato.nombre}</h2>
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-16 ">
                {/* Izquierda */}
                <div className="hidden md:block space-y-8 md:space-y-[96px] text-left w-[300px] ">
                    <div className="w-full  pb-2 flex flex-col gap-2 md:gap-2 min-h-[132px] ">
                        <h3 className=" text-[20px] md:text-[24px]  font-display leading-tighter font-semibold text-[#4B5728] flex items-center justify-between ">Descripción</h3>
                        <p className="pt-2 w-[200px]">{plato.descripcion}</p>
                    </div>
                    <div className="w-full  pb-2 flex flex-col gap-2 md:gap-2 ">
                        <h3 className=" text-[20px] md:text-[24px] font-display leading-tighter font-semibold text-[#4B5728] flex items-center justify-between ">Alérgenos</h3>
                        <ul className="space-y-2 py-2">
                            {plato.alergenos && plato.alergenos.length > 0 ? (
                                plato.alergenos.map((alergenos, index) => (
                                    <li
                                        key={index}
                                        className="list-none flex items-center justify-start gap-2"
                                    >
                                        <Info className="h-5 w-5 text-[#E3870E]" />
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
                        loading="lazy"
                        className="w-full h-full object-cover transition-all ease-in-out duration-300 hover:scale-105" 
                        src={plato.imagen || plato.image_path} 
                        alt={plato.nombre} 
                    />
                </div>
                {/* Derecha */}
                <div className="hidden md:block space-y-8 md:space-y-[96px] text-left w-[300px] pl-4">
                    <div className="w-full  pb-2 flex flex-col gap-2 md:gap-2 min-h-[132px]">
                        <h3 className=" text-[20px] md:text-[24px] font-display leading-tighter font-semibold text-[#4B5728] flex items-center justify-between ">Precio</h3>
                        <p className="pt-2"><span className="text-[#E3870E]">$</span> {plato.precio}</p>
                    </div>
                    <div className="w-full  pb-2 flex flex-col gap-2 md:gap-2 ">
                        <h3 className=" text-[20px] md:text-[24px] font-display leading-tighter font-semibold text-[#4B5728] flex items-center justify-between ">Ingredientes</h3>
                        <ul className="space-y-1 py-2">
                            {plato.ingredientes && plato.ingredientes.map((ingrediente, index) => (
                                <li
                                    key={index}
                                    className="list-none flex items-center gap-2"
                                >
                                    <CircleCheck className="h-5 w-5 text-[#E3870E]"/>
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
                            {plato.ingredientes && plato.ingredientes.map((ingrediente, index) => (
                                <li
                                    key={index}
                                    className="list-none flex gap-2 items-center"
                                >   
                                    <CircleCheck className="h-5 w-5 text-[#E3870E]" />
                                    {ingrediente}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full  pb-2 flex flex-col gap-2 md:gap-2 ">
                        <h3 className=" border-b border-[#191514] pb-2 text-[20px] md:text-[24px] font-display leading-tighter font-semibold text-[#4B5728] flex items-center justify-between ">Alérgenos</h3>
                        <ul className="space-y-1 py-2">
                            {plato.alergenos && plato.alergenos.length > 0 ? (
                                plato.alergenos.map((alergenos, index) => (
                                    <li
                                        key={index}
                                        className="list-none flex gap-2 items-center"
                                    >
                                        <Info className="h-5 w-5 text-[#E3870E]" />
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
                <Link to="/platos" className=" cursor-pointer flex flex-col bg-[#E3870E] text-[#FEFDF8] py-4 px-8 text-2xl font-medium rounded-4xl">Volver al menú </Link>
            </div>
        </section>
    );
}