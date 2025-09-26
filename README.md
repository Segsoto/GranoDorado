# Grano Dorado - Página Web de Café Premium

Una página web elegante y moderna para una tienda de café de alta calidad, inspirada en el estilo visual de Taste Pura Vida.

## 🌟 Características

- **Diseño Responsivo**: Adaptable a desktop, tablet y móvil
- **Paleta Elegante**: Colores negro, blanco, café y dorado
- **Animaciones Suaves**: Efectos de scroll reveal y parallax
- **Modo Oscuro**: Toggle entre tema claro y oscuro
- **Navegación Inteligente**: Menú sticky con indicador de sección activa
- **Formulario Funcional**: Validación en tiempo real y feedback visual
- **SEO Optimizado**: Meta tags y estructura semántica
- **Accesibilidad**: Cumple con estándares de accesibilidad web

## 📁 Estructura del Proyecto

```
GranoDorado/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos CSS completos
├── js/
│   └── main.js         # JavaScript principal
├── images/             # Carpeta para imágenes
└── README.md           # Este archivo
```

## 🚀 Instalación y Uso

1. **Clona o descarga** todos los archivos en una carpeta
2. **Abre** `index.html` en tu navegador web
3. **¡Listo!** La página está lista para usar

### Para desarrollo local:

```bash
# Si tienes Python instalado:
python -m http.server 8000

# O con Node.js:
npx serve .

# Luego visita http://localhost:8000
```

## 🎨 Secciones Incluidas

### 1. **Hero Section**
- Fondo degradado elegante
- Logo y eslogan principal
- Botón de llamada a acción
- Efectos parallax sutiles

### 2. **Quiénes Somos**
- Historia de la marca
- Cards con valores principales:
  - Calidad Premium
  - Comercio Justo
  - Sostenibilidad

### 3. **Historia/Timeline**
- Línea de tiempo interactiva
- Hitos importantes desde 1985
- Animaciones hover suaves

### 4. **Carta de Productos**
- Grid responsive de productos
- Filtros por categoría
- Overlays con botones de acción
- Información de precios y etiquetas

### 5. **Blog**
- Artículos destacados
- Meta información (fecha, categoría)
- Enlaces a contenido completo

### 6. **Contacto**
- Formulario con validación
- Información de contacto
- Botón de WhatsApp directo
- Placeholder para mapa

### 7. **Footer**
- Enlaces rápidos
- Políticas
- Redes sociales
- Copyright

## ⚡ Funcionalidades JavaScript

### Navegación
- Menú sticky que se oculta/muestra al hacer scroll
- Navegación suave entre secciones
- Menú hamburguesa para móviles
- Indicador de sección activa

### Animaciones
- Scroll reveal animations
- Parallax en hero section
- Efectos hover en cards y botones
- Transiciones suaves

### Interactividad
- **Modo oscuro**: Toggle persistente
- **Filtros de productos**: Animaciones de transición
- **Formulario**: Validación en tiempo real
- **Notificaciones**: Sistema de mensajes toast

### Rendimiento
- Lazy loading de imágenes
- Throttling en eventos de scroll
- Intersection Observer para animaciones
- Debouncing en eventos de resize

## 🎯 Optimizaciones SEO

### Meta Tags
```html
<meta name="description" content="Grano Dorado - Café de alta calidad...">
<meta name="keywords" content="café, grano, alta calidad...">
```

### Estructura Semántica
- Uso correcto de heading tags (h1, h2, h3...)
- Navegación con `<nav>`
- Secciones con `<section>`
- Footer semántico

### Accesibilidad
- Alt text en imágenes (placeholder)
- Labels en formularios
- Navegación por teclado
- Skip links
- ARIA labels

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

### Características Móviles
- Menú hamburguesa
- Touch-friendly buttons
- Optimización de formularios
- Layout de una columna

## 🎨 Paleta de Colores

```css
/* Variables CSS */
--primary-black: #1a1a1a
--primary-white: #ffffff
--coffee-brown: #8B4513
--coffee-light: #D2691E
--gold-accent: #DAA520
--gold-light: #F4E4BC
```

## 🔧 Personalización

### Cambiar Colores
Edita las variables CSS en `styles.css`:
```css
:root {
  --coffee-brown: #tu-color;
  --gold-accent: #tu-color;
}
```

### Agregar Contenido
- **Productos**: Modifica las cards en la sección `#carta`
- **Blog**: Actualiza los artículos en `#blog`
- **Imágenes**: Coloca archivos en `/images/`

### Funcionalidades Adicionales
- Integración con API de productos
- Sistema de carrito de compras
- Integración con Google Maps
- Sistema de blog completo

## 🌐 Compatibilidad

- **Chrome** 60+
- **Firefox** 60+
- **Safari** 12+
- **Edge** 79+

## 📞 Soporte

Para soporte técnico o personalizaciones:
- Email: hola@granodorado.com
- WhatsApp: +506 2222-3333

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [MIT License](LICENSE).

---

**Desarrollado con ❤️ y mucho ☕**

*Grano Dorado - Conectando el mundo con el mejor café desde 1985*