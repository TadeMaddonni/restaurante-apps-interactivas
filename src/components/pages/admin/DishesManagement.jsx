import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Plus, 
    Edit, 
    Trash2, 
    Search, 
    Filter,
    Eye,
    EyeOff,
    X
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Card } from '../../ui/card';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectOption } from '../../ui/select';
import AdminLayout from '../../admin/AdminLayout';
import { getAllPlates } from '../../../services/plates';
import { getAllCategories } from '../../../services/categories';
import { createDish, updateDish, deleteDish } from '../../../services/admin';
import { getCurrentUser } from '../../../lib/auth';

const DishesManagement = () => {
    const [dishes, setDishes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingDish, setEditingDish] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        ingredientes: '',
        alergenos: '',
        precio: '',
        categoria: '',
        imagen: ''
    });

    const allergenOptions = [
        'Lácteos',
        'Gluten',
        'Huevo',
        'Pescado',
        'Mariscos',
        'Frutos secos',
        'Soja',
        'Sulfitos'
    ];

    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Cargar platos y categorías en paralelo
            const [dishesResult, categoriesResult] = await Promise.all([
                getAllPlates(),
                getAllCategories()
            ]);
            if (dishesResult.success) {
                setDishes(dishesResult.dishes || []);
            } else {
                setError('Error al cargar los platos');
            }

            if (categoriesResult.success) {
                setCategories(categoriesResult.categories || []);
            } else {
                setError('Error al cargar las categorías');
            }
        } catch (error) {
            console.error('Error loading data:', error);
            setError('Error de conexión al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const dishData = {
            ...formData,
            ingredientes: formData.ingredientes.split(',').map(item => item.trim()),
            alergenos: formData.alergenos.split(',').map(item => item.trim()).filter(item => item),
            precio: parseFloat(formData.precio),
            categoriaId: categories.find(cat => cat.nombre === formData.categoria)?.id || null,
            image_path: formData.imagen || null, 
            userId: getCurrentUser()?.id || null
        };

        try {
            let result;
            if (editingDish) {
                result = await updateDish(editingDish.id, dishData);
            } else {
                result = await createDish(dishData);
            }

            if (result.success) {
                setShowForm(false);
                setEditingDish(null);
                resetForm();
                loadAllData();
            }
        } catch (error) {
            console.error('Error saving dish:', error);
        }
    };

    const handleEdit = (dish) => {
        setEditingDish(dish);
        setFormData({
            nombre: dish.nombre,
            descripcion: dish.descripcion,
            ingredientes: dish.ingredientes.join(', '),
            alergenos: dish.alergenos.join(', '),
            precio: dish.precio.toString(),
            categoria: dish.categoria || categories.find(cat => cat.id === dish.categoriaId)?.nombre || '',
            imagen: dish.imagen || dish.image_path || ''
        });
        setShowForm(true);
    };

    const handleDelete = async (dishId) => {
        if (window.confirm('¿Está seguro de que desea eliminar este plato?')) {
            try {
                const result = await deleteDish(dishId);
                            if (result.success) {
                loadAllData();
            }
            } catch (error) {
                console.error('Error deleting dish:', error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            descripcion: '',
            ingredientes: '',
            alergenos: '',
            precio: '',
            categoria: '',
            imagen: ''
        });
    };

    const filteredDishes = dishes.filter(dish => {
        const matchesSearch = dish.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            dish.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || 
                               dish.categoria === selectedCategory || 
                               (categories.find(cat => cat.id === dish.categoriaId)?.nombre === selectedCategory);
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Cargando platos...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="text-red-600 mb-4">
                            <UtensilsCrossed className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Error</h3>
                        <p className="text-muted-foreground mb-4">{error}</p>
                        <Button onClick={loadAllData} variant="outline">
                            Reintentar
                        </Button>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    const handleSidebarAction = (action) => {
        if (action === 'add-dish') {
            setShowForm(true);
        }
    };

    return (
        <AdminLayout onSidebarAction={handleSidebarAction}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Gestión de Platos</h1>
                        <p className="text-muted-foreground mt-1">
                            Administre los platos del menú del restaurante
                        </p>
                    </div>
                    <Button variant="adminOrange" onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Plato
                    </Button>
                </div>

                {/* Filtros */}
                <Card className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Label htmlFor="search">Buscar</Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="search"
                                    placeholder="Buscar por nombre o descripción..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="md:w-48">
                            <Label htmlFor="category">Categoría</Label>
                            <Select
                                id="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <SelectOption value="">Todas las categorías</SelectOption>
                                {categories.map(category => (
                                    <SelectOption key={category.id || category} value={category.nombre || category}>
                                        {category.nombre || category}
                                    </SelectOption>
                                ))}
                            </Select>
                        </div>
                    </div>
                </Card>

                {/* Lista de platos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDishes.map((dish) => (
                        <Card key={dish.id} className="p-4">
                            <div className="space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-foreground">{dish.nombre}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {dish.categoria || (categories.find(cat => cat.id === dish.categoriaId)?.nombre || 'Sin categoría')}
                                        </p>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="adminGhost"
                                            size="sm"
                                            onClick={() => handleEdit(dish)}
                                        >
                                            <Edit className="h-4 w-4 text-amber-50" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(dish.id)}
                                            className="text-white"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                
                                <p className="text-sm text-foreground line-clamp-2">
                                    {dish.descripcion}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-brand-orange">
                                        ${dish.precio.toLocaleString()}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {dish.ingredientes.length} ingredientes
                                    </span>
                                </div>

                                {dish.alergenos.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                        {dish.alergenos.map((alergeno, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-[#E3870E] text-white text-xs rounded-full"
                                            >
                                                {alergeno}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredDishes.length === 0 && (
                    <Card className="p-8 text-center">
                        <p className="text-muted-foreground">
                            No se encontraron platos que coincidan con los filtros
                        </p>
                    </Card>
                )}

                {/* Modal de formulario */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold">
                                        {editingDish ? 'Editar Plato' : 'Agregar Plato'}
                                    </h2>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditingDish(null);
                                            resetForm();
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="nombre">Nombre</Label>
                                            <Input
                                                id="nombre"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="categoria">Categoría</Label>
                                            <Select
                                                id="categoria"
                                                name="categoria"
                                                value={formData.categoria}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <SelectOption value="">Seleccionar categoría</SelectOption>
                                                {categories.map(category => (
                                                    <SelectOption key={category.id || category} value={category.nombre || category}>
                                                        {category.nombre || category}
                                                    </SelectOption>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="descripcion">Descripción</Label>
                                        <Textarea
                                            id="descripcion"
                                            name="descripcion"
                                            value={formData.descripcion}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="ingredientes">Ingredientes (separados por comas)</Label>
                                        <Input
                                            id="ingredientes"
                                            name="ingredientes"
                                            value={formData.ingredientes}
                                            onChange={handleInputChange}
                                            placeholder="Harina, huevo, leche..."
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="alergenos">Alérgenos (separados por comas)</Label>
                                        <Input
                                            id="alergenos"
                                            name="alergenos"
                                            value={formData.alergenos}
                                            onChange={handleInputChange}
                                            placeholder="Gluten, lácteos..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="precio">Precio</Label>
                                            <Input
                                                id="precio"
                                                name="precio"
                                                type="number"
                                                value={formData.precio}
                                                min={0}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="imagen">URL de imagen (opcional)</Label>
                                            <Input
                                                id="imagen"
                                                name="imagen"
                                                value={formData.imagen}
                                                onChange={handleInputChange}
                                                placeholder="https://ejemplo.com/imagen.jpg"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-4">
                                        <Button type="submit" variant="adminOrange" className="flex-1">
                                            {editingDish ? 'Actualizar Plato' : 'Crear Plato'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="adminGhost"
                                            onClick={() => {
                                                setShowForm(false);
                                                setEditingDish(null);
                                                resetForm();
                                            }}
                                            className={"text-white"}
                                        >
                                            Cancelar
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default DishesManagement; 