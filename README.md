# Project Setup
Este proyecto utiliza el siguiente stack tecnologico. 
- React.js inicializado con [Vite](https://vite.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite) para los estilos.
- [Shadcn ui](https://ui.shadcn.com/docs/installation/vite) como libreria de componentes.

## Descripción del Proyecto
Este proyecto es una aplicación interactiva para un restaurante, diseñada para mostrar el menú, detalles de los platos, y permitir a los usuarios explorar categorías destacadas. Está construido con React, Tailwind CSS y otras herramientas modernas para garantizar una experiencia fluida y atractiva.´ Se realizó como trabajo práctico para la meteria Aplicaciones Interactivas, del 3er año de la Lic. en Gestión en Tecnologías de la Información en UADE

## Cómo inicializar el proyecto
Clonar repositorio 
```
  git clone https://github.com/TadeMaddonni/restaurante-apps-interactivas.git
```

Ubicarse en la carpeta correcta
```
  cd restaurante-apps-interactivas
```
Instalar dependencias
```
  npm install
```
Ejecutar el proyecto en modo desarrollo
```
  npm run dev
```

## 📍 Rutas principales de la aplicación

### Rutas públicas

- `/`  
  Página de inicio (Home): muestra el hero, destacados, entorno y ubicación.

- `/platos`  
  Menú completo: permite explorar todos los platos, filtrar por categorías y ver destacados.

- `/plato/:id`  
  Detalle de plato: muestra información detallada de un plato seleccionado.

### Rutas administrativas

- `/admin/login`  
  Login de administrador.

- `/admin/dashboard`  
  Dashboard principal del administrador (requiere autenticación).

- `/admin/dashboard/dishes`  
  Gestión de platos (alta, baja, modificación).

- `/admin/dashboard/categories`  
  Gestión de categorías.

- `/admin/dashboard/users`  
  Gestión de usuarios (solo para administradores con permisos).

- `/admin/dashboard/logs`  
  Visualización de logs y actividad reciente.

### Otras rutas y anclas
- `/#nuevos-sabores`  
  Ancla a la sección “Nuevos Sabores” en el home.
- `/#location`  
  Ancla a la sección de ubicación/contacto.
## Uso del Proyecto
- Página principal: Muestra el Hero, categorías destacadas y nuevos sabores.
- Menú: Explora los platos organizados con posibilidad de filtrar por categorías.
- Detalle del Plato: Muestra información detallada de un plato seleccionado.


## Estructura del Proyecto

```
├── src/
│   ├── components/
│   │   ├── common/    # Componentes comunes: Header, Footer, Navbar, etc.
│   │   ├── pages/     # Vistas principales: Home, Menu, ProductDetail, etc.
│   │   ├── sections/  # Secciones específicas de cada página: Hero, Destacados, etc.
│   │   └── ui/        # Elementos de UI reutilizables: botones, inputs, cards, navegación
│   ├── data/          # Archivos JSON con datos de productos, categorías y otras constantes
│   ├── lib/           # Funciones auxiliares y utilidades generales
│   ├── assets/        # Imágenes, fuentes y otros recursos estáticos
│   └── index.css      # Estilos globales de la aplicación
├── public/            # Archivos públicos (favicon, index.html, etc.)
├── .eslintrc          # Configuración de ESLint para análisis de código
├── package.json       # Dependencias y scripts del proyecto
└── vite.config.js     # Configuración de Vite para el build y desarrollo
```

### Descripción de carpetas principales
- **components/common/**: Header, Footer, Navbar y otros elementos que aparecen en varias páginas.
- **components/pages/**: Vistas principales de la app, cada archivo corresponde a una página.
- **components/sections/**: Secciones específicas que componen las páginas (ej: Hero, Destacados).
- **components/ui/**: Elementos de interfaz reutilizables como botones, tarjetas, inputs, etc.
- **data/**: Archivos JSON con la información de productos, categorías y configuraciones.
- **lib/**: Funciones utilitarias, helpers y lógica auxiliar.
- **assets/**: Imágenes, íconos y recursos estáticos.

## Requisitos Previos
- Node.js (versión 16 o superior)
- npm (versión 8 o superior)
- Editor de código como Visual Studio Code


## Dependencias
- **React**: Biblioteca para construir interfaces de usuario.
- **React Router DOM**: Manejo de rutas en la aplicación.
- **Tailwind CSS**: Framework de utilidades CSS para estilos rápidos.
- **Lucide React**: Iconos SVG para la interfaz.
- **Shadcn**: Componentes de UI.
- **eslint**: Para el análisis de código. 


## Estructura de datos utilizada
Productos / Platos:
```
	{
		"id": int -> Identificador de la preparación,
		"nombre": string -> Nombre de la preparación,
		"descripcion": string -> descripción breve de la preparación,
		"ingredientes": string[] -> Ingredientes utilizados en la preparación,
		"alergenos": string[] -> Alergenos utilizados en la preparación,
		"precio": float -> Precio de la preparación,
		"id_categoria": int -> ID de la categoria a la que pertenece la preparación,
		"imagen": string -> Ruta relativa o absoluta a la que pertenece la preparación,
		"nuevo_destacado": boolean -> Indicador de preparación destacada o no. 
	},

```
Categorias:
```
	{
		"id": int -> Identificador de la categoria,
		"nombre": string -> Nombre de la categoria,
		"descripcion": string -> descripción breve de la categoria,
		"selected_categpry": boolean -> Indicador de categoria destacada o no. 
	},

```
