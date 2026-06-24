# BF-Copilot-Agent-Training

Este repositorio contiene una aplicación web completa con autenticación JWT, compuesta por un backend FastAPI y un frontend React.

## Estructura del Proyecto

```
BF-Copilot-Agent-Training/
├── backend/              # API Backend con FastAPI
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py      # Aplicación principal con endpoints
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── pyproject.toml
│   └── README.md        # Documentación del backend
│
└── frontend/            # Aplicación React
    ├── src/
    │   ├── components/  # Componentes reutilizables
    │   ├── context/     # Contextos de React
    │   ├── pages/       # Páginas de la aplicación
    │   ├── services/    # Servicios para API
    │   └── App.jsx      # Componente principal
    ├── package.json
    └── README.md        # Documentación del frontend
```

## Características

### Backend
- 🔐 Autenticación JWT con tokens de 300 segundos de expiración
- 🔄 Endpoint de refresh de tokens
- 🔒 Hashing de contraseñas con bcrypt
- 🐳 Soporte completo para Docker y Docker Compose
- 📦 Gestión de dependencias con Poetry
- 🌐 CORS habilitado para desarrollo frontend

### Frontend
- ⚛️ React 18 con Vite
- 🎨 Material-UI para diseño moderno
- 🛡️ Rutas protegidas con autenticación
- 💾 Gestión de sesión con localStorage
- 📱 Diseño responsive
- 🔄 Integración completa con API del backend

## Inicio Rápido

### Prerrequisitos

- **Backend**: Python 3.9+, Docker (opcional), Poetry
- **Frontend**: Node.js 18+, npm

### 1. Iniciar el Backend

#### Opción A: Con Docker (Recomendado)

```bash
cd backend
docker-compose up --build
```

#### Opción B: Local con Poetry

```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload
```

El backend estará disponible en: `http://localhost:8000`

Documentación API (Swagger): `http://localhost:8000/docs`

### 2. Iniciar el Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## Credenciales de Prueba

- **Usuario**: `admin`
- **Contraseña**: `admin123`

## Uso de la Aplicación

### Flujo de Autenticación

1. **Acceder al Frontend**
   - Abrir `http://localhost:5173` en el navegador
   - Se mostrará la página de login

2. **Iniciar Sesión**
   - Ingresar usuario: `admin`
   - Ingresar contraseña: `admin123`
   - Hacer clic en "Iniciar Sesión"

3. **Página de Bienvenida**
   - Después del login exitoso, serás redirigido a `/welcome`
   - Se mostrará un mensaje de bienvenida con tu nombre de usuario
   - Los datos se obtienen del endpoint protegido del backend

4. **Cerrar Sesión**
   - Hacer clic en el botón "Cerrar Sesión"
   - El token se eliminará y volverás a la página de login

### Protección de Rutas

- La página `/welcome` está protegida
- No se puede acceder sin iniciar sesión
- El intento de acceso directo redirige al login
- El token se guarda en localStorage
- El token expira después de 5 minutos

## API Endpoints

### POST /token
Login y obtención de token JWT

**Request:**
```bash
curl -X POST http://localhost:8000/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&******"
```

**Response:**
```json
{
  "access_token": "******",
  "token_type": "bearer",
  "expires_in": 300
}
```

### GET /protected
Obtener datos protegidos (requiere token)

**Request:**
```bash
curl -X GET http://localhost:8000/protected \
  -H "Authorization: ******"
```

**Response:**
```json
{
  "message": "Hello admin! This is a protected route.",
  "user": "admin"
}
```

### POST /refresh
Refrescar token JWT (requiere token válido)

**Request:**
```bash
curl -X POST http://localhost:8000/refresh \
  -H "Authorization: ******"
```

## Desarrollo

### Backend

Ver [backend/README.md](backend/README.md) para:
- Instalación detallada
- Configuración de variables de entorno
- Estructura del código
- Endpoints completos
- Solución de problemas

### Frontend

Ver [frontend/README.md](frontend/README.md) para:
- Configuración de la aplicación
- Estructura de componentes
- Personalización del tema
- Configuración de la API
- Solución de problemas

## Tecnologías

### Backend
- FastAPI
- Python 3.11
- JWT (python-jose)
- Bcrypt (passlib)
- Uvicorn
- Docker

### Frontend
- React 19
- Vite
- React Router
- Material-UI (MUI)
- JavaScript ES6+

## Scripts Disponibles

### Backend
```bash
# Ejecutar con Poetry
poetry run uvicorn app.main:app --reload

# Ejecutar con Docker
docker-compose up --build

# Detener Docker
docker-compose down
```

### Frontend
```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Previsualizar build
npm run preview

# Linter
npm run lint
```

## Seguridad

- Las contraseñas se hashean con bcrypt
- Los tokens JWT expiran en 5 minutos
- CORS configurado para orígenes específicos
- Las contraseñas nunca se almacenan en el frontend
- Los tokens se guardan en localStorage (considerar httpOnly cookies para producción)

## Solución de Problemas

### Backend no se conecta

1. Verificar que el puerto 8000 esté disponible
2. Revisar los logs: `docker logs jwt-backend`
3. Verificar variables de entorno

### Frontend no puede conectarse al backend

1. Verificar que el backend esté ejecutándose en `http://localhost:8000`
2. Verificar la configuración de CORS en `backend/app/main.py`
3. Revisar la URL de la API en `frontend/src/services/authService.js`

### Error de autenticación

1. Verificar las credenciales: `admin` / `admin123`
2. Verificar que el token no haya expirado (5 minutos)
3. Limpiar localStorage y volver a iniciar sesión

## Próximas Mejoras

- [ ] Implementar refresh token automático
- [ ] Agregar registro de usuarios
- [ ] Implementar recuperación de contraseña
- [ ] Agregar tests unitarios y de integración
- [ ] Migrar tokens a httpOnly cookies
- [ ] Agregar rate limiting
- [ ] Implementar logs de auditoría

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Soporte

Para más información, consulta:
- [Documentación del Backend](backend/README.md)
- [Documentación del Frontend](frontend/README.md)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
