# Estructura del Proyecto Grano Dorado

## 📁 Arquitectura de Archivos

### Estructura Principal
```
GranoDorado/
├── index.html              # Página principal / Landing page
├── quienes-somos.html      # Página "Quiénes Somos"
├── historia.html           # Página de Historia de la empresa
├── carta.html             # Catálogo de productos
├── blog.html              # Blog y artículos
├── contacto.html          # Página de contacto
├── css/
│   └── styles.css         # Estilos principales
├── js/
│   └── main.js           # JavaScript principal
├── README.md             # Documentación general
├── DEPLOY.md             # Guía de despliegue
└── ESTRUCTURA.md         # Este archivo
```

## 🏠 Página Principal (index.html)

**Función**: Landing page que presenta la empresa y enlaza a las páginas específicas.

**Secciones**:
- **Hero**: Presentación principal con call-to-action
- **Quiénes Somos Preview**: Resumen con enlace a página completa
- **Carta Preview**: Muestra de productos principales con enlace a catálogo
- **Enlaces Rápidos**: Grid de navegación rápida a todas las secciones

**Características**:
- Diseño centrado en conversión
- Enlaces a páginas especializadas
- Previews atractivos de contenido

## 📄 Páginas Especializadas

### 1. Quiénes Somos (quienes-somos.html)
- Historia de la empresa
- Misión, visión y valores
- Equipo y certificaciones
- Galería de la empresa

### 2. Historia (historia.html)
- Timeline interactivo desde 1985
- Milestones importantes
- Contadores de estadísticas
- Visión futura

### 3. Carta (carta.html)
- Catálogo completo de productos
- Sistema de filtros por categoría
- Información detallada de cada producto
- Guía de preparación
- Planes de suscripción

### 4. Blog (blog.html)
- Artículos sobre café
- Sistema de categorías
- Newsletter signup
- Artículo destacado

### 5. Contacto (contacto.html)
- Formulario de contacto multi-paso
- Información de contacto completa
- FAQ con accordion
- Integración WhatsApp
- Mapa (placeholder)

## 🎨 Diseño y Estilos

### CSS Organizado (styles.css)
- **Variables CSS**: Colores, tipografías y espaciados consistentes
- **Diseño Responsivo**: Breakpoints para móvil, tablet y desktop
- **Modo Oscuro**: Toggle de tema disponible
- **Animaciones**: Scroll reveals y transiciones suaves
- **Componentes Modulares**: Botones, cards, formularios reutilizables

### Paleta de Colores
- **Principal**: Marrón café (#2C1810)
- **Secundario**: Dorado (#D4AF37)
- **Neutros**: Blanco, crema suave, gris
- **Acentos**: Variaciones de marrón y dorado

### Tipografías
- **Encabezados**: Playfair Display (elegante, serif)
- **Contenido**: Inter (moderna, sans-serif)

## ⚡ Funcionalidad JavaScript

### Características Principales (main.js)
- **Navegación Inteligente**: Menú hamburguesa responsive
- **Scroll Reveal**: Animaciones al hacer scroll
- **Modo Oscuro**: Toggle persistente
- **Filtros de Productos**: En página de carta
- **Validación de Formularios**: En contacto y newsletter
- **Intersección Observer**: Para animaciones optimizadas

### Componentes Interactivos
- Timeline animado
- Contador de estadísticas
- Sistema de filtros
- Modales de productos
- Accordion FAQ
- Formularios con validación

## 🔗 Sistema de Navegación

### Navegación Principal
Todas las páginas incluyen un header con:
- Logo (enlaza a index.html)
- Menú de navegación a todas las páginas
- Toggle de modo oscuro
- Menú hamburguesa en móvil

### Enlaces de Footer
Footer consistente en todas las páginas con:
- Enlaces rápidos a todas las secciones
- Información de contacto
- Redes sociales
- Enlaces legales

## 📱 Responsividad

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Optimizaciones Móviles
- Menú hamburguesa
- Grids adaptativas
- Texto optimizado para lectura
- Botones táctiles apropiados

## 🚀 Rendimiento

### Optimizaciones Implementadas
- CSS y JS optimizados
- Lazy loading de imágenes (placeholder)
- Animaciones eficientes con CSS
- Código JavaScript vanilla (sin dependencias)

### SEO y Accesibilidad
- Estructura semántica HTML5
- Meta tags apropiados
- Alt tags para imágenes
- Contraste de colores accesible
- Navegación por teclado

## 🎯 Experiencia de Usuario

### Flujo de Navegación
1. **Landing** (index.html): Primera impresión y direccionamiento
2. **Exploración**: Páginas especializadas con contenido completo
3. **Conversión**: CTAs estratégicos hacia carta y contacto
4. **Engagement**: Blog para retención de usuarios

### Características de Conversión
- CTAs prominentes en hero
- Vista previa de productos
- Formulario de contacto optimizado
- WhatsApp directo
- Newsletter signup

## 🔧 Mantenimiento

### Para Actualizar Contenido
1. **Productos**: Editar carta.html y agregar CSS si es necesario
2. **Blog**: Agregar artículos en blog.html
3. **Información**: Actualizar quienes-somos.html
4. **Historia**: Agregar eventos al timeline en historia.html

### Para Modificar Estilos
- Variables CSS centralizadas al inicio de styles.css
- Componentes modulares fáciles de modificar
- Sistema de clases consistente

---

**Nota**: Esta estructura modular permite fácil mantenimiento, actualización de contenido y escalabilidad futura del sitio web.