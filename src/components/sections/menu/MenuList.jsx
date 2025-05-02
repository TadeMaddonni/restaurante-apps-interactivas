import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'

const MenuList = ({ products }) => {


    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-14 gap-y-30 md:gap-y-32 md-gap-0 pt-[80px] pb-[80px] justify-center items-center'>
            {products.map(prod => (
                <Link key={prod.id} to={`/plato/${prod.id}`} className=' w-full md:w-fit justify-self-center'>
                    <ProductCard
                        name={prod.nombre}
                        description={prod.descripcion}
                        allergens={prod.alergenos}
                        price={prod.precio}
                        image={prod.imagen}
                    />
                </Link>
            ))}
        </div>
    )
}

export default MenuList