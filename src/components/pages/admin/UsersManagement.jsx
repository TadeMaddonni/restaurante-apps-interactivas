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
import { createUser, updateUser, deleteUser } from '../../../services/admin';
import { getCurrentUser, canCreateAdmins, canDeleteUser, canEditUser, canChangeRole, canUpdateField, ROLES } from '../../../lib/auth';

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
        password: '', // Mantener 'password' en el frontend
        rolId: ROLES.USER
    });

    const currentUser = getCurrentUser();

    const roles = [
        { value: ROLES.OWNER, label: 'Propietario', icon: Crown, color: 'text-purple-600' },
        { value: ROLES.ADMIN, label: 'Administrador', icon: Shield, color: 'text-blue-600' },
        { value: ROLES.USER, label: 'Usuario', icon: User, color: 'text-green-600' }
    ];

    // Filtrar roles disponibles según permisos del usuario actual
    const availableRoles = roles.filter(role => {
        // Solo owners pueden crear admins
        if (role.value === ROLES.ADMIN) {
            return canCreateAdmins();
        }
        // Solo owners pueden crear otros owners
        if (role.value === ROLES.OWNER) {
            return canCreateAdmins();
        }
        // Todos pueden crear users
        return true;
    });

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

        // Validaciones frontend según especificaciones del backend
        if (formData.nombre && formData.nombre.trim() !== '' && formData.nombre.length > 100) {
            alert('El nombre no puede tener más de 100 caracteres');
            return;
        }

        // Validación de formato de email solo si se proporciona
        if (formData.email && formData.email.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Por favor, ingresa un email válido');
                return;
            }
        }

        // Validación de contraseña solo si se proporciona
        if (formData.password && formData.password.trim() !== '' && formData.password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (editingUser) {
            // ========== VALIDACIONES PARA EDICIÓN ==========
            
            // Verificar permisos básicos de edición
            if (!canEditUser(editingUser.id, editingUser.rolId)) {
                alert('No tienes permisos para editar este usuario');
                return;
            }

            // Verificar permisos para cambio de rol
            if (formData.rolId !== editingUser.rolId && !canChangeRole(editingUser.rolId)) {
                alert('Solo los propietarios pueden cambiar roles de usuarios');
                return;
            }

            // Para edición, crear objeto solo con campos que han cambiado
            const userData = {};
            
            if (formData.nombre !== editingUser.nombre && formData.nombre.trim() !== '') {
                if (!canUpdateField('nombre', editingUser.id, editingUser.rolId)) {
                    alert('No tienes permisos para cambiar el nombre de este usuario');
                    return;
                }
                userData.nombre = formData.nombre.trim();
            }

            if (formData.email !== editingUser.email && formData.email.trim() !== '') {
                if (!canUpdateField('email', editingUser.id, editingUser.rolId)) {
                    alert('No tienes permisos para cambiar el email de este usuario');
                    return;
                }
                userData.email = formData.email.trim();
            }

            if (formData.password && formData.password.trim() !== '') {
                if (!canUpdateField('password', editingUser.id, editingUser.rolId)) {
                    alert('No tienes permisos para cambiar la contraseña de este usuario');
                    return;
                }
                userData.password = formData.password;
            }

            if (formData.rolId !== editingUser.rolId) {
                if (!canUpdateField('rolId', editingUser.id, editingUser.rolId)) {
                    alert('No tienes permisos para cambiar el rol de este usuario');
                    return;
                }
                userData.rolId = formData.rolId;
            }

            // Si no hay cambios, no hacer nada
            if (Object.keys(userData).length === 0) {
                alert('No se detectaron cambios para actualizar');
                return;
            }

            try {
                const result = await updateUser(editingUser.id, userData);
                
                if (result.success) {
                    setShowForm(false);
                    setEditingUser(null);
                    resetForm();
                    loadUsers();
                    alert(result.message || 'Usuario actualizado exitosamente');
                } else {
                    handleUpdateError(result);
                }
            } catch (error) {
                console.error('Error updating user:', error);
                alert('Error al actualizar usuario: ' + error.message);
            }

        } else {
            // ========== VALIDACIONES PARA CREACIÓN ==========
            
            // Para creación, validar campos requeridos
            if (!formData.nombre || formData.nombre.trim() === '') {
                alert('El nombre es requerido');
                return;
            }

            if (!formData.email || formData.email.trim() === '') {
                alert('El email es requerido');
                return;
            }

            if (!formData.password || formData.password.trim() === '') {
                alert('La contraseña es requerida para crear un nuevo usuario');
                return;
            }

            // Verificar permisos para crear admins
            if (formData.rolId === ROLES.ADMIN && !canCreateAdmins()) {
                alert('Solo los propietarios pueden crear administradores');
                return;
            }

            // Verificar permisos para crear owners
            if (formData.rolId === ROLES.OWNER && !canCreateAdmins()) {
                alert('Solo los propietarios pueden crear otros propietarios');
                return;
            }

            try {
                const userData = {
                    nombre: formData.nombre.trim(),
                    email: formData.email.trim(),
                    password: formData.password,
                    rolId: formData.rolId
                };
                
                const result = await createUser(userData);
                
                if (result.success) {
                    setShowForm(false);
                    setEditingUser(null);
                    resetForm();
                    loadUsers();
                    alert(result.message || 'Usuario creado exitosamente');
                } else {
                    handleCreateError(result);
                }
            } catch (error) {
                console.error('Error creating user:', error);
                alert('Error al crear usuario: ' + error.message);
            }
        }
    };

    // Función helper para manejar errores de actualización
    const handleUpdateError = (result) => {
        if (result.message) {
            alert(result.message);
        } else if (result.error) {
            if (result.error.includes('403') || result.error.includes('permisos') || result.error.includes('autoriza')) {
                alert('No tienes permisos para actualizar este usuario');
            } else if (result.error.includes('404') || result.error.includes('no encontrado')) {
                alert('Usuario no encontrado');
            } else if (result.error.includes('409') || result.error.includes('email') || result.error.includes('duplicado')) {
                alert('Este email ya está registrado. Por favor, usa otro email.');
            } else if (result.error.includes('contraseña') || result.error.includes('password')) {
                alert('La contraseña debe tener al menos 6 caracteres.');
            } else {
                alert('Error al actualizar: ' + result.error);
            }
        } else {
            alert('Error al actualizar usuario');
        }
    };

    // Función helper para manejar errores de creación
    const handleCreateError = (result) => {
        if (result.message) {
            alert(result.message);
        } else if (result.error) {
            if (result.error.includes('email') || result.error.includes('Email')) {
                alert('Este email ya está registrado. Por favor, usa otro email.');
            } else if (result.error.includes('contraseña') || result.error.includes('password')) {
                alert('La contraseña debe tener al menos 6 caracteres.');
            } else if (result.error.includes('permiso') || result.error.includes('autoriza') || result.error.includes('forbidden')) {
                alert('No tienes permisos para realizar esta acción.');
            } else if (result.error.includes('validación') || result.error.includes('validation')) {
                alert('Error de validación: ' + result.error);
            } else {
                alert(result.error);
            }
        } else {
            alert('Error al crear usuario');
        }
    };

    const handleEdit = (user) => {
        // Verificar permisos de edición
        if (!canEditUser(user.id, user.rolId)) {
            if (user.rolId === ROLES.OWNER) {
                alert('No tienes permisos para editar propietarios');
            } else if (user.rolId === ROLES.ADMIN) {
                alert('No tienes permisos para editar administradores');
            } else {
                alert('No tienes permisos para editar este usuario');
            }
            return;
        }

        setEditingUser(user);
        setFormData({
            nombre: user.nombre || '',
            email: user.email,
            password: '', // No mostrar password actual
            rolId: user.rolId
        });
        setShowForm(true);
    };

    const handleDelete = async (userId) => {
        // Encontrar el usuario que se va a eliminar
        const userToDelete = users.find(user => user.id === userId);
        
        if (!userToDelete) {
            alert('Usuario no encontrado');
            return;
        }

        // Verificar permisos de eliminación
        if (!canDeleteUser(userToDelete.rolId)) {
            if (userToDelete.rolId === ROLES.OWNER) {
                alert('No tienes permisos para eliminar propietarios');
            } else if (userToDelete.rolId === ROLES.ADMIN) {
                alert('No tienes permisos para eliminar administradores');
            } else {
                alert('No tienes permisos para eliminar este usuario');
            }
            return;
        }

        if (window.confirm('¿Está seguro de que desea eliminar este usuario?')) {
            try {
                const result = await deleteUser(userId);
                if (result.success) {
                    loadUsers();
                } else {
                    alert(result.message || 'Error al eliminar usuario');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Error al eliminar usuario');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            email: '',
            password: '',
            rolId: ROLES.USER
        });
    };

    const getRoleInfo = (roleValue) => {
        return roles.find(role => role.value === roleValue) || roles[0];
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = !selectedRole || user.rolId === parseInt(selectedRole);
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
                        const roleInfo = getRoleInfo(user.rolId);
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
                                            {/* Solo mostrar botón de editar si tiene permisos */}
                                            {canEditUser(user.id, user.rolId) && (
                                                <Button
                                                    variant="adminGhost"
                                                    size="sm"
                                                    onClick={() => handleEdit(user)}
                                                >
                                                    <Edit className="h-4 w-4 text-amber-50" />
                                                </Button>
                                            )}
                                            {/* Solo mostrar botón de eliminar si tiene permisos */}
                                            {canDeleteUser(user.rolId) && (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-white" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center justify-start gap-3">
                                        {/* Mostrar rol como texto fijo */}
                                        <span className={`text-xs font-medium ${roleInfo.color}`}>
                                            {roleInfo.label}
                                        </span>
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
                                        <Label htmlFor="rolId">Rol</Label>
                                        <Select
                                            id="rolId"
                                            name="rolId"
                                            value={formData.rolId}
                                            onChange={handleInputChange}
                                            required
                                            disabled={editingUser && !canChangeRole(editingUser.rolId)}
                                        >
                                            {editingUser ? (
                                                // Para edición, mostrar todos los roles pero deshabilitar el select si no tiene permisos
                                                roles.map(role => (
                                                    <SelectOption key={role.value} value={role.value}>
                                                        {role.label}
                                                    </SelectOption>
                                                ))
                                            ) : (
                                                // Para creación, filtrar roles según permisos
                                                availableRoles.map(role => (
                                                    <SelectOption key={role.value} value={role.value}>
                                                        {role.label}
                                                    </SelectOption>
                                                ))
                                            )}
                                        </Select>
                                        {editingUser && !canChangeRole(editingUser.rolId) && (
                                            <p className="text-xs text-muted-foreground mt-1">
                                                No tienes permisos para cambiar el rol de este usuario
                                            </p>
                                        )}
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