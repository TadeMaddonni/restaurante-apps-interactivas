import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    BarChart3, 
    Users, 
    UtensilsCrossed, 
    TrendingUp,
    Plus,
    Eye,
    Settings
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import AdminLayout from '../admin/AdminLayout';
import { getAllPlates } from '../../services/plates';
import { getAllCategories } from '../../services/categories';
import { getAllUsers } from '../../services/auth';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalDishes: 0,
        totalUsers: 0,
        totalCategories: 0,
        recentActivity: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Usar Promise.all para hacer todas las peticiones en paralelo
            const [dishesResult, categoriesResult, usersResult] = await Promise.all([
                getAllPlates(),
                getAllCategories(),
                getAllUsers()
            ]);

            // Procesar resultados
            const totalDishes = dishesResult.success ? (dishesResult.dishes?.length || 0) : 0;
            const totalCategories = categoriesResult.success ? (categoriesResult.categories?.length || 0) : 0;
            const totalUsers = usersResult.success ? (usersResult.users?.length || 0) : 0;

            // Crear actividad reciente basada en los datos obtenidos
            const recentActivity = [];
            
            if (dishesResult.success && dishesResult.dishes) {
                // Ordenar platos por fecha de creación (más reciente primero) y tomar los últimos 3
                const sortedDishes = [...dishesResult.dishes].sort((a, b) => 
                    new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
                );
                const recentDishes = sortedDishes.slice(0, 3);
                recentDishes.forEach(dish => {
                    recentActivity.push({
                        description: `Plato "${dish.nombre}" disponible`,
                        timestamp: dish.createdAt || new Date().toISOString(),
                        type: 'dish'
                    });
                });
            }

            if (usersResult.success && usersResult.users) {
                // Ordenar usuarios por fecha de creación (más reciente primero) y tomar los últimos 2
                const sortedUsers = [...usersResult.users].sort((a, b) => 
                    new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
                );
                const recentUsers = sortedUsers.slice(0, 2);
                recentUsers.forEach(user => {
                    recentActivity.push({
                        description: `Usuario "${user.nombre}" registrado`,
                        timestamp: user.createdAt || new Date().toISOString(),
                        type: 'user'
                    });
                });
            }

            // Ordenar toda la actividad reciente por timestamp (más reciente primero)
            recentActivity.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            setStats({
                totalDishes,
                totalUsers,
                totalCategories,
                recentActivity: recentActivity.slice(0, 5) // Solo mostrar 5 actividades
            });

        } catch (error) {
            console.error('Error loading dashboard data:', error);
            setError('Error al cargar los datos del dashboard');
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Platos',
            value: stats.totalDishes,
            icon: UtensilsCrossed,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            link: '/admin/dashboard/dishes'
        },
        {
            title: 'Total Usuarios',
            value: stats.totalUsers,
            icon: Users,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            link: '/admin/dashboard/users'
        },
        {
            title: 'Categorías',
            value: stats.totalCategories,
            icon: BarChart3,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            link: '/admin/dashboard/categories'
        }
    ];

    const quickActions = [
        {
            title: 'Agregar Plato',
            description: 'Crear un nuevo plato para el menú',
            icon: Plus,
            link: '/admin/dashboard/dishes/new',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            title: 'Ver Platos',
            description: 'Gestionar todos los platos existentes',
            icon: Eye,
            link: '/admin/dashboard/dishes',
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            title: 'Ver Usuarios',
            description: 'Gestionar usuarios del sistema',
            icon: Users,
            link: '/admin/dashboard/users',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        },
        {
            title: 'Configuración',
            description: 'Ajustar configuraciones del sistema',
            icon: Settings,
            link: '/admin/dashboard/settings',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50'
        }
    ];

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Cargando datos del dashboard...</p>
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
                            <BarChart3 className="h-12 w-12 mx-auto" />
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

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">
                            Bienvenido al panel de administración de Argentum
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">
                            Última actualización: {new Date().toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statCards.map((stat, index) => (
                        <Card key={index} className="p-6">
                            <Link to={stat.link} className="block">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            {stat.title}
                                        </p>
                                        <p className="text-3xl font-bold text-foreground mt-2">
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </Link>
                        </Card>
                    ))}
                </div>

                {/* Acciones rápidas */}
                <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                        Acciones Rápidas
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickActions.map((action, index) => (
                            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                                <Link to={action.link} className="block">
                                    <div className={`p-3 rounded-lg ${action.bgColor} w-fit mb-3`}>
                                        <action.icon className={`h-5 w-5 ${action.color}`} />
                                    </div>
                                    <h3 className="font-semibold text-foreground mb-1">
                                        {action.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {action.description}
                                    </p>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Actividad reciente */}
                <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                        Actividad Reciente
                    </h2>
                    <Card className="p-6">
                        {stats.recentActivity && stats.recentActivity.length > 0 ? (
                            <div className="space-y-4">
                                {stats.recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50">
                                        <div className={`w-2 h-2 rounded-full ${
                                            activity.type === 'dish' ? 'bg-blue-500' : 'bg-green-500'
                                        }`}></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-foreground">
                                                {activity.description}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(activity.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">No hay actividad reciente</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard; 