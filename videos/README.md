# 🎬 Videos para Pantalla de Carga

## 📁 Archivos Necesarios

Coloca aquí tus videos de carga con estos nombres exactos:

### **Archivo Principal:**
- `coffee-loading.mp4` - Video principal en formato MP4
- `coffee-loading.webm` - Video alternativo en formato WebM (opcional pero recomendado)

## 🎯 Especificaciones Recomendadas

### **Duración:**
- Entre 2-5 segundos máximo
- Preferiblemente 3-4 segundos

### **Resolución:**
- **Full HD:** 1920x1080px (recomendado)
- **HD:** 1280x720px (mínimo)
- **4K:** 3840x2160px (si quieres máxima calidad)

### **Formato:**
- **MP4** (H.264) - Compatibilidad universal
- **WebM** (VP9) - Mejor compresión, opcional

### **Tamaño de Archivo:**
- Máximo 5MB para carga rápida
- Comprime el video para web

### **Características:**
- **Sin audio** (se reproduce en mute)
- **Loop:** Puede ser en loop o una sola reproducción
- **Relación de aspecto:** 16:9 preferiblemente

## 🎨 Ideas de Contenido

### **Opciones Creativas:**
1. **Granos cayendo** en slow motion
2. **Taza llenándose** con café
3. **Vapor subiendo** de una taza
4. **Granos tostándose** en una sartén
5. **Logo animado** con partículas de café
6. **Transición de grano a café** molido

### **Herramientas para Crear Videos:**
- **After Effects** - Profesional
- **Premiere Pro** - Edición avanzada
- **Canva** - Simple y online
- **Lottie** - Animaciones vectoriales
- **GIPHY** - GIFs convertidos a video

## 🔧 Cómo Optimizar el Video

### **Compresión:**
```bash
# Con FFmpeg (herramienta gratuita)
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset fast coffee-loading.mp4
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 coffee-loading.webm
```

### **Online:**
- **CloudConvert.com** - Conversor online
- **Compressor.io** - Compresor de video
- **TinyVid** - Reducir tamaño

## 🚀 Implementación Actual

El código ya está preparado para:
- ✅ **Autoplay** del video al cargar
- ✅ **Fallback** a animación CSS si falla
- ✅ **Progress bar** sincronizada
- ✅ **Responsive** en móviles
- ✅ **Error handling** completo

## 📱 Compatibilidad

- ✅ **Chrome/Safari/Firefox** - Soporte completo
- ✅ **Móviles** - Autoplay funciona
- ✅ **Conexión lenta** - Fallback automático
- ✅ **Sin video** - Animación CSS backup

¡Solo agrega tu video y funcionará automáticamente! 🎯