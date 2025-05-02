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
            window.scrollTo(0, 0);
        }else {
            const filteredProducts = ProductData.filter(prod => prod.id_categoria === selectedCategory)
            setProducts(filteredProducts)
            window.scrollTo(0, 0);
        }
    }, [selectedCategory])

    return (
        <>
            {/* Title section with proper spacing */}
            <div className='w-full max-w-[1200px] mx-auto pt-12 px-[20px]'>
                <h2 className="text-4xl lg:text-6xl text-[#191514] font-display font-medium text-left tracking-tighter">
                    Nuestros Platos
                </h2>
            </div>

            {/* Category selector - horizontally scrollable */}
            <div className="mt-8 bg-background sticky top-[60px] z-50 shadow-sm w-full">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex overflow-x-auto pb-4 hide-scrollbar">
                        <div className="px-[20px] flex gap-3 flex-nowrap">
                            {categories.map((category) => (
                                <Category
                                    key={category.id}
                                    nombre={category.nombre}
                                    id={category.id}
                                    setCategory={setSelectedCategory}
                                    selectedCategory={selectedCategory}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu list */}
            <div className='w-full max-w-[1200px] mx-auto px-[20px] mt-4'>
                <MenuList products={products} />
            </div>
        </>
    )
}

export default MenuPage