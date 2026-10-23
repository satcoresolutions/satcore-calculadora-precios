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

## [1.2.0] - 2026-10-23

### Added

- Incorporación de un componente independiente `ThemeToggle` para alternar entre el modo oscuro y el modo claro.
- Incorporación de un componente independiente `InstallPWAButton` para facilitar la instalación de la aplicación en dispositivos compatibles.
- Ayuda contextual para usuarios de iOS con instrucciones para añadir la aplicación a la pantalla de inicio desde Safari.
- Inclusión de estados accesibles y atributos descriptivos en los controles de interfaz.

### Changed

- Reorganización del diseño principal de la calculadora para mejorar la distribución del contenido y la alineación de sus columnas.
- Centrado del contenedor principal mediante anchos máximos y márgenes automáticos.
- Ajuste de los espacios horizontales y verticales del encabezado y del contenido principal.
- Redistribución del espacio entre el formulario de configuración de precios y el panel lateral de resultados.
- Adaptación del panel lateral mediante posicionamiento `sticky` en pantallas grandes para mantener visibles los resultados y productos guardados durante el desplazamiento.
- Ajuste del diseño responsive para organizar los componentes en una sola columna en pantallas pequeñas y en dos columnas en pantallas grandes.
- Actualización de los estilos de los controles de instalación y cambio de tema para mantener una interfaz visual consistente.
- Refactorización del encabezado de la página principal para mejorar la presentación del logotipo, el eslogan y el título de la calculadora.
- Consolidación de la estructura visual de la página mediante contenedores con espaciado y ancho máximo definidos.
- Actualización del `RootLayout` para mantener integrados los metadatos SEO, los datos estructurados JSON-LD, el registro del Service Worker y el pie de página.
- Restauración del script de inicialización del tema para aplicar la preferencia guardada antes del primer renderizado y reducir el parpadeo visual.
- Actualización del título de la aplicación instalada en dispositivos Apple para utilizar el nombre definido en la configuración del sitio (`SITE.name`).
- Organización de los componentes para separar la presentación visual de la lógica de cálculo y de las preferencias de interfaz.

### Fixed

- Corrección de la estructura del documento HTML para mantener el componente `Footer` dentro de `body`.
- Corrección de la distribución visual que podía dejar el contenido principal descentrado en pantallas amplias.
- Ajuste del ancho de las columnas para evitar que el panel lateral ocupe una proporción excesiva del espacio disponible.
- Mejora del comportamiento del panel lateral durante el desplazamiento vertical.
- Corrección de la ubicación de los controles de la aplicación para facilitar su alineación en el encabezado.
- Recuperación de la integración de `JsonLd` y `ServiceWorkerRegister` en el diseño raíz.
- Mejora del comportamiento del botón de instalación para ocultarse cuando la aplicación ya está instalada o cuando el navegador no ofrece un método de instalación compatible.

### Removed

- Eliminación de la dependencia directa de `ui.btnAccent` en el componente `InstallPWAButton`, sustituyéndola por clases de Tailwind CSS para mantener sus estilos dentro del propio componente.

### Security

- Conservación de la inicialización del tema mediante un script controlado que consulta la preferencia almacenada localmente.
- Mantenimiento del manejo de errores al acceder a `localStorage` para evitar que las restricciones del navegador interrumpan la inicialización del tema.
- Conservación del registro del Service Worker y de la configuración de metadatos SEO.
- No se introdujeron servicios de almacenamiento remoto ni dependencias de backend como parte de estos cambios.

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
