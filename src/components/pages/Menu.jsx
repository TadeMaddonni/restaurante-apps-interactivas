import MenuList from '../sections/menu/MenuList'
import { useState } from 'react'
import Category from '../sections/home/Selected-category'
import { useEffect } from 'react'
import { getAllPlates } from '../../services/plates'
import { getAllCategories } from '../../services/categories'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../ui/button'

const MenuPage = () => {
    const [categories, setCategories] = useState([]); // Categorías
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [products, setProducts] = useState([]) // Inicializar como array vacío
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    // Cargar categorías dinámicamente desde la API
    useEffect(() => {
        const loadCategories = async () => {
            try {
                setLoading(true)
                const result = await getAllCategories()

                if (result.success) {
                    setCategories(result.categories)
                } else {
                    console.error('Error al cargar categorías:', result.error)
                    setCategories([])
                }
            } catch (error) {
                console.error('Error al cargar categorías:', error)
                setCategories([])
            } finally {
                setLoading(false)
            }
        }

        loadCategories()
    }, []);

    // Obtener categoría inicial desde URL
    useEffect(() => {
        const categoryParam = searchParams.get('category')
        if (categoryParam) {
            const categoryId = parseInt(categoryParam)
            // Verificar que sea un número válido
            if (!isNaN(categoryId) && categoryId >= 0) {
                setSelectedCategory(categoryId)
            } else {
                // Si no es válido, resetear a 0 y limpiar URL
                setSelectedCategory(0)
                setSearchParams({})
            }
        }
    }, [searchParams, setSearchParams])

    // Función para borrar filtros
    const handleClearFilters = () => {
        setSelectedCategory(0)
        setSearchParams({})
    }

    // Cargar platos según la categoría seleccionada
    useEffect(() => {
        const loadDishes = async () => {
            try {
                setLoading(true)

                const result = await getAllPlates(selectedCategory)

                if (result.success && Array.isArray(result.dishes)) {
                    setProducts(result.dishes)
                } else {
                    console.error('Error al cargar platos:', result.error)
                    setProducts([])
                }

                window.scrollTo(0, 0)
            } catch (error) {
                console.error('Error al cargar platos:', error)
                setProducts([])
            } finally {
                setLoading(false)
            }
        }

        loadDishes()
    }, [selectedCategory])

    // Función para manejar el cambio de categoría y actualizar URL
    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId)

        if (categoryId === 0) {
            // Remover parámetro de categoría si es "Todos"
            setSearchParams({})
        } else {
            // Actualizar URL con el ID de la categoría
            setSearchParams({ category: categoryId.toString() })
        }
    }

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
                            {loading && categories.length === 0 ? (
                                // Loading skeleton para categorías
                                Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="animate-pulse">
                                        <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    {categories.map((category) => (
                                        <Category
                                            key={category.id}
                                            nombre={category.nombre}
                                            id={category.id}
                                            setCategory={handleCategoryChange}
                                            selectedCategory={selectedCategory}
                                        />
                                    ))}
                                    {searchParams.get('category') && (
                                        <div>
                                            <Button
                                                className="border cursor-pointer underline hover:border-none ring-0 rounded-3xl px-4 text-black bg-transparent hover:bg-transparent hover:border-black bordernone"
                                                size="lg"
                                                onClick={handleClearFilters}>
                                                Borrar Filtros
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu list */}
            <div className='w-full max-w-[1200px] mx-auto px-[20px] mt-4'>
                {loading ? (
                    // Loading skeleton para productos
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <MenuList products={products} />
                )}
            </div>
        </>
    )
}

export default MenuPage