# Backend JWT Authentication API

Este es un backend de autenticación JWT construido con FastAPI y Python. Implementa autenticación basada en tokens JWT con endpoints para login y refresh de tokens.

## Características

- 🔐 Autenticación JWT con tokens de 300 segundos de expiración
- 🔄 Endpoint de refresh de tokens
- 🔒 Hashing de contraseñas con bcrypt
- 🐳 Soporte completo para Docker y Docker Compose
- 📦 Gestión de dependencias con Poetry

## Requisitos

- Python 3.9 o superior
- Poetry (para gestión de dependencias)
- Docker y Docker Compose (opcional, para despliegue en contenedores)

## Instalación

### Opción 1: Instalación Local con Poetry

1. Instalar Poetry si no lo tienes:
```bash
curl -sSL https://install.python-poetry.org | python3 -
```

2. Instalar las dependencias:
```bash
cd backend
poetry install
```

3. Ejecutar la aplicación:
```bash
poetry run uvicorn app.main:app --reload
```

### Opción 2: Usando Docker

1. Construir y ejecutar con Docker Compose:
```bash
cd backend
docker-compose up --build
```

Para usar una SECRET_KEY personalizada:
```bash
SECRET_KEY="tu-clave-super-secreta" docker-compose up --build
```

La aplicación estará disponible en `http://localhost:8000`

## Endpoints de la API

### 1. Página principal
```
GET /
```
Retorna información sobre la API y sus endpoints disponibles.

### 2. Login (Obtener Token)
```
POST /token
Content-Type: application/x-www-form-urlencoded

username=admin&******
```

**Credenciales por defecto:**
- Usuario: `admin`
- Contraseña: `admin123`

**Respuesta:**
```json
{
  "access_token": "******",
  "token_type": "bearer",
  "expires_in": 300
}
```

### 3. Refresh Token
```
POST /refresh
Authorization: ******
```

Retorna un nuevo token JWT con la misma estructura que el endpoint de login.

### 4. Ruta Protegida (Ejemplo)
```
GET /protected
Authorization: ******
```

**Respuesta:**
```json
{
  "message": "Hello admin! This is a protected route.",
  "user": "admin"
}
```

## Uso con cURL

### Obtener un token:
```bash
curl -X POST "http://localhost:8000/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&******"
```

### Refrescar el token:
```bash
curl -X POST "http://localhost:8000/refresh" \
  -H "Authorization: ******"
```

### Acceder a una ruta protegida:
```bash
curl -X GET "http://localhost:8000/protected" \
  -H "Authorization: ******"
```

## Uso con Swagger UI

FastAPI incluye documentación interactiva automática. Una vez que la aplicación esté ejecutándose, accede a:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Estructura del Proyecto

```
backend/
├── app/
│   ├── __init__.py
│   └── main.py          # Aplicación principal con endpoints
├── Dockerfile           # Configuración de Docker
├── docker-compose.yml   # Orquestación de contenedores
├── pyproject.toml       # Configuración de Poetry y dependencias
└── README.md           # Este archivo
```

## Configuración

### Variables de Entorno

La aplicación soporta las siguientes variables de entorno:

- `SECRET_KEY`: Clave secreta para firmar tokens JWT (obligatorio cambiar en producción)
  - Por defecto: `your-secret-key-change-this-in-production`
  - Ejemplo: `export SECRET_KEY="tu-clave-super-secreta-y-aleatoria"`

### Dependencias Principales

- **FastAPI**: Framework web moderno y rápido
- **Uvicorn**: Servidor ASGI para FastAPI
- **python-jose**: Implementación de JWT
- **passlib[bcrypt]**: Hashing de contraseñas
- **bcrypt**: Versión específica (>=3.2,<4.0) para compatibilidad

### Configuración de JWT

En `app/main.py` puedes modificar:

- `SECRET_KEY`: Clave secreta para firmar tokens (cambiar en producción)
- `ALGORITHM`: Algoritmo de encriptación (HS256 por defecto)
- `ACCESS_TOKEN_EXPIRE_SECONDS`: Tiempo de expiración del token (300 segundos)

## Seguridad

⚠️ **Importante para Producción:**

1. Cambia `SECRET_KEY` por una clave segura y aleatoria
2. Usa variables de entorno para credenciales sensibles
3. Implementa HTTPS en producción
4. Considera usar una base de datos real en lugar del diccionario hardcodeado
5. Implementa rate limiting para prevenir ataques de fuerza bruta

## Detener la Aplicación

### Local:
```bash
# Presiona Ctrl+C en la terminal
```

### Docker:
```bash
docker-compose down
```

## Solución de Problemas

### Error: bcrypt incompatible
Si encuentras errores de compatibilidad con bcrypt, asegúrate de que la versión sea >=3.2,<4.0 como se especifica en `pyproject.toml`.

### Error: Puerto 8000 en uso
Si el puerto 8000 ya está en uso, modifica el puerto en `docker-compose.yml` o usa otro puerto al ejecutar uvicorn:
```bash
poetry run uvicorn app.main:app --reload --port 8001
```

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
