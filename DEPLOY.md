# 🚀 Instrucciones de Despliegue - Grano Dorado

## 📋 Lista de Verificación Pre-Despliegue

### ✅ Archivos Necesarios
- [x] `index.html` - Página principal
- [x] `css/styles.css` - Estilos CSS completos
- [x] `js/main.js` - JavaScript funcional
- [x] `images/` - Carpeta para imágenes (crear si no existe)
- [x] `README.md` - Documentación

### 🔧 Configuración Inicial

1. **Verificar estructura de archivos:**
```
GranoDorado/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
└── README.md
```

2. **Agregar imágenes reales (opcional):**
   - Reemplazar los placeholders con imágenes reales
   - Formato recomendado: JPG/PNG optimizadas
   - Tamaños sugeridos:
     - Hero: 1920x1080px
     - Productos: 400x300px
     - Blog: 600x400px

## 🌐 Opciones de Despliegue

### Opción 1: Servidor Local (Desarrollo)

#### Con Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -M SimpleHTTPServer 8000
```

#### Con Node.js:
```bash
# Instalar serve globalmente
npm install -g serve

# Ejecutar servidor
serve .
```

#### Con PHP:
```bash
php -S localhost:8000
```

**Acceder:** http://localhost:8000

### Opción 2: GitHub Pages (Gratuito)

1. **Subir archivos a GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: Grano Dorado website"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/granodorado.git
git push -u origin main
```

2. **Habilitar GitHub Pages:**
   - Ve a Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Save

**URL:** https://TU-USUARIO.github.io/granodorado

### Opción 3: Netlify (Gratuito)

1. **Arrastra la carpeta** completa a [netlify.com/drop](https://app.netlify.com/drop)
2. **O conecta con Git:**
   - New site from Git
   - Selecciona tu repositorio
   - Build settings: (dejar en blanco)
   - Deploy

**Funciones adicionales:**
- Formularios funcionales
- SSL automático
- CDN global

### Opción 4: Vercel (Gratuito)

1. **Instalar Vercel CLI:**
```bash
npm i -g vercel
```

2. **Desplegar:**
```bash
vercel
```

3. **O desde la web:**
   - Conecta tu repositorio en [vercel.com](https://vercel.com)

### Opción 5: Hosting Tradicional

1. **Comprimir archivos:**
```bash
zip -r granodorado.zip * 
```

2. **Subir via FTP/cPanel:**
   - Extraer en la carpeta `public_html`
   - Verificar permisos (644 para archivos, 755 para carpetas)

## 🔧 Configuraciones Opcionales

### Dominio Personalizado

1. **Configurar DNS:**
```
Tipo: CNAME
Nombre: www
Valor: tu-sitio.netlify.app
```

2. **Redirección:**
```
Tipo: A
Nombre: @
Valor: IP-del-hosting
```

### SSL/HTTPS
- **GitHub Pages:** Automático
- **Netlify:** Automático
- **Hosting tradicional:** Let's Encrypt

### Google Analytics (Opcional)

Agregar antes de `</head>` en `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Meta Tags para Redes Sociales

Agregar en `<head>`:
```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://granodorado.com/">
<meta property="og:title" content="Grano Dorado - Conecta con el mejor café">
<meta property="og:description" content="Café de alta calidad, comercio justo y sostenible desde 1985">
<meta property="og:image" content="https://granodorado.com/images/og-image.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://granodorado.com/">
<meta property="twitter:title" content="Grano Dorado - Conecta con el mejor café">
<meta property="twitter:description" content="Café de alta calidad, comercio justo y sostenible desde 1985">
<meta property="twitter:image" content="https://granodorado.com/images/og-image.jpg">
```

## 🚀 Optimizaciones de Rendimiento

### Comprimir Imágenes
```bash
# Con ImageOptim (Mac) o TinyPNG (Web)
# Reducir tamaño sin perder calidad
```

### Minificar CSS y JS (Opcional)
```bash
# CSS
npx clean-css-cli css/styles.css -o css/styles.min.css

# JavaScript
npx terser js/main.js -o js/main.min.js
```

### Service Worker (PWA)
Crear `sw.js` en la raíz:
```javascript
const CACHE_NAME = 'grano-dorado-v1';
const urlsToCache = [
  '/',
  '/css/styles.css',
  '/js/main.js',
  '/images/'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

## 📊 Monitoreo y Análisis

### Google PageSpeed Insights
- URL: https://pagespeed.web.dev/
- Verificar rendimiento móvil y desktop

### Google Search Console
- Verificar indexación
- Monitorear errores
- Ver consultas de búsqueda

### Herramientas de Desarrollo
- **Lighthouse:** Auditoría completa
- **Network Tab:** Revisar tiempos de carga
- **Console:** Verificar errores JavaScript

## 🐛 Solución de Problemas Comunes

### Problema: Fuentes no cargan
```css
/* Agregar fallback en CSS */
font-family: 'Inter', Arial, sans-serif;
```

### Problema: Iconos no aparecen
```html
<!-- Verificar CDN de Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```

### Problema: JavaScript no funciona
```javascript
// Verificar console.log en navegador
console.log('JavaScript cargado correctamente');
```

### Problema: Responsive no funciona
```html
<!-- Verificar viewport meta tag -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 📞 Soporte Post-Despliegue

### Lista de Verificación Final:
- [ ] Página carga correctamente
- [ ] Navegación funciona
- [ ] Formulario envía (si conectado)
- [ ] Responsive en móviles
- [ ] Modo oscuro funciona
- [ ] Animaciones suaves
- [ ] SEO optimizado
- [ ] Velocidad aceptable (< 3s)

### Mantenimiento:
- Actualizar contenido regularmente
- Revisar enlaces rotos
- Monitorear rendimiento
- Backup periódicos

---

**¡Tu página web está lista para conquistar el mundo del café! ☕🚀**