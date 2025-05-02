# Project Setup
Este proyecto utiliza el siguiente stack tecnologico. 
- React.js inicializado con [Vite](https://vite.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite) para los estilos.
- [Shadcn ui](https://ui.shadcn.com/docs/installation/vite) como libreria de componentes.

## Descripción del Proyecto
Este proyecto es una aplicación interactiva para un restaurante, diseñada para mostrar el menú, detalles de los platos, y permitir a los usuarios explorar categorías destacadas. Está construido con React, Tailwind CSS y otras herramientas modernas para garantizar una experiencia fluida y atractiva.´ Se realizó como trabajo práctico para la meteria Aplicaciones Interactivas, del 3er año de la Lic. en Gestión en Tecnologías de la Información en UADE

## Estructura del Proyecto
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── common/       # Componentes comunes como Header, Footer
│   │   ├── pages/        # Páginas principales (Home, Menu, ProductDetail)
│   │   ├── sections/     # Secciones específicas como Hero, Destacados
│   │   └── ui/           # Componentes de UI reutilizables (botones, tarjetas)
│   ├── data/             # Archivos JSON con datos de productos y categorías
│   ├── lib/              # Utilidades y funciones auxiliares
│   ├── assets/           # Recursos estáticos como imágenes y fuentes
│   └── index.css      # Estilos globales
├── public/               # Archivos públicos
├── [package.json]       # Dependencias y scripts del proyecto
└── [vite.config.js]      # Configuración de Vite

## Requisitos Previos
- Node.js (versión 16 o superior)
- npm (versión 8 o superior)
- Editor de código como Visual Studio Code

## Running the project
Clonar repositorio 

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
## Uso del Proyecto
- Página principal: Muestra el Hero, categorías destacadas y nuevos sabores.
- Menú: Explora los platos organizados por categorías.
- Detalle del Plato: Muestra información detallada de un plato seleccionado.

## Dependencias
- **React**: Biblioteca para construir interfaces de usuario.
- **React Router DOM**: Manejo de rutas en la aplicación.
- **Tailwind CSS**: Framework de utilidades CSS para estilos rápidos.
- **Lucide React**: Iconos SVG para la interfaz.