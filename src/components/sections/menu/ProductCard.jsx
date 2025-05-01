import React from 'react'
import AllergenChip from './AllergenChip';

const ProductCard = ({ name, image, description, price, allergens }) => {
    const allergensCount = allergens.length;
    console.log(name, image, description, price, allergens)
    return (
        <div className='h-[300px]'>
            <div className="relative bg-white rounded-2xl shadow-lg p-4 pt-16 pb-3 w-[280px] md:w-full md:min-w[300px] mx-auto min-h-[280px] flex flex-col justify-between ">
                {/* Image */}
                <div className="absolute -top-20 left-1/2 transform w-[160px] -translate-x-1/2 mb-4">
                    <img
                        src={image}
                        alt={name}
                        className="w-50 h-40 rounded-full object-cover  shadow-md"
                    />
                </div>

                {/* Text content */}
                <div className="h-full text-left mt-4 flex flex-col gap-7 pt-5">
                    <div className='flex flex-col gap-2'>

                        <h2 className="text-xl font-semibold text-gray-800 min-h-[30px]">{name}</h2>
                        <p className="max-h-13 text-gray-800 text-sm font-light">{description}</p>
                    </div>
                    <div className='flex flex-col gap-4 '>
                        {allergensCount > 2 && (
                            <div className="flex flex-wrap justify-start gap-2 min-h-[20px]">
                                {allergens?.slice(0, 2).map((item, idx) => (
                                    <AllergenChip idx={idx} item={item} />
                                ))}
                                    <AllergenChip idx={"=1"} item={"+1"} />

                            </div>
                        )}
                        {allergensCount < 3 && (
                            <div className="flex flex-wrap justify-start gap-2 min-h-[20px]">
                                {allergens?.slice(0, 2).map((item, idx) => (
                                    <AllergenChip idx={idx} item={item} />
                                ))}
                            </div>
                        )}
                        <p className="text-lg text-[#E3870E] text-left font-bold m-0 ">${price}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductCard