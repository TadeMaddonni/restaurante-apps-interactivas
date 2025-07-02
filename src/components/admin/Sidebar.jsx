import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    UtensilsCrossed, 
    Users, 
    Settings, 
    LogOut, 
    Menu,
    X,
    BarChart3,
    Plus,
    Edit
} from 'lucide-react';
import { logout } from '../../lib/auth';   

const Sidebar = ({ isOpen, onToggle }) => {
    const location = useLocation();

    const menuItems = [
        {
            title: 'Dashboard',
            icon: BarChart3,
            path: '/admin/dashboard',
            exact: true
        },
        {
            title: 'Platos',
            icon: UtensilsCrossed,
            path: '/admin/dashboard/dishes',
            children: [
                {
                    title: 'Ver todos',
                    path: '/admin/dashboard/dishes',
                    icon: Menu
                },
                {
                    title: 'Agregar plato',
                    path: '/admin/dashboard/dishes/new',
                    icon: Plus
                }
            ]
        },
        {
            title: 'Usuarios',
            icon: Users,
            path: '/admin/dashboard/users',
            children: [
                {
                    title: 'Ver todos',
                    path: '/admin/dashboard/users',
                    icon: Users
                },
                {
                    title: 'Agregar usuario',
                    path: '/admin/dashboard/users/new',
                    icon: Plus
                }
            ]
        },
        {
            title: 'Configuración',
            icon: Settings,
            path: '/admin/dashboard/settings'
        }
    ];

    const handleLogout = () => {
        logout();
        window.location.href = '/admin/login';
    };

    const isActive = (path, exact = false) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* Overlay para móviles */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed top-0 left-0 h-full bg-sidebar border-r border-sidebar-border z-50
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:static lg:z-auto
                w-64 flex flex-col
            `}>
                {/* Header del sidebar */}
                <div className="flex items-center justify-between p-4 border-b border-sidebar-border flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <UtensilsCrossed className="h-6 w-6 text-sidebar-primary" />
                        <span className="font-bold font-display text-sidebar-foreground">Admin Panel</span>
                    </div>
                    <button
                        onClick={onToggle}
                        className="lg:hidden p-1 rounded-md hover:bg-sidebar-accent"
                    >
                        <X className="h-5 w-5 text-sidebar-foreground" />
                    </button>
                </div>

                {/* Menú de navegación - Scrollable */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {menuItems.map((item, index) => (
                        <div key={index}>
                            {/* Item principal */}
                            <Link
                                to={item.path}
                                className={`
                                    flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                                    ${isActive(item.path, item.exact) 
                                        ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                    }
                                `}
                            >
                                <item.icon className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">{item.title}</span>
                            </Link>

                            {/* Submenús */}
                            {item.children && isActive(item.path) && (
                                <div className="ml-6 mt-2 space-y-1">
                                    {item.children.map((child, childIndex) => (
                                        <Link
                                            key={childIndex}
                                            to={child.path}
                                            className={`
                                                flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors
                                                ${isActive(child.path, true)
                                                    ? 'bg-sidebar-primary/20 text-sidebar-primary'
                                                    : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                                                }
                                            `}
                                        >
                                            <child.icon className="h-3 w-3 flex-shrink-0" />
                                            <span className="truncate">{child.title}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Footer del sidebar - Fixed at bottom */}
                <div className="flex-shrink-0 p-4 border-t border-sidebar-border">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full transition-colors cursor-pointer"
                    >
                        <LogOut className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">Cerrar sesión</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar; 