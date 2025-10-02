# 🚀 Guía de Despliegue - Portillos Restaurante

## 📋 **Preparación para Despliegue**

### **Requisitos del Servidor**
- **Servidor Web:** Apache, Nginx, o cualquier servidor HTTP
- **Espacio en Disco:** Mínimo 100MB
- **Ancho de Banda:** Suficiente para tráfico web estático
- **SSL Certificate:** Recomendado para seguridad

### **Archivos Necesarios**
```
portillosrestaurant/
├── index.html
├── menu.html
├── contacto.html
├── ordenar.html
├── galeria.html
├── nosotros.html
├── catering.html
├── legal.html
├── sitemap.xml
├── robots.txt
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── images/
└── README.md
```

## 🌐 **Opciones de Hosting**

### **1. Hosting Compartido (Recomendado para Inicio)**
**Proveedores Sugeridos:**
- **Hostinger** - Económico y fácil de usar
- **SiteGround** - Excelente soporte técnico
- **Bluehost** - Popular y confiable

**Pasos:**
1. Comprar plan de hosting
2. Configurar dominio (portillosrestaurante.com)
3. Subir archivos vía FTP/cPanel
4. Configurar SSL gratuito

### **2. Hosting en la Nube**
**Opciones:**
- **Netlify** - Gratuito para sitios estáticos
- **Vercel** - Excelente para proyectos web
- **GitHub Pages** - Gratuito con dominio personalizado

### **3. Servidor Dedicado**
**Para sitios con alto tráfico:**
- **AWS S3 + CloudFront**
- **Google Cloud Storage**
- **DigitalOcean Droplet**

## 📤 **Proceso de Despliegue**

### **Método 1: FTP/cPanel (Hosting Compartido)**

1. **Acceder al Panel de Control**
   - Login en cPanel del hosting
   - Ir a "File Manager"

2. **Subir Archivos**
   - Navegar a carpeta `public_html`
   - Subir todos los archivos HTML
   - Subir carpeta `assets` completa
   - Subir `sitemap.xml` y `robots.txt`

3. **Verificar Estructura**
   ```
   public_html/
   ├── index.html
   ├── menu.html
   ├── contacto.html
   ├── ordenar.html
   ├── galeria.html
   ├── nosotros.html
   ├── catering.html
   ├── legal.html
   ├── sitemap.xml
   ├── robots.txt
   └── assets/
       ├── css/style.css
       ├── js/main.js
       └── images/
   ```

### **Método 2: Netlify (Gratuito)**

1. **Crear Cuenta en Netlify**
   - Ir a netlify.com
   - Registrarse con email

2. **Conectar con GitHub**
   - Conectar repositorio de GitHub
   - Configurar build settings

3. **Configurar Dominio**
   - Agregar dominio personalizado
   - Configurar DNS

### **Método 3: GitHub Pages**

1. **Configurar Repositorio**
   - Hacer repositorio público
   - Ir a Settings > Pages
   - Seleccionar branch `main`

2. **Dominio Personalizado**
   - Agregar archivo `CNAME` con dominio
   - Configurar DNS en proveedor de dominio

## 🔧 **Configuración Post-Despliegue**

### **1. Configurar Dominio**
```
DNS Records:
- A Record: @ → IP del servidor
- CNAME: www → portillosrestaurante.com
- MX Record: Para email (opcional)
```

### **2. Configurar SSL**
- **Let's Encrypt** (Gratuito)
- **Certificado del Hosting** (Incluido)
- **Cloudflare** (Gratuito + CDN)

### **3. Verificar Google Analytics**
- Confirmar que G-8NG2S1GG4G esté funcionando
- Probar eventos de WhatsApp
- Verificar tracking de páginas

### **4. Configurar Email Profesional**
```
Opciones:
- Google Workspace ($6/mes)
- Microsoft 365 ($5/mes)
- Zoho Mail (Gratuito)
- Email del hosting (Incluido)
```

## 🧪 **Testing Post-Despliegue**

### **Checklist de Verificación**

#### **Funcionalidad Básica**
- [ ] Todas las páginas cargan correctamente
- [ ] Navegación entre páginas funciona
- [ ] Enlaces de WhatsApp abren correctamente
- [ ] Formularios funcionan (si aplica)
- [ ] Google Maps se carga

#### **Responsive Design**
- [ ] Sitio se ve bien en móviles
- [ ] Menú hamburguesa funciona
- [ ] Botones son fáciles de tocar
- [ ] Texto es legible en pantallas pequeñas

#### **Performance**
- [ ] Páginas cargan rápido (<3 segundos)
- [ ] Imágenes se optimizan automáticamente
- [ ] CSS y JS se cargan correctamente
- [ ] No hay errores en consola

#### **SEO**
- [ ] Meta tags aparecen en búsquedas
- [ ] Sitemap.xml es accesible
- [ ] Robots.txt funciona
- [ ] Google Analytics tracking activo

## 🔍 **Monitoreo y Mantenimiento**

### **Herramientas de Monitoreo**

#### **Google Analytics**
- Configurar objetivos de conversión
- Monitorear tráfico de WhatsApp
- Analizar páginas más visitadas
- Revisar datos semanalmente

#### **Google Search Console**
- Verificar indexación de páginas
- Monitorear errores de crawling
- Revisar palabras clave
- Optimizar para búsquedas locales

#### **Uptime Monitoring**
- **UptimeRobot** (Gratuito)
- **Pingdom** (Freemium)
- **StatusCake** (Gratuito)

### **Mantenimiento Regular**

#### **Semanal**
- [ ] Verificar que el sitio esté funcionando
- [ ] Revisar Google Analytics
- [ ] Probar enlaces de WhatsApp
- [ ] Verificar velocidad de carga

#### **Mensual**
- [ ] Actualizar precios del menú
- [ ] Revisar información de contacto
- [ ] Actualizar imágenes de galería
- [ ] Backup completo del sitio

#### **Trimestral**
- [ ] Revisar y actualizar SEO
- [ ] Analizar competencia
- [ ] Actualizar contenido
- [ ] Revisar seguridad

## 🚨 **Solución de Problemas**

### **Problemas Comunes**

#### **Página No Carga**
1. Verificar que archivos estén en carpeta correcta
2. Revisar permisos de archivos (644 para archivos, 755 para carpetas)
3. Verificar configuración del servidor web
4. Revisar logs de error

#### **WhatsApp No Funciona**
1. Verificar formato de número (+529981668821)
2. Probar enlace en navegador
3. Verificar que WhatsApp esté instalado
4. Revisar mensaje pre-llenado

#### **Google Analytics No Tracking**
1. Verificar ID de tracking (G-8NG2S1GG4G)
2. Revisar que código esté en todas las páginas
3. Probar con Google Tag Assistant
4. Verificar que no haya bloqueadores de ads

#### **Imágenes No Cargan**
1. Verificar rutas de imágenes
2. Revisar permisos de archivos
3. Optimizar tamaño de imágenes
4. Verificar formato (JPG, PNG, WebP)

### **Contacto de Soporte**

**Para problemas técnicos:**
- **Email:** contacto@portillosrestaurante.com
- **WhatsApp:** 998 166 88 21

**Recursos Adicionales:**
- Documentación del hosting
- Foros de soporte técnico
- Comunidad de desarrolladores web

## 📊 **Métricas de Éxito**

### **KPIs a Monitorear**
- **Tráfico Web:** Visitas únicas mensuales
- **Conversiones:** Clics en WhatsApp
- **Tiempo en Sitio:** Engagement del usuario
- **Páginas por Sesión:** Navegación del sitio
- **Tasa de Rebote:** Calidad del contenido

### **Objetivos Sugeridos**
- **Visitas Mensuales:** 1,000+ visitantes únicos
- **Conversión WhatsApp:** 5%+ de visitantes hacen clic
- **Tiempo Promedio:** 2+ minutos en el sitio
- **Páginas por Sesión:** 3+ páginas por visita
- **Tasa de Rebote:** <70%

---

**¡El sitio web de Portillos Restaurante está listo para conquistar Cancún! 🌮🦐**
