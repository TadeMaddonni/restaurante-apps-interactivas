import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { UtensilsCrossed, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { loginAdmin } from '../../services/auth';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error cuando el usuario empiece a escribir
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await loginAdmin(formData.email, formData.password);
            
            if (result.success) {
                navigate('/admin/dashboard');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Error de conexión. Intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <UtensilsCrossed className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold font-display">Argentum</span>
                    </div>
                    <h1 className="text-2xl font-semibold text-foreground mb-2">
                        Panel de Administración
                    </h1>
                    <p className="text-muted-foreground">
                        Ingrese sus credenciales para acceder
                    </p>
                </div>

                {/* Formulario */}
                <div className="bg-card rounded-lg shadow-sm border p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="admin@argentum.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                                <AlertCircle className="h-4 w-4 text-destructive" />
                                <span className="text-sm text-destructive">{error}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                        </Button>
                    </form>

                    {/* Links adicionales */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Contacte al administrador para obtener acceso
                        </p>
                    </div>

                    {/* Volver al sitio */}
                    <div className="mt-4 text-center">
                        <Link
                            to="/"
                            className="text-sm text-muted-foreground hover:text-foreground"
                        >
                            ← Volver al sitio principal
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin; 