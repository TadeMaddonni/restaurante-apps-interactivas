import React, { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    Calendar,
    User,
    Database,
    Activity,
    Plus,
    Edit,
    Trash2,
    RotateCcw,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Card } from '../../ui/card';
import { Label } from '../../ui/label';
import { Select, SelectOption } from '../../ui/select';
import AdminLayout from '../../admin/AdminLayout';
import { getLogs, getActionColor } from '../../../services/logs';

const LogsManagement = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 20
    });

    // Filtros
    const [filters, setFilters] = useState({
        page: 1,
        limit: 20,
        tabla: '',
        accion: '',
        usuarioId: '',
        fechaDesde: '',
        fechaHasta: ''
    });

    const tablas = [
        { value: '', label: 'Todas las tablas' },
        { value: 'USERS', label: 'Usuarios' },
        { value: 'PLATOS', label: 'Platos' },
        { value: 'CATEGORIAS', label: 'Categorías' }
    ];

    const acciones = [
        { value: '', label: 'Todas las acciones' },
        { value: 'CREAR', label: 'Crear' },
        { value: 'ACTUALIZAR', label: 'Actualizar' },
        { value: 'ELIMINAR', label: 'Eliminar' },
        { value: 'RESTAURAR', label: 'Restaurar' }
    ];

    useEffect(() => {
        loadLogs();
    }, [filters]);

    const loadLogs = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await getLogs(filters);
            
            if (result.success) {
                setLogs(result.logs || []);
                setPagination(result.pagination || {
                    currentPage: 1,
                    totalPages: 1,
                    totalItems: 0,
                    itemsPerPage: 20
                });
            } else {
                setError(result.error || 'Error al cargar los logs');
            }
        } catch (error) {
            console.error('Error loading logs:', error);
            setError('Error de conexión al cargar los logs');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value,
            page: 1 // Reset page when filters change
        }));
    };

    const handlePageChange = (newPage) => {
        setFilters(prev => ({
            ...prev,
            page: newPage
        }));
    };

    const clearFilters = () => {
        setFilters({
            page: 1,
            limit: 20,
            tabla: '',
            accion: '',
            usuarioId: '',
            fechaDesde: '',
            fechaHasta: ''
        });
    };

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

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Cargando logs...</p>
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
                            <Activity className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Error</h3>
                        <p className="text-muted-foreground mb-4">{error}</p>
                        <Button onClick={loadLogs} variant="outline">
                            Reintentar
                        </Button>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="w-full space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Logs del Sistema</h1>
                        <p className="text-muted-foreground mt-1">
                            Historial de actividades y cambios en el sistema
                        </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Total: {pagination.totalItems} registros
                    </div>
                </div>

                {/* Filtros */}
                <Card className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
                        <div>
                            <Label htmlFor="tabla">Tabla</Label>
                            <Select
                                id="tabla"
                                value={filters.tabla}
                                onChange={(e) => handleFilterChange('tabla', e.target.value)}
                            >
                                {tablas.map(tabla => (
                                    <SelectOption key={tabla.value} value={tabla.value}>
                                        {tabla.label}
                                    </SelectOption>
                                ))}
                            </Select>
                        </div>
                        
                        <div>
                            <Label htmlFor="accion">Acción</Label>
                            <Select
                                id="accion"
                                value={filters.accion}
                                onChange={(e) => handleFilterChange('accion', e.target.value)}
                            >
                                {acciones.map(accion => (
                                    <SelectOption key={accion.value} value={accion.value}>
                                        {accion.label}
                                    </SelectOption>
                                ))}
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="fechaDesde">Fecha desde</Label>
                            <Input
                                id="fechaDesde"
                                type="date"
                                value={filters.fechaDesde}
                                onChange={(e) => handleFilterChange('fechaDesde', e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="fechaHasta">Fecha hasta</Label>
                            <Input
                                id="fechaHasta"
                                type="date"
                                value={filters.fechaHasta}
                                onChange={(e) => handleFilterChange('fechaHasta', e.target.value)}
                            />
                        </div>

                        <div className="flex items-end">
                            <Button 
                                variant="outline" 
                                onClick={clearFilters}
                                className="w-full"
                            >
                                Limpiar filtros
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Lista de logs */}
                <div className="space-y-3">
                    {logs.map((log) => (
                        <Card key={log.id} className={`p-4 border-l-4 ${getTableColor(log.tabla)}`}>
                            <div className="flex items-start gap-4">
                                <div className={`flex-shrink-0 p-2 rounded-full bg-accent ${getActionColor(log.accion)}`}>
                                    {getActionIcon(log.accion)}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-foreground">
                                                {log.descripcion}
                                            </h3>
                                            <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <User className="h-3 w-3" />
                                                    {log.usuario?.nombre || 'Usuario desconocido'}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Database className="h-3 w-3" />
                                                    {log.tabla}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(log.createdAt).toLocaleString('es-ES', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                                {log.ip && (
                                                    <span className="text-xs">
                                                        IP: {log.ip}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                log.accion === 'CREAR' ? 'bg-green-100 text-green-800' :
                                                log.accion === 'ACTUALIZAR' ? 'bg-blue-100 text-blue-800' :
                                                log.accion === 'ELIMINAR' ? 'bg-red-100 text-red-800' :
                                                log.accion === 'RESTAURAR' ? 'bg-purple-100 text-purple-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {log.accion}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Mostrar datos adicionales si están disponibles */}
                                    {log.datosNuevos && Object.keys(log.datosNuevos).length > 0 && (
                                        <details className="mt-2">
                                            <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                                                Ver detalles
                                            </summary>
                                            <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-x-auto">
                                                {JSON.stringify(log.datosNuevos, null, 2)}
                                            </pre>
                                        </details>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {logs.length === 0 && !loading && (
                    <Card className="p-8 text-center">
                        <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                            No se encontraron logs que coincidan con los filtros
                        </p>
                    </Card>
                )}

                {/* Paginación */}
                {pagination.totalPages > 1 && (
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Página {pagination.currentPage} de {pagination.totalPages}
                                {' • '}
                                {pagination.totalItems} registros total
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    disabled={pagination.currentPage <= 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Anterior
                                </Button>
                                
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                        const pageNum = Math.max(1, pagination.currentPage - 2) + i;
                                        if (pageNum > pagination.totalPages) return null;
                                        
                                        return (
                                            <Button
                                                key={pageNum}
                                                variant={pageNum === pagination.currentPage ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => handlePageChange(pageNum)}
                                                className="w-8 h-8"
                                            >
                                                {pageNum}
                                            </Button>
                                        );
                                    })}
                                </div>
                                
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    disabled={pagination.currentPage >= pagination.totalPages}
                                >
                                    Siguiente
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
};

export default LogsManagement;
