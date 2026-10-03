# Sistema de Mock Data para Testing (Barbería Ficticia)

Este directorio contiene un sistema de datos de prueba (Mock Data) desacoplado del negocio real. Permite realizar pruebas, demos y desarrollos sin exponer ni depender de los datos reales de **Quarter Barber**, usando en su lugar una barbería ficticia: **Apex Barber Studio**.

---

## 🚀 Cómo cambiar entre Datos Falsos y Datos Reales

Tienes 3 formas sencillas de alternar entre los modos:

### Opción 1: Selector Flotante en Pantalla (Recomendado para testing interactivo)
En la esquina inferior izquierda de la pantalla verás una píldora flotante:
- **`🧪 Mock Data`**: Indica que estás viendo datos falsos (**Apex Barber Studio**).
- **`💈 Real Data`**: Indica que estás viendo los datos reales (**Quarter Barber**).
Haz clic sobre ella para desplegar el panel y cambiar de modo con un solo clic. El cambio es instantáneo y se guarda en tu navegador.

### Opción 2: Mediante la URL del navegador
Puedes forzar el modo agregando el parámetro `?mock=true` o `?mock=false` en la barra de direcciones:
- `http://localhost:4200/?mock=true`  👉 Carga datos falsos (Apex Barber)
- `http://localhost:4200/?mock=false` 👉 Carga datos reales (Quarter Barber)

### Opción 3: Configuración en código (`mock.config.ts`)
En el archivo `src/app/mock/mock.config.ts`:
```typescript
// Cambia a true para iniciar por defecto con datos falsos (Apex Barber)
// Cambia a false para iniciar por defecto con datos reales (Quarter Barber)
export const DEFAULT_MOCK_MODE = true;

// Ponlo en false si deseas ocultar el widget flotante de testing
export const ENABLE_DEV_SWITCHER = true;
```

---

## 🗑️ Cómo ELIMINAR el Mock Data en el futuro (Fácil y Rápido)

Si en el futuro ya no necesitas los datos de prueba y quieres dejar únicamente los datos reales de Quarter Barber de forma permanente:

### Paso 1: Configurar el servicio para usar solo datos reales
En `src/app/services/business-data.service.ts`:
- Cambia la señal `business` para devolver directamente `REAL_QUARTER_DATA`:
  ```typescript
  readonly business = signal(REAL_QUARTER_DATA).asReadonly();
  readonly isMock = signal(false).asReadonly();
  ```
- O simplemente cambia en `src/app/mock/mock.config.ts`:
  ```typescript
  export const DEFAULT_MOCK_MODE = false;
  export const ENABLE_DEV_SWITCHER = false;
  ```

### Paso 2 (Opcional - Limpieza total):
Si deseas eliminar los archivos por completo:
1. Elimina la carpeta `src/app/mock/fake-apex.data.ts` y el componente `dev-mode-switcher`.
2. Conserva `REAL_QUARTER_DATA` en el servicio o donde prefieras.
