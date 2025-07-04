import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'

const MenuList = ({ products }) => {

    // Asegurar que products sea un array
    const productsArray = Array.isArray(products) ? products : [];

    if (productsArray.length === 0) {
        return (
            <div className='flex justify-center items-center pt-[80px] pb-[80px]'>
                <div className='text-center'>
                    <p className='text-gray-500 text-lg'>No se encontraron platos</p>
                    <p className='text-gray-400 text-sm'>Intenta con otra categoría</p>
                </div>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-14 gap-y-30 md:gap-y-32 md-gap-0 pt-[80px] pb-[80px] justify-center items-center'>
            {productsArray.map(prod => (
                <Link key={prod.id} to={`/plato/${prod.id}`} className=' w-full md:w-fit justify-self-center'>
                    <ProductCard
                        name={prod.nombre}
                        description={prod.descripcion}
                        allergens={prod.alergenos}
                        price={prod.precio}
                        image={prod.image_path || prod.imagen}
                    />
                </Link>
            ))}
        </div>
    )
}

export default MenuList