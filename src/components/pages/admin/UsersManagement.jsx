import React, { useState, useEffect } from 'react';
import {
    Plus,
    Edit,
    Trash2,
    Search,
    Shield,
    User,
    Crown,
    X
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Card } from '../../ui/card';
import { Label } from '../../ui/label';
import { Select, SelectOption } from '../../ui/select';
import AdminLayout from '../../admin/AdminLayout';
import { getAllUsers as getUsersFromAuth } from '../../../services/auth';
import { createUser, updateUser, deleteUser, changeUserRole } from '../../../services/admin';

const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        role: 'admin'
    });

    const roles = [
        { value: 'admin', label: 'Administrador', icon: Shield, color: 'text-blue-600' },
        { value: 'owner', label: 'Propietario', icon: Crown, color: 'text-purple-600' },
        { value: 'user', label: 'Usuario', icon: User, color: 'text-green-600' }
    ];

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await getUsersFromAuth();
            if (result.success) {
                setUsers(result.users || []);
            } else {
                setError('Error al cargar los usuarios');
            }
        } catch (error) {
            console.error('Error loading users:', error);
            setError('Error de conexión al cargar los usuarios');
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

        try {
            let result;
            if (editingUser) {
                // Para edición, no enviar password si está vacío
                const userData = { ...formData };
                if (!userData.password) {
                    delete userData.password;
                }
                result = await updateUser(editingUser.id, userData);
            } else {
                result = await createUser(formData);
            }

            if (result.success) {
                setShowForm(false);
                setEditingUser(null);
                resetForm();
                loadUsers();
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            nombre: user.nombre || '',
            email: user.email,
            password: '', // No mostrar password actual
            role: user.role
        });
        setShowForm(true);
    };

    const handleDelete = async (userId) => {
        if (window.confirm('¿Está seguro de que desea eliminar este usuario?')) {
            try {
                const result = await deleteUser(userId);
                if (result.success) {
                    loadUsers();
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const result = await changeUserRole(userId, newRole);
            if (result.success) {
                loadUsers();
            }
        } catch (error) {
            console.error('Error changing user role:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            email: '',
            password: '',
            role: 'admin'
        });
    };

    const getRoleInfo = (roleValue) => {
        return roles.find(role => role.value === roleValue) || roles[0];
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = !selectedRole || user.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Cargando usuarios...</p>
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
                            <Users className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Error</h3>
                        <p className="text-muted-foreground mb-4">{error}</p>
                        <Button onClick={loadUsers} variant="outline">
                            Reintentar
                        </Button>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    const handleSidebarAction = (action) => {
        if (action === 'add-user') {
            setShowForm(true);
        }
    };

    return (
        <AdminLayout onSidebarAction={handleSidebarAction}>
            <div className="w-full space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Gestión de Usuarios</h1>
                        <p className="text-muted-foreground mt-1">
                            Administre los usuarios del sistema
                        </p>
                    </div>
                    <Button variant="adminOrange" onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Usuario
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
                                    placeholder="Buscar por nombre o email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="md:w-48">
                            <Label htmlFor="role">Rol</Label>
                            <Select
                                id="role"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                            >
                                <SelectOption value="">Todos los roles</SelectOption>
                                {roles.map(role => (
                                    <SelectOption key={role.value} value={role.value}>
                                        {role.label}
                                    </SelectOption>
                                ))}
                            </Select>
                        </div>
                    </div>
                </Card>

                {/* Lista de usuarios */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map((user) => {
                        const roleInfo = getRoleInfo(user.role);
                        const RoleIcon = roleInfo.icon;

                        return (
                            <Card key={user.id} className="p-4">
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 flex flex-col gap-2">
                                            <div className="flex items-center gap-2 mb-1">
                                                <RoleIcon className={`h-4 w-4 ${roleInfo.color}`} />
                                                <span className="text-xs font-medium text-muted-foreground">
                                                    {roleInfo.label}
                                                </span>
                                            </div>
                                            <h3 className="font-semibold text-foreground">
                                                {user.nombre}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <Button
                                                variant="adminGhost"
                                                size="sm"
                                                onClick={() => handleEdit(user)}
                                            >
                                                <Edit className="h-4 w-4 text-amber-50" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                <Trash2 className="h-4 w-4 text-white" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center justify-start gap-3">
                                        <Select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            className="text-xs cursor-pointer"
                                        >
                                            {roles.map(role => (
                                                <SelectOption key={role.value} value={role.value}>
                                                    {role.label}
                                                </SelectOption>
                                            ))}
                                        </Select>
                                        <span className="text-xs text-muted-foreground">
                                            Creado: {new Date(user.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {filteredUsers.length === 0 && (
                    <Card className="p-8 text-center">
                        <p className="text-muted-foreground">
                            No se encontraron usuarios que coincidan con los filtros
                        </p>
                    </Card>
                )}

                {/* Modal de formulario */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <Card className="w-full max-w-md">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold">
                                        {editingUser ? 'Editar Usuario' : 'Agregar Usuario'}
                                    </h2>
                                    <Button
                                        variant="adminGhost"
                                        size="sm"
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditingUser(null);
                                            resetForm();
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
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
                                    </div>

                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="password">
                                            {editingUser ? 'Nueva contraseña (dejar vacío para mantener)' : 'Contraseña'}
                                        </Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required={!editingUser}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="role">Rol</Label>
                                        <Select
                                            id="role"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            {roles.map(role => (
                                                <SelectOption key={role.value} value={role.value}>
                                                    {role.label}
                                                </SelectOption>
                                            ))}
                                        </Select>
                                    </div>

                                    <div className="flex gap-2 pt-4">
                                        <Button type="submit" variant="adminOrange" className="flex-1">
                                            {editingUser ? 'Actualizar Usuario' : 'Crear Usuario'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="adminGhost"
                                            onClick={() => {
                                                setShowForm(false);
                                                setEditingUser(null);
                                                resetForm();
                                            }}
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

export default UsersManagement; 