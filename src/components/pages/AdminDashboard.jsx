import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    BarChart3, 
    Users, 
    UtensilsCrossed, 
    TrendingUp,
    Plus,
    Eye,
    Settings,
    Edit,
    Trash2,
    RotateCcw,
    Activity
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import AdminLayout from '../admin/AdminLayout';
import { getAllPlates } from '../../services/plates';
import { getAllCategories } from '../../services/categories';
import { getAllUsers } from '../../services/auth';
import { getRecentLogs, formatLogAction, getActionColor } from '../../services/logs';
import { getCurrentUser, isOwner, isAdmin, canAccessUserManagement, ROLES } from '../../lib/auth';

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
            const [dishesResult, categoriesResult, usersResult, logsResult] = await Promise.all([
                getAllPlates(),
                getAllCategories(),
                getAllUsers(),
                getRecentLogs() // Cargar logs reales del backend
            ]);

            // Procesar resultados
            const totalDishes = dishesResult.success ? (dishesResult.dishes?.length || 0) : 0;
            const totalCategories = categoriesResult.success ? (categoriesResult.categories?.length || 0) : 0;
            const totalUsers = usersResult.success ? (usersResult.users?.length || 0) : 0;

            // Usar logs reales del backend para la actividad reciente
            let recentActivity = [];
            if (logsResult.success && logsResult.logs) {
                // Tomar los primeros 5 logs más recientes
                recentActivity = logsResult.logs.slice(0, 5).map(log => ({
                    id: log.id,
                    description: log.descripcion || formatLogAction(log),
                    timestamp: log.createdAt,
                    type: log.tabla?.toLowerCase() || 'activity',
                    action: log.accion,
                    usuario: log.usuario?.nombre || 'Usuario desconocido',
                    tabla: log.tabla
                }));
            }

            setStats({
                totalDishes,
                totalUsers,
                totalCategories,
                recentActivity
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
        // Solo mostrar estadísticas de usuarios a quienes tienen permisos
        ...(canAccessUserManagement() ? [{
            title: 'Total Usuarios',
            value: stats.totalUsers,
            icon: Users,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            link: '/admin/dashboard/users'
        }] : []),
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
        // {
        //     title: 'Agregar Plato',
        //     description: 'Crear un nuevo plato para el menú',
        //     icon: Plus,
        //     link: '/admin/dashboard/dishes/',
        //     color: 'text-blue-600',
        //     bgColor: 'bg-blue-50'
        // },
        {
            title: 'Ver Platos',
            description: 'Gestionar todos los platos existentes',
            icon: Eye,
            link: '/admin/dashboard/dishes',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        ...(isOwner() || isAdmin() ? [{
            title: 'Ver Usuarios',
            description: 'Gestionar usuarios del sistema',
            icon: Users,
            link: '/admin/dashboard/users',
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        }, {
            title: 'Ver Logs',
            description: 'Ver todos los logs del sistema',
            icon: Activity,
            link: '/admin/dashboard/logs',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50'
        }, {
            title: 'Ver Categorias',
            description: 'Ver todas las categorias del sistema',
            icon: BarChart3,
            link: '/admin/dashboard/categories',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        }] : [])
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
                        <Button onClick={loadAllData} variant="adminGhost">
                            Reintentar
                        </Button>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout onSidebarAction={() => {}}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">
                            Bienvenido al panel de administración de Argentum
                        </p>
                        {/* Información del rol del usuario */}
                        <div className="mt-2 flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">
                                Rol actual:
                            </span>
                            <span className={`text-sm px-2 py-1 rounded-full ${
                                isOwner() ? 'bg-purple-100 text-purple-800' :
                                isAdmin() ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                            }`}>
                                {isOwner() ? 'Propietario' : isAdmin() ? 'Administrador' : 'Usuario'}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-brand-orange" />
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {quickActions.map((action, index) => (
                            <Card key={index} className="p-4 hover:shadow-md transition-all duration-200">
                                <Link to={action.link} className="block">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${action.bgColor} mb-3`}>
                                        <action.icon className={`h-5 w-5 ${action.color}`} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-foreground text-center">
                                            {action.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground text-center">
                                            {action.description}
                                        </p>
                                    </div>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Actividad reciente - Solo para admins y propietarios */}
                {(isOwner() || isAdmin()) && (
                    <div>
                        <h2 className="text-xl font-semibold text-foreground mb-4">
                            Actividad Reciente
                        </h2>
                        <Card className="p-6">
                            {stats.recentActivity && stats.recentActivity.length > 0 ? (
                                <div className="space-y-4">
                                    {stats.recentActivity.map((activity) => {
                                        // Función para obtener el ícono según la acción
                                        const getActionIcon = (action) => {
                                            switch (action) {
                                                case 'CREAR':
                                                    return <Plus className="h-4 w-4" />;
                                                case 'ACTUALIZAR':
                                                    return <Edit className="h-4 w-4" />;
                                                case 'ELIMINAR':
                                                    return <Trash2 className="h-4 w-4" />;
                                                case 'RESTAURAR':
                                                    return <RotateCcw className="h-4 w-4" />;
                                                default:
                                                    return <Activity className="h-4 w-4" />;
                                            }
                                        };

                                        // Función para obtener el color del borde según la tabla
                                        const getTableColor = (tabla) => {
                                            switch (tabla) {
                                                case 'USERS':
                                                    return 'border-l-green-500';
                                                case 'PLATOS':
                                                    return 'border-l-blue-500';
                                                case 'CATEGORIAS':
                                                    return 'border-l-purple-500';
                                                default:
                                                    return 'border-l-gray-500';
                                            }
                                        };

                                        return (
                                            <div 
                                                key={activity.id} 
                                                className={`flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 border-l-4 ${getTableColor(activity.tabla)}`}
                                            >
                                                <div className={`flex-shrink-0 p-2 rounded-full bg-accent ${getActionColor(activity.action)}`}>
                                                    {getActionIcon(activity.action)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-foreground">
                                                        {activity.description}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Por {activity.usuario} • {new Date(activity.timestamp).toLocaleString('es-ES', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">No hay actividad reciente</p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Las acciones del sistema aparecerán aquí
                                    </p>
                                </div>
                            )}
                        </Card>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard; 