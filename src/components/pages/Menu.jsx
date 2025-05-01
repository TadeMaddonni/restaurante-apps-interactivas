import MenuList from '../sections/menu/MenuList'
import { useState } from 'react'
import CategoryData from "../../data/category.json"
import ProductData from "../../data/products.json"
import Category from '../sections/home/Selected-category'
import { useEffect } from 'react'

const MenuPage = () => {
    const [categories, setCategories] = useState([]); // Categorías
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [products, setProducts] = useState([])
    
    // Cargar categorías al montar el componente
    useEffect(() => {
        setCategories(CategoryData); // Carga las categorías desde el archivo JSON
    }, []);

    useEffect(() => {
        if (selectedCategory === 0) {
            setProducts([...ProductData])
        }else {
            const filteredProducts = ProductData.filter(prod => prod.id_categoria === selectedCategory)
            setProducts(filteredProducts)
        }
    }, [selectedCategory])

    return (
        <div className=' min-h-screen pt-12  flex justify-center'>
            <div className='w-full max-w-[1200px] flex flex-col gap-8 md:gap-15'>
                <h2 className="text-4xl px-[20px] lg:text-6xl text-[#191514] font-display font-medium text-left tracking-tighter">
                    Nuestros Platos
                </h2>
                {/* Category selector */}
                <div className='sticky top-14 z-10 py-4  px-[20px] md:px-0 bg-background'>
                    <div className="flex overflow-x-auto md:flex-wrap gap-2 no-scrollbar">
                        {categories.map((category) => (
                            <Category
                                key={category.id}
                                nombre={category.nombre}
                                id={category.id}
                                setCategory={setSelectedCategory}
                                selectedCategory={selectedCategory} // Pasar el estado seleccionado
                            />
                        ))}
                    </div>
                </div>
                {/* Menu list */}
                <div className='pt-[40px] px-[20px] md:px-0'>
                    <MenuList products={products} />
                </div>
            </div>
        </div>
    )
}

export default MenuPage