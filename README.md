# Grano Dorado - Sitio Web Corporativo

## Descripción
Sitio web corporativo para Grano Dorado, empresa de café de alta calidad con sede en Costa Rica.

## Características
- ✅ Diseño responsive
- ✅ Pantalla de carga con video
- ✅ Animaciones suaves
- ✅ Integración con WhatsApp
- ✅ Google Maps
- ✅ Optimizado para SEO

## Estructura del Proyecto
```
├── index.html              # Página principal
├── quienes-somos.html      # Información de la empresa
├── historia.html           # Historia de la empresa
├── ubicacion.html          # Ubicación y contacto
├── css/
│   └── styles.css          # Estilos principales
├── js/
│   ├── main.js             # JavaScript principal
│   ├── video-rapido.js     # Pantalla de carga
│   ├── animaciones-simples.js # Animaciones
│   └── coffee-recommender.js  # Recomendador de café
├── images/                 # Imágenes del sitio
├── videos/                 # Videos para la pantalla de carga
└── vercel.json            # Configuración de Vercel
```

## Desarrollo Local

### Opción 1: Servidor Python
```bash
cd GranoDorado
python -m http.server 8000
```
Luego acceder a: http://localhost:8000

### Opción 2: Servidor Node.js
```bash
cd GranoDorado
npx http-server -p 8000
```

### Opción 3: Live Server (VS Code)
Instalar la extensión "Live Server" y hacer clic derecho en `index.html` → "Open with Live Server"

## Deployment en Vercel

1. **Conectar repositorio:**
   - Ir a [vercel.com](https://vercel.com)
   - Conectar con GitHub
   - Seleccionar el repositorio GranoDorado

2. **Configuración automática:**
   - Vercel detectará automáticamente que es un sitio estático
   - El archivo `vercel.json` ya está configurado

3. **Variables de entorno** (si es necesario):
   - No se requieren para este proyecto

## Solución de Problemas

### Error ERR_CONNECTION_REFUSED
- **Causa:** No hay servidor ejecutándose
- **Solución:** Ejecutar uno de los comandos de servidor local

### F5 no funciona
- **Causa:** Rutas relativas o archivos faltantes
- **Solución:** Verificar que todos los archivos estén en su lugar y usar servidor local

### Vercel se queda estático
- **Causa:** Archivos JavaScript no cargan o errores en consola
- **Solución:** Verificar la consola del navegador y que todos los archivos JS existan

### Video no carga
- **Causa:** Archivo de video muy grande o formato no compatible
- **Solución:** El código maneja automáticamente errores de video

## Tecnologías Utilizadas
- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript
- Google Fonts
- Font Awesome
- Google Maps API

## Compatibilidad
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Dispositivos móviles

## Contacto
Para soporte técnico o consultas sobre el sitio web, contactar al equipo de desarrollo.