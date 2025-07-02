import { useState, useEffect } from 'react'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Textarea } from '../../ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'
import AdminLayout from '../../admin/AdminLayout'
import { 
    getAllCategoriesAdmin, 
    createCategory, 
    updateCategory, 
    deleteCategory, 
    toggleCategoryStatus,
    validateCategoryData 
} from '../../../services/categories'
import { LoaderCircle, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

const CategoriesManagement = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [editingCategory, setEditingCategory] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        selected_category: true
    })
    const [errors, setErrors] = useState({})

    // Cargar categorías al montar el componente
    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = async () => {
        try {
            setLoading(true)
            setError(null)
            const result = await getAllCategoriesAdmin()
            
            if (result.success) {
                setCategories(result.categories || [])
            } else {
                setError('Error al cargar las categorías')
            }
        } catch (error) {
            console.error('Error al cargar categorías:', error)
            setError('Error de conexión al cargar las categorías')
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        
        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validar datos
        const validation = validateCategoryData(formData)
        if (!validation.isValid) {
            const errorObj = {}
            validation.errors.forEach(error => {
                if (error.includes('nombre')) errorObj.nombre = error
                if (error.includes('descripción')) errorObj.descripcion = error
            })
            setErrors(errorObj)
            return
        }

        try {
            let result
            if (editingCategory) {
                result = await updateCategory(editingCategory.id, formData)
            } else {
                result = await createCategory(formData)
            }

            if (result.success) {
                setShowForm(false)
                setEditingCategory(null)
                setFormData({ nombre: '', descripcion: '', selected_category: true })
                setErrors({})
                loadCategories() // Recargar categorías
            } else {
                console.error('Error:', result.error)
            }
        } catch (error) {
            console.error('Error al guardar categoría:', error)
        }
    }

    const handleEdit = (category) => {
        setEditingCategory(category)
        setFormData({
            nombre: category.nombre,
            descripcion: category.descripcion,
            selected_category: category.selected_category
        })
        setShowForm(true)
        setErrors({})
    }

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
            return
        }

        try {
            const result = await deleteCategory(id)
            if (result.success) {
                loadCategories() // Recargar categorías
            } else {
                console.error('Error al eliminar categoría:', result.error)
            }
        } catch (error) {
            console.error('Error al eliminar categoría:', error)
        }
    }

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const result = await toggleCategoryStatus(id, !currentStatus)
            if (result.success) {
                loadCategories() // Recargar categorías
            } else {
                console.error('Error al cambiar estado:', result.error)
            }
        } catch (error) {
            console.error('Error al cambiar estado:', error)
        }
    }

    const handleCancel = () => {
        setShowForm(false)
        setEditingCategory(null)
        setFormData({ nombre: '', descripcion: '', selected_category: true })
        setErrors({})
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Gestión de Categorías</h1>
                    <Button 
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Nueva Categoría
                    </Button>
                </div>

                {/* Formulario */}
                {showForm && (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
                            </CardTitle>
                            <CardDescription>
                                {editingCategory ? 'Modifica los datos de la categoría' : 'Crea una nueva categoría para el menú'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="nombre">Nombre</Label>
                                    <Input
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Platos Principales"
                                        className={errors.nombre ? 'border-red-500' : ''}
                                    />
                                    {errors.nombre && (
                                        <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="descripcion">Descripción</Label>
                                    <Textarea
                                        id="descripcion"
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleInputChange}
                                        placeholder="Describe brevemente esta categoría"
                                        className={errors.descripcion ? 'border-red-500' : ''}
                                    />
                                    {errors.descripcion && (
                                        <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="selected_category"
                                        name="selected_category"
                                        checked={formData.selected_category}
                                        onChange={handleInputChange}
                                        className="rounded"
                                    />
                                    <Label htmlFor="selected_category">Categoría activa</Label>
                                </div>

                                <div className="flex gap-2">
                                    <Button type="submit">
                                        {editingCategory ? 'Actualizar' : 'Crear'}
                                    </Button>
                                    <Button type="button" variant="outline" onClick={handleCancel}>
                                        Cancelar
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Lista de categorías */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <LoaderCircle className="animate-spin" size={32} />
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="text-center">
                                <div className="text-red-600 mb-4">
                                    <LoaderCircle className="h-12 w-12 mx-auto" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Error</h3>
                                <p className="text-muted-foreground mb-4">{error}</p>
                                <Button onClick={loadCategories} variant="outline">
                                    Reintentar
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {categories.map((category) => (
                                <Card key={category.id}>
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">{category.nombre}</h3>
                                                <p className="text-gray-600 text-sm">{category.descripcion}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        category.selected_category 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {category.selected_category ? 'Activa' : 'Inactiva'}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleToggleStatus(category.id, category.selected_category)}
                                                    title={category.selected_category ? 'Desactivar' : 'Activar'}
                                                >
                                                    {category.selected_category ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </Button>
                                                
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(category)}
                                                    title="Editar"
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                                
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(category.id)}
                                                    title="Eliminar"
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}

export default CategoriesManagement 