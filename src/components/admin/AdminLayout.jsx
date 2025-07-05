import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import { isAuthenticated, getCurrentUser } from '../../lib/auth';

const AdminLayout = ({ children, onSidebarAction }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar autenticación
        if (!isAuthenticated()) {
            navigate('/admin/login');
            return;
        }

        // Obtener información del usuario
        const currentUser = getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
    }, [navigate]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} onAction={onSidebarAction} />

            {/* Contenido principal */}
            <div className="flex-1 min-w-0">
                {/* Header móvil */}
                <header className="lg:hidden bg-card border-b border-border px-4 py-3">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-md hover:bg-accent"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-primary-foreground text-sm font-medium">
                                    {user.firstName?.charAt(0) || user.email?.charAt(0)}
                                </span>
                            </div>
                            <span className="text-sm font-medium">
                                {user.firstName || user.email}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Contenido */}
                <main className="p-4 lg:p-6 min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout; 