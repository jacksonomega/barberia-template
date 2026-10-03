/**
 * =====================================================================
 * CONFIGURACIÓN CENTRAL DE MOCK DATA
 * =====================================================================
 *
 * Para alternar entre datos falsos y datos reales:
 *
 * 1. Desde este archivo:
 *    - Cambia DEFAULT_MOCK_MODE = false para usar Quarter Barber (Real).
 *    - Cambia DEFAULT_MOCK_MODE = true  para usar Apex Barber Studio (Falso/Testing).
 *
 * 2. En tiempo de ejecución (Testing rápido):
 *    - Usa el widget selector flotante en la esquina inferior izquierda.
 *    - O agrega el parámetro ?mock=true o ?mock=false en la URL del navegador.
 *
 * 3. Para ocultar el widget selector de testing:
 *    - Cambia ENABLE_DEV_SWITCHER = false.
 */

export const DEFAULT_MOCK_MODE = true;
export const ENABLE_DEV_SWITCHER = false;
