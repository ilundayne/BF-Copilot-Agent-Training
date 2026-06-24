# Frontend - Aplicación Web de Autenticación JWT

Esta es una aplicación web frontend construida con React y Material-UI que se integra con el backend de autenticación JWT. La aplicación implementa un sistema de login seguro con gestión de sesiones basada en tokens JWT.

## Características

- 🔐 Sistema de autenticación con JWT
- 🎨 Interfaz moderna con Material-UI
- 🛡️ Rutas protegidas que requieren autenticación
- 💾 Gestión de sesión con localStorage
- 📱 Diseño responsive
- ⚡ Desarrollada con Vite para mejor rendimiento

## Tecnologías Utilizadas

- **React 19**: Biblioteca principal para la UI
- **Vite**: Build tool y dev server
- **React Router**: Navegación entre páginas
- **Material-UI (MUI)**: Framework de diseño
- **localStorage**: Almacenamiento del token JWT

## Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- Backend ejecutándose en `http://localhost:8000`

## Instalación

1. Navegar a la carpeta del frontend:
```bash
cd frontend
```

2. Instalar las dependencias:
```bash
npm install
```

## Ejecución

### Modo Desarrollo

Ejecutar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Modo Producción

1. Construir la aplicación:
```bash
npm run build
```

2. Previsualizar la build:
```bash
npm run preview
```

## Estructura del Proyecto

```
frontend/
├── public/              # Archivos públicos estáticos
├── src/
│   ├── components/      # Componentes reutilizables
│   │   └── ProtectedRoute.jsx  # Componente para proteger rutas
│   ├── context/         # Contextos de React
│   │   └── AuthContext.jsx     # Contexto de autenticación
│   ├── pages/           # Páginas de la aplicación
│   │   ├── Login.jsx           # Página de inicio de sesión
│   │   └── Welcome.jsx         # Página de bienvenida (protegida)
│   ├── services/        # Servicios para API
│   │   └── authService.js      # Servicio de autenticación
│   ├── App.jsx          # Componente principal con rutas
│   └── main.jsx         # Punto de entrada
├── package.json         # Dependencias y scripts
└── vite.config.js       # Configuración de Vite
```

## Uso de la Aplicación

### 1. Inicio de Sesión

1. Acceder a `http://localhost:5173`
2. Ingresar las credenciales:
   - **Usuario**: `admin`
   - **Contraseña**: `admin123`
3. Hacer clic en "Iniciar Sesión"

### 2. Página de Bienvenida

Después de iniciar sesión correctamente:
- Serás redirigido a `/welcome`
- Verás un mensaje de bienvenida personalizado
- Puedes cerrar sesión haciendo clic en "Cerrar Sesión"

### 3. Protección de Rutas

- No puedes acceder a `/welcome` sin iniciar sesión
- Si intentas acceder directamente, serás redirigido al login
- El token se guarda en localStorage y persiste entre recargas
- El token expira después de 300 segundos (5 minutos)

## Funcionalidades

### Autenticación

- **Login**: Envía credenciales al backend y recibe un token JWT
- **Gestión de Token**: Guarda el token en localStorage
- **Logout**: Elimina el token y redirige al login
- **Validación**: Verifica el token antes de permitir acceso a rutas protegidas

### Componentes Principales

#### AuthContext
Proporciona el estado de autenticación a toda la aplicación:
- `user`: Usuario actual autenticado
- `login(username, password)`: Función para iniciar sesión
- `logout()`: Función para cerrar sesión
- `loading`: Estado de carga de autenticación

#### ProtectedRoute
Componente que envuelve rutas protegidas:
- Verifica si el usuario está autenticado
- Redirige al login si no hay sesión activa
- Muestra un loader mientras verifica la autenticación

#### Login Page
Página de inicio de sesión:
- Formulario con validación
- Manejo de errores
- Indicador de carga
- Mensajes informativos

#### Welcome Page
Página protegida de bienvenida:
- Obtiene datos del endpoint protegido del backend
- Muestra información del usuario
- Botón para cerrar sesión

## API Endpoints Utilizados

### POST /token
Login y obtención de token JWT
```javascript
{
  username: "admin",
  password: "admin123"
}
```

Respuesta:
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "expires_in": 300
}
```

### GET /protected
Obtener datos protegidos (requiere token)
```
Authorization: ******
```

Respuesta:
```json
{
  "message": "Hello admin! This is a protected route.",
  "user": "admin"
}
```

## Configuración

### Cambiar la URL del Backend

Editar el archivo `src/services/authService.js`:
```javascript
const API_BASE_URL = 'http://localhost:8000'; // Cambiar aquí
```

### Personalizar el Tema

Editar el archivo `src/App.jsx`:
```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Color principal
    },
    secondary: {
      main: '#dc004e', // Color secundario
    },
  },
});
```

## Solución de Problemas

### Error: "Network request failed"
- Verificar que el backend esté ejecutándose en `http://localhost:8000`
- Verificar que CORS esté habilitado en el backend

### Error: "Incorrect username or password"
- Verificar las credenciales: `admin` / `admin123`
- Verificar que el backend tenga el usuario configurado

### La sesión no persiste
- Verificar que localStorage esté habilitado en el navegador
- Verificar que no estés en modo incógnito/privado

### Token expirado
- El token expira después de 5 minutos
- Cerrar sesión y volver a iniciar sesión para obtener un nuevo token

## Scripts Disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo
npm run build    # Construir para producción
npm run preview  # Previsualizar build de producción
npm run lint     # Ejecutar linter
```

## Seguridad

- Los tokens JWT se almacenan en localStorage
- Las contraseñas nunca se almacenan en el frontend
- Las rutas protegidas verifican la autenticación antes de renderizar
- Los tokens tienen un tiempo de expiración de 5 minutos
- CORS está configurado para permitir solo orígenes específicos

## Próximas Mejoras

- [ ] Implementar refresh token automático
- [ ] Agregar "Recordarme" con almacenamiento persistente
- [ ] Agregar página de registro de usuarios
- [ ] Implementar recuperación de contraseña
- [ ] Agregar tests unitarios y de integración

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
