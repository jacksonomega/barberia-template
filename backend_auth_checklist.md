# 🔐 Backend – Checklist de Autenticación (Gold Standard)

> Implementación segura con **Access Token en memoria** + **Refresh Token en HttpOnly Cookie**

---

## Flujo general

```
[Login] → Access Token (JSON body) + Refresh Token (HttpOnly Cookie)
[Cada request] → Authorization: Bearer <access_token>
[Access token expirado] → POST /auth/refresh → nuevo Access Token
[Logout] → invalidar Refresh Token + limpiar cookie
```

---

## 1. Endpoint: `POST /api/auth/login`

**Ya existe.** Solo necesita modificaciones:

- [ ] Además de devolver `access_token` en el **JSON body**, establecer una **cookie HttpOnly** con el refresh token
- [ ] La cookie debe tener las siguientes flags:

```http
Set-Cookie: refresh_token=<valor>; HttpOnly; Secure; SameSite=Strict; Path=/api/auth/refresh; Max-Age=604800
```

| Flag | Descripción |
|---|---|
| `HttpOnly` | JavaScript **no puede leerla** → inmune a XSS |
| `Secure` | Solo se envía por **HTTPS** |
| `SameSite=Strict` | Protección contra **CSRF** |
| `Path=/api/auth/refresh` | La cookie **solo se envía** a ese endpoint, no a toda la API |
| `Max-Age=604800` | Expira en **7 días** (ajustable) |

- [ ] El **access token** debe tener una vida corta: **15–60 minutos** (actualmente puede ser indefinido)
- [ ] El **refresh token** debe tener vida larga: **7–30 días**

---

## 2. Endpoint: `POST /api/auth/refresh` ← **NUEVO**

El frontend lo llamará automáticamente cuando el access token expire.

**Request:**
```http
POST /api/auth/refresh
Cookie: refresh_token=<valor>   ← enviado automáticamente por el navegador
```

**Response exitosa (`200 OK`):**
```json
{
  "access_token": "eyJhbGci..."
}
```
Y opcionalmente rotación: establecer una **nueva cookie** con un refresh token renovado (Token Rotation).

**Response fallida (`401 Unauthorized`):**
```json
{
  "detail": "Refresh token inválido o expirado"
}
```
→ El frontend redirigirá al login.

- [ ] Validar que el refresh token existe en base de datos (no solo verificar firma JWT)
- [ ] Implementar **Token Rotation**: al usar un refresh token, invalidarlo y emitir uno nuevo
- [ ] Si se detecta reutilización de un token ya invalidado → **invalidar toda la familia** de tokens del usuario (indica posible robo)

---

## 3. Endpoint: `POST /api/auth/logout` ← **NUEVO (o modificar existente)**

**Request:**
```http
POST /api/auth/logout
Cookie: refresh_token=<valor>
Authorization: Bearer <access_token>
```

**Comportamiento requerido:**
- [ ] Invalidar / eliminar el refresh token de la base de datos
- [ ] Limpiar la cookie del navegador:
  ```http
  Set-Cookie: refresh_token=; HttpOnly; Secure; SameSite=Strict; Path=/api/auth/refresh; Max-Age=0
  ```
- [ ] Opcionalmente: añadir el access token a una **blocklist** hasta que expire (para invalidación inmediata)

**Response (`200 OK`):**
```json
{
  "message": "Sesión cerrada correctamente"
}
```

---

## 4. Almacenamiento de Refresh Tokens en base de datos

- [ ] Crear una tabla/colección `refresh_tokens` con:

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID | Identificador único del token |
| `user_id` | FK | Usuario al que pertenece |
| `token_hash` | string | Hash SHA-256 del token (no guardar en texto plano) |
| `expires_at` | datetime | Cuándo expira |
| `revoked` | boolean | Si fue invalidado |
| `created_at` | datetime | Cuándo se emitió |
| `user_agent` | string | (Opcional) dispositivo/navegador |
| `ip_address` | string | (Opcional) IP de origen |

- [ ] Al hacer refresh, buscar el token por hash y verificar que `revoked = false` y `expires_at > now()`
- [ ] Tarea de limpieza periódica para eliminar tokens expirados

---

## 5. Configuración CORS ← **CRÍTICO**

Para que el navegador envíe las cookies cross-origin, el backend **debe**:

- [ ] Configurar `Access-Control-Allow-Origin` con el **dominio exacto** del frontend (no `*`)
  ```
  Access-Control-Allow-Origin: https://admin.omega-studio.tech
  ```
- [ ] Habilitar `Access-Control-Allow-Credentials: true`

> ⚠️ **Sin esta configuración**, el navegador nunca enviará las cookies automáticamente y el refresh no funcionará.

---

## 6. Headers de seguridad adicionales (recomendados)

- [ ] `Content-Security-Policy` para mitigar XSS a nivel de respuesta
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY`
- [ ] Rate limiting en `/api/auth/login` y `/api/auth/refresh` para prevenir brute force

---

## Resumen de cambios por endpoint

| Endpoint | Estado | Cambio |
|---|---|---|
| `POST /api/auth/login` | Existe | Añadir `Set-Cookie` con refresh token, acortar vida del access token |
| `POST /api/auth/refresh` | **Nuevo** | Validar cookie, devolver nuevo access token |
| `POST /api/auth/logout` | **Nuevo** | Invalidar refresh token en BD, limpiar cookie |
| Configuración CORS | Modificar | Añadir `Allow-Credentials: true` + origen específico |
| Base de datos | **Nuevo** | Tabla `refresh_tokens` |
