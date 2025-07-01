# Instrucciones de Deploy para Clinimetrix App

## ✅ Build Completado Exitosamente

La aplicación está lista para producción con todas las funcionalidades:
- BLS-23 (Lista de Síntomas de Trastorno Límite)
- Beck-21 (Inventario de Depresión de Beck)
- MOS Sleep (Escala de Sueño MOS)
- PHQ-9, GADI, HARS
- Sistema de alertas críticas
- Búsqueda de pacientes
- Iconos con fallbacks

## Opciones de Deploy

### 1. Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login a Vercel
vercel login

# Deploy
vercel

# Para producción
vercel --prod
```

### 2. Netlify
1. Conectar repositorio a Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18.x

### 3. Deploy en mindhub.cloud
Para tu dominio específico:

1. **Subir archivos al servidor:**
   - Subir toda la carpeta del proyecto
   - Asegurarse que Node.js 18+ esté instalado

2. **Configurar en el servidor:**
   ```bash
   cd /path/to/clinimetrix-app
   npm install
   npm run build
   npm run start
   ```

3. **Configurar Nginx/Apache:**
   ```nginx
   server {
       listen 80;
       server_name mindhub.cloud;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **PM2 para mantener la app corriendo:**
   ```bash
   npm install -g pm2
   pm2 start npm --name "clinimetrix" -- start
   pm2 save
   pm2 startup
   ```

### 4. Docker (Opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Variables de Entorno Requeridas
Crear archivo `.env.local`:
```
NEXT_PUBLIC_APP_URL=https://mindhub.cloud
NODE_ENV=production
```

## Verificación Post-Deploy
- ✅ Todas las escalas cargan correctamente
- ✅ Iconos funcionan o muestran fallbacks
- ✅ Búsqueda de pacientes funcional
- ✅ Resultados de escalas se muestran
- ✅ Alertas críticas funcionan
- ✅ Responsive design en móviles

## Contacto de Soporte
Email: soporte@mindhub.cloud