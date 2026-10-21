# Changelog

Todos los cambios importantes de este proyecto serán documentados en este archivo.

El formato sigue una estructura basada en versiones y categorías de cambios.

---

## [Unreleased]

### Added

- Espacio reservado para nuevas funcionalidades.

### Changed

- Espacio reservado para cambios en funcionalidades existentes.

### Fixed

- Espacio reservado para correcciones de errores.

### Removed

- Espacio reservado para funcionalidades retiradas.

### Security

- Espacio reservado para mejoras de seguridad y privacidad.

---

## [1.1.0] - 2026-10-21

### Added

- Lanzamiento inicial de **SatCore Solutions | Calculadora de precios**.
- Cálculo del costo unitario a partir de costos individuales, costos por lote y costos indirectos porcentuales.
- Tres métodos de cálculo: margen de ganancia deseado, markup sobre el costo y análisis de un precio de venta existente.
- Incorporación de comisiones porcentuales de pasarelas de pago en los cálculos correspondientes.
- Configuración del IVA, con una tasa inicial del 19 %.
- Redondeo del precio final hacia arriba a múltiplos de $100, $500 o $1.000.
- Análisis de rentabilidad con estimaciones de ganancia por unidad y por lote, margen real, markup real y precio mínimo para evitar pérdidas.
- Tabla comparativa de precios para márgenes del 10 % al 60 %.
- Gestión de productos guardados localmente, con opciones para consultarlos y eliminarlos.
- Función para copiar un resumen de los resultados calculados.
- Persistencia local de productos mediante `localStorage`, sin necesidad de una base de datos remota.
- Interfaz desarrollada con Next.js, React, TypeScript y CSS.
- Organización de la lógica de precios y el formateo de valores en módulos independientes.

### Changed

- No se registran cambios respecto a versiones anteriores, al tratarse del lanzamiento inicial.

### Fixed

- No se documentan correcciones específicas para esta versión inicial.

### Removed

- No aplica en el lanzamiento inicial.

### Security

- Documentación de las limitaciones del almacenamiento local mediante `localStorage`.
- Advertencia sobre la posible pérdida de productos al borrar los datos del navegador.
- Documentación de la ausencia de sincronización automática entre dispositivos.
- Recomendaciones para proteger los datos almacenados localmente y evitar guardar información confidencial innecesaria.
