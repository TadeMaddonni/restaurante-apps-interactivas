# Servicio de Categorías

Este documento describe cómo usar el servicio de categorías en la aplicación del restaurante.

## 📁 Ubicación

```
src/services/categories.js
```

## 🚀 Funcionalidades

### Servicios Públicos (Sin Autenticación)

#### `getAllCategories()`
Obtiene todas las categorías disponibles.

```javascript
import { getAllCategories } from '../services/categories'

const { success, categories, error } = await getAllCategories()
```

#### `getCategoryById(id)`
Obtiene una categoría específica por su ID.

```javascript
import { getCategoryById } from '../services/categories'

const { success, category, error } = await getCategoryById(1)
```

#### `getActiveCategories()`
Obtiene solo las categorías activas.

```javascript
import { getActiveCategories } from '../services/categories'

const { success, categories, error } = await getActiveCategories()
```

#### `getDishesByCategory(categoryId)`
Obtiene los platos filtrados por categoría.

```javascript
import { getDishesByCategory } from '../services/categories'

const { success, dishes, error } = await getDishesByCategory(1)
```

### Servicios de Administración (Con Autenticación)

#### `getAllCategoriesAdmin()`
Obtiene todas las categorías (vista de administrador).

```javascript
import { getAllCategoriesAdmin } from '../services/categories'

const { success, categories, error } = await getAllCategoriesAdmin()
```

#### `createCategory(categoryData)`
Crea una nueva categoría.

```javascript
import { createCategory, validateCategoryData } from '../services/categories'

const categoryData = {
    nombre: "Nueva Categoría",
    descripcion: "Descripción de la nueva categoría",
    selected_category: true
}

const validation = validateCategoryData(categoryData)
if (validation.isValid) {
    const result = await createCategory(categoryData)
    if (result.success) {
        console.log(result.message) // "Categoría creada exitosamente"
    }
}
```

#### `updateCategory(id, categoryData)`
Actualiza una categoría existente.

```javascript
import { updateCategory } from '../services/categories'

const result = await updateCategory(1, {
    nombre: "Categoría Actualizada",
    descripcion: "Nueva descripción"
})
```

#### `deleteCategory(id)`
Elimina una categoría.

```javascript
import { deleteCategory } from '../services/categories'

const result = await deleteCategory(1)
```

#### `toggleCategoryStatus(id, isActive)`
Activa o desactiva una categoría.

```javascript
import { toggleCategoryStatus } from '../services/categories'

const result = await toggleCategoryStatus(1, false) // Desactivar
```

#### `reorderCategories(categoryIds)`
Reordena las categorías.

```javascript
import { reorderCategories } from '../services/categories'

const result = await reorderCategories([3, 1, 2, 4])
```

### Funciones Utilitarias

#### `getLocalCategories()`
Obtiene categorías desde el archivo local (fallback).

```javascript
import { getLocalCategories } from '../services/categories'

const { success, categories } = await getLocalCategories()
```

#### `filterCategoriesByStatus(categories, isActive)`
Filtra categorías por estado.

```javascript
import { filterCategoriesByStatus } from '../services/categories'

const activeCategories = filterCategoriesByStatus(categories, true)
```

#### `searchCategories(categories, searchTerm)`
Busca categorías por nombre o descripción.

```javascript
import { searchCategories } from '../services/categories'

const filteredCategories = searchCategories(categories, "principal")
```

#### `validateCategoryData(categoryData)`
Valida los datos de una categoría.

```javascript
import { validateCategoryData } from '../services/categories'

const validation = validateCategoryData({
    nombre: "Categoría",
    descripcion: "Descripción de la categoría"
})

if (!validation.isValid) {
    console.log(validation.errors) // Array de errores
}
```

## 📋 Estructura de Datos

### Categoría
```javascript
{
    id: number,
    nombre: string,
    descripcion: string,
    selected_category: boolean
}
```

### Respuesta de API
```javascript
{
    success: boolean,
    categories?: Category[],
    category?: Category,
    dishes?: Dish[],
    message?: string,
    error?: string
}
```

## 🔧 Configuración

### Variables de Entorno
```env
VITE_API_URL=http://localhost:3001/api
```

### Endpoints de la API
- `GET /categorias` - Obtener todas las categorías
- `GET /categorias/:id` - Obtener categoría por ID
- `GET /categorias/active` - Obtener categorías activas
- `GET /categorias/:id/dishes` - Obtener platos por categoría
- `GET /admin/categorias` - Obtener todas las categorías (admin)
- `POST /admin/categorias` - Crear categoría
- `PUT /admin/categorias/:id` - Actualizar categoría
- `DELETE /admin/categorias/:id` - Eliminar categoría
- `PATCH /admin/categorias/:id/status` - Cambiar estado de categoría
- `PUT /admin/categorias/reorder` - Reordenar categorías

## 📱 Uso en Componentes

### Ejemplo: Página de Menú
```javascript
import { useState, useEffect } from 'react'
import { getAllCategories, getDishesByCategory } from '../services/categories'
import { useSearchParams } from 'react-router-dom'

const MenuPage = () => {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [products, setProducts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    // Cargar categorías
    useEffect(() => {
        const loadCategories = async () => {
            const result = await getAllCategories()
            if (result.success) {
                setCategories(result.categories)
            }
        }
        loadCategories()
    }, [])

    // Manejar cambio de categoría
    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId)
        if (categoryId === 0) {
            setSearchParams({})
        } else {
            setSearchParams({ category: categoryId.toString() })
        }
    }

    // Cargar platos por categoría
    useEffect(() => {
        const loadDishes = async () => {
            if (selectedCategory === 0) {
                // Cargar todos los platos
            } else {
                const result = await getDishesByCategory(selectedCategory)
                if (result.success) {
                    setProducts(result.dishes)
                }
            }
        }
        loadDishes()
    }, [selectedCategory])

    return (
        // JSX del componente
    )
}
```

### Ejemplo: Gestión de Categorías (Admin)
```javascript
import { useState, useEffect } from 'react'
import { 
    getAllCategoriesAdmin, 
    createCategory, 
    updateCategory, 
    deleteCategory,
    validateCategoryData 
} from '../services/categories'

const CategoriesManagement = () => {
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        selected_category: true
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const validation = validateCategoryData(formData)
        if (!validation.isValid) {
            // Mostrar errores
            return
        }

        const result = await createCategory(formData)
        if (result.success) {
            // Recargar categorías
            loadCategories()
        }
    }

    return (
        // JSX del componente
    )
}
```

## 🛡️ Manejo de Errores

El servicio incluye manejo robusto de errores:

1. **Fallback a datos locales**: Si la API falla, usa datos del archivo JSON
2. **Validación de datos**: Valida los datos antes de enviarlos
3. **Respuestas consistentes**: Todas las funciones retornan objetos con `success` y `error`
4. **Logging**: Registra errores en la consola para debugging

## 🔄 Estados de Carga

Es recomendable implementar estados de carga:

```javascript
const [loading, setLoading] = useState(true)

const loadCategories = async () => {
    try {
        setLoading(true)
        const result = await getAllCategories()
        // Procesar resultado
    } catch (error) {
        // Manejar error
    } finally {
        setLoading(false)
    }
}
```

## 📝 Notas Importantes

1. **Autenticación**: Los servicios de admin requieren un token válido en localStorage
2. **URLs**: Los endpoints usan `/categorias` (español) en lugar de `/categories`
3. **Fallback**: Siempre hay un fallback a datos locales si la API falla
4. **Validación**: Usa la función `validateCategoryData` antes de crear/actualizar
5. **URL Parameters**: El componente Menu actualiza la URL con el parámetro `category` 