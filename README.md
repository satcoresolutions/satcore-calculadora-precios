 <div align="center">

<img src="./public/logo.png" alt="SatCore Solutions" width="220" />

# SatCore Solutions | Calculadora de precios

**Calcula costos, establece precios de venta y analiza la rentabilidad de tus productos.**

Microaplicación web para convertir costos, gastos, comisiones e impuestos configurables en precios de venta estimados. Permite comparar estrategias de precios y analizar la rentabilidad por unidad y por lote.

Desarrollada con Next.js, React y TypeScript como parte de las soluciones digitales de SatCore Solutions.

> Soluciones digitales seguras, accesibles y funcionales para todos.

[![Licencia](https://img.shields.io/badge/License-SCSAL%201.0-blue.svg)](./LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-SatCore%20Solutions-181717?logo=github)](https://github.com/satcoresolutions)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![CSS](https://img.shields.io/badge/Styles-CSS-663399?logo=css3)](https://developer.mozilla.org/docs/Web/CSS)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/Package%20Manager-npm-CB3837?logo=npm)](https://www.npmjs.com/)

</div>

---

# Sobre el proyecto

**SatCore Solutions | Calculadora de precios** es una microaplicación diseñada para facilitar el cálculo de precios de venta y el análisis de rentabilidad de productos.

Permite registrar costos individuales, distribuir costos de un lote entre las unidades producidas, incorporar costos indirectos, contemplar comisiones y configurar el IVA para estimar precios de venta.

La herramienta ofrece diferentes métodos de cálculo para que emprendedores, comerciantes y pequeños negocios puedan comparar estrategias de precios y comprender cómo influyen los costos en sus resultados.

La aplicación está desarrollada con Next.js, React y TypeScript. Los productos guardados se conservan localmente en el navegador mediante `localStorage`, sin requerir una base de datos remota para las funciones descritas.

## Objetivos principales

- Facilitar el cálculo del costo unitario de un producto.
- Estimar precios de venta a partir de un margen de ganancia deseado.
- Calcular precios utilizando el método de markup.
- Analizar precios existentes y su rentabilidad estimada.
- Incorporar comisiones e impuestos configurables.
- Comparar diferentes escenarios de precios.
- Conservar productos para consultarlos posteriormente.
- Proporcionar una herramienta ligera sin infraestructura de backend.

## Público objetivo

- Emprendedores y trabajadores independientes.
- Pequeños comercios y tiendas.
- Fabricantes y productores a pequeña escala.
- Personas que venden productos por unidad o por lote.
- Negocios que necesitan estimar sus precios y márgenes.
- Usuarios que desean comparar estrategias de fijación de precios.

---

# SatCore Solutions

**SatCore Solutions** (_Software and Technology Core Solutions_) es una marca orientada al desarrollo de herramientas tecnológicas prácticas, funcionales y accesibles.

Nuestro propósito es crear soluciones digitales que ayuden a simplificar tareas, optimizar procesos y facilitar el uso de la tecnología.

**Eslogan corporativo:**

> Soluciones digitales seguras, accesibles y funcionales para todos.

## Áreas de trabajo

- **Desarrollo:** creación de aplicaciones, herramientas digitales y soluciones de software.
- **Automatizador:** simplificación y automatización de procesos y tareas.
- **Seguridad:** buenas prácticas de seguridad, privacidad y protección de la información.
- **Estudio:** investigación, experimentación y desarrollo de propuestas tecnológicas.
- **Marketing:** soluciones y herramientas digitales orientadas a la comunicación y presencia comercial.

La Calculadora de precios forma parte de nuestra iniciativa de desarrollar herramientas que ayuden a emprendedores y pequeños negocios a gestionar mejor sus operaciones.

---

# Características

## 1. Cálculo del costo unitario

La aplicación permite estimar el costo asociado a cada unidad de un producto mediante la combinación de diferentes conceptos.

- Registro de costos por unidad.
- Incorporación de costos compartidos por lote.
- Distribución de los costos del lote entre las unidades.
- Aplicación de costos indirectos porcentuales.
- Cálculo del costo unitario estimado.
- Utilización del costo unitario como base para los métodos de fijación de precios.

## 2. Métodos de cálculo de precios

La herramienta contempla tres métodos principales para calcular o analizar precios de venta.

- **Margen de ganancia:** calcula el precio necesario para alcanzar un margen objetivo sobre las ventas.
- **Markup sobre el costo:** determina el precio aplicando un porcentaje de incremento sobre el costo.
- **Precio de venta existente:** analiza un precio conocido para estimar la rentabilidad resultante.

Estos métodos permiten comparar distintas estrategias de fijación de precios según las necesidades del negocio.

## 3. Gestión de comisiones

- Incorporación de comisiones porcentuales de pasarelas de pago.
- Consideración de las comisiones en el cálculo del precio cuando corresponde al método utilizado.
- Análisis del efecto de las comisiones sobre la rentabilidad estimada.

La fórmula exacta depende del método de cálculo y de las reglas implementadas en el proyecto.

## 4. IVA configurable

- Configuración de una tasa de IVA.
- Tasa inicial del 19 % según la descripción del proyecto.
- Posibilidad de ajustar la tasa cuando la configuración de la aplicación lo permita.
- Consideración de los impuestos en los cálculos de acuerdo con la lógica implementada.

La aplicación es una herramienta de estimación comercial y no determina por sí sola el tratamiento tributario que corresponde a cada producto o negocio.

## 5. Redondeo de precios

Permite ajustar el precio final hacia arriba a múltiplos configurables, según las opciones disponibles:

- $100.
- $500.
- $1.000.

El redondeo facilita establecer precios comerciales más prácticos. Debido a este ajuste, el precio final puede diferir del resultado matemático sin redondear.

## 6. Análisis de rentabilidad

La aplicación permite consultar indicadores relacionados con los resultados económicos estimados de un producto.

- Ganancia estimada por unidad.
- Ganancia estimada por lote.
- Margen real resultante.
- Markup real resultante.
- Precio mínimo estimado para no generar pérdidas bajo los supuestos del cálculo.

Estos resultados dependen de los costos, comisiones, impuestos y demás parámetros introducidos. No constituyen una garantía de rentabilidad real.

## 7. Tabla comparativa de márgenes

- Comparación de escenarios con márgenes del 10 % al 60 %.
- Consulta de los precios correspondientes a cada escenario.
- Comparación de resultados estimados.
- Apoyo para seleccionar un precio de venta coherente con los objetivos del negocio.

## 8. Gestión de productos

- Guardado de productos en el navegador.
- Consulta de productos previamente registrados.
- Eliminación de productos guardados.
- Persistencia local mediante `localStorage`.
- Acceso a la información conservada desde el mismo navegador y perfil.

## 9. Copiar resumen

- Copia de un resumen de los resultados calculados.
- Facilita compartir o conservar los datos del análisis.
- Reduce la necesidad de transcribir manualmente los valores.

---

# Tecnologías

## Tecnologías principales

| Tecnología     | Función                                                            |
| -------------- | ------------------------------------------------------------------ |
| Next.js        | Framework para la aplicación web.                                  |
| React          | Construcción de la interfaz mediante componentes.                  |
| TypeScript     | Tipado estático y mayor claridad en el código.                     |
| CSS            | Estilos y presentación de la interfaz.                             |
| `localStorage` | Almacenamiento local de productos.                                 |
| Node.js        | Entorno de ejecución para el desarrollo y la ejecución de Next.js. |
| npm            | Instalación y administración de dependencias.                      |
| Git            | Control de versiones y colaboración.                               |

Las versiones concretas de Next.js, React, TypeScript y Node.js deben coincidir con las dependencias y los requisitos declarados en el repositorio.

---

# Requisitos

Antes de instalar el proyecto, asegúrate de disponer de:

- **Node.js:** una versión compatible con Next.js y las dependencias instaladas.
- **npm:** gestor de paquetes incluido habitualmente con Node.js.
- **Git:** necesario para clonar el repositorio.
- **Navegador moderno:** compatible con las características web utilizadas por la aplicación.

Comprueba las herramientas instaladas:

\`\`\`bash
node -v
npm -v
git --version
\`\`\`

Consulta `package.json` para verificar los requisitos exactos del proyecto.

---

# Instalación

## 1. Clonar el repositorio

\`\`\`bash
git clone https://github.com/satcoresolutions/satcore-calculadora-precios.git
\`\`\`

## 2. Entrar en el directorio

\`\`\`bash
cd satcore-calculadora-precios
\`\`\`

## 3. Instalar las dependencias

\`\`\`bash
npm install
\`\`\`

## 4. Iniciar el servidor de desarrollo

\`\`\`bash
npm run dev
\`\`\`

Abre la siguiente dirección en tu navegador:

[http://localhost:3000](http://localhost:3000)

Si el puerto 3000 está ocupado, Next.js puede seleccionar otro puerto y mostrarlo en la terminal.

---

# Configuración

La aplicación utiliza almacenamiento local y no requiere una base de datos remota para las funcionalidades descritas.

## Configuración del proyecto

Los principales archivos de configuración son los habituales en una aplicación Next.js:

- `package.json`: scripts, dependencias y metadatos.
- `tsconfig.json`: configuración de TypeScript.
- `app/layout.tsx`: estructura global de la aplicación.
- `app/globals.css`: estilos globales.
- `next.config.mjs`: configuración de Next.js, si el repositorio utiliza este archivo.

Las rutas indicadas deben verificarse con la estructura real del repositorio.

## Configuración de precios

Antes de utilizar los resultados para tomar decisiones comerciales, comprueba los parámetros introducidos:

- Costos por unidad.
- Costos del lote.
- Número de unidades por lote.
- Porcentaje de costos indirectos.
- Margen o markup objetivo.
- Porcentaje de comisión.
- Tasa de IVA.
- Regla de redondeo.

Los valores deben corresponder a los costos reales y a las condiciones aplicables al producto o servicio.

No se requiere un archivo `.env.local` para las funcionalidades locales descritas, salvo que el proyecto incorpore posteriormente servicios que lo necesiten.

---

# Desarrollo

Para iniciar el entorno de desarrollo:

\`\`\`bash
npm run dev
\`\`\`

Para consultar los scripts disponibles:

\`\`\`bash
npm run
\`\`\`

## Buenas prácticas

- Mantener las fórmulas de precios separadas de los componentes visuales.
- Utilizar tipos explícitos para los datos de costos y productos.
- Validar que las unidades del lote sean mayores que cero.
- Evitar divisiones entre cero y denominadores inválidos.
- Comprobar que los porcentajes estén dentro de los rangos admitidos.
- Evitar resultados negativos o no finitos cuando no tengan sentido comercial.
- Diferenciar el margen sobre ventas del markup sobre el costo.
- Documentar las reglas de aplicación del IVA y de las comisiones.
- Verificar los cálculos antes y después del redondeo.
- Probar los resultados con valores pequeños, grandes y casos límite.
- Mantener coherentes los cálculos entre el resumen, la tabla comparativa y los productos guardados.

---

# Producción

Para generar una compilación de producción:

\`\`\`bash
npm run build
\`\`\`

Para iniciar la aplicación compilada:

\`\`\`bash
npm start
\`\`\`

El comando `npm start` requiere que exista una compilación válida. Después de modificar el código, vuelve a ejecutar `npm run build` antes de iniciar la nueva versión.

Estos comandos presuponen que `package.json` contiene los scripts estándar de Next.js. Si el proyecto utiliza una configuración distinta, sigue los scripts definidos en el repositorio.

## Verificaciones recomendadas

Antes de publicar una versión de producción, comprueba que:

- Los costos unitarios se calculen correctamente.
- Los costos por lote se distribuyan entre las unidades esperadas.
- Los métodos de margen y markup produzcan resultados diferentes cuando corresponda.
- Las comisiones se apliquen según las fórmulas previstas.
- El IVA se trate de acuerdo con la configuración de la aplicación.
- El redondeo siempre respete la regla seleccionada.
- Las ganancias por unidad y por lote sean coherentes.
- Los productos guardados persistan después de recargar la página.
- Las funciones de consulta, eliminación y copia del resumen trabajen correctamente.

---

# Estructura del proyecto

La siguiente estructura es orientativa y debe ajustarse a los archivos reales del repositorio.

\`\`\`text
satcore-calculadora-precios/
├── app/
│ ├── layout.tsx
│ ├── page.tsx
│ └── globals.css
├── components/
│ └── PriceCalculator.tsx
├── lib/
│ ├── pricing.ts
│ └── format.ts
├── public/
│ └── logo.png
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.mjs
├── README.md
├── CHANGELOG.md
└── LICENSE
\`\`\`

## Responsabilidad de los módulos

| Archivo o directorio             | Responsabilidad                                      |
| -------------------------------- | ---------------------------------------------------- |
| `app/`                           | Página principal, estructura global y estilos.       |
| `components/PriceCalculator.tsx` | Interfaz y controles de la calculadora.              |
| `lib/pricing.ts`                 | Fórmulas y lógica de cálculo de precios.             |
| `lib/format.ts`                  | Formateo de moneda, porcentajes y valores numéricos. |
| `public/`                        | Recursos estáticos, como el logotipo.                |
| `package.json`                   | Scripts y dependencias del proyecto.                 |
| `tsconfig.json`                  | Configuración del compilador TypeScript.             |

Si el proyecto utiliza más componentes, hooks o módulos de persistencia, deben incorporarse a esta sección de acuerdo con la estructura real.

---

# Arquitectura

La aplicación utiliza una arquitectura ligera de aplicación web con lógica de cálculo separada de la interfaz y persistencia local.

## Flujo general

1. El usuario introduce los costos y los parámetros del producto.
2. La aplicación valida los valores de entrada.
3. El módulo de precios calcula el costo unitario.
4. Se aplica el método de fijación de precios seleccionado.
5. Se incorporan los parámetros correspondientes de comisiones, impuestos y redondeo.
6. Se presentan los resultados y los indicadores de rentabilidad.
7. El usuario puede comparar escenarios y guardar productos en el navegador.

## Separación de responsabilidades

- **Interfaz:** entrada de datos, controles y visualización de resultados.
- **Cálculos:** fórmulas para costos, precios y rentabilidad.
- **Formateo:** presentación de monedas y porcentajes.
- **Persistencia:** almacenamiento y consulta de productos guardados.
- **Comparación:** presentación de diferentes escenarios de precios.

Esta separación facilita el mantenimiento y permite revisar las fórmulas sin depender directamente de la interfaz visual.

---

# ¿Cómo se calcula el precio?

Las siguientes fórmulas describen los principios generales de cálculo. La implementación real debe verificarse en `lib/pricing.ts` antes de considerarlas una especificación exacta del código.

## 1. Costo unitario

El costo unitario se obtiene al sumar los costos individuales, distribuir los costos del lote y añadir los costos indirectos correspondientes.

\`\`\`text
Costo base unitario =
Costos por unidad + (Costos del lote / Unidades del lote)
\`\`\`

Si los costos indirectos se calculan como un porcentaje del costo base:

\`\`\`text
Costo unitario total =
Costo base unitario × (1 + Porcentaje indirecto)
\`\`\`

Por ejemplo, si el costo base unitario es de $10.000 y los costos indirectos son del 10 %, el costo unitario total será de $11.000.

Esta interpretación supone que los costos indirectos se aplican sobre el costo base. Si el código utiliza otra base de cálculo, la fórmula debe ajustarse a su implementación.

## 2. Precio basado en el margen

El margen representa la ganancia como proporción del precio de venta, no del costo.

Cuando el margen y la comisión se expresan como proporciones del precio de venta, una fórmula simplificada es:

\`\`\`text
Precio de venta =
Costo unitario / (1 - Margen - Comisión)
\`\`\`

Esta fórmula solo es válida bajo esos supuestos y cuando el denominador es mayor que cero.

Si se incorporan impuestos, costos adicionales o reglas particulares para el IVA, el cálculo deberá considerar el tratamiento que corresponda según la implementación.

## 3. Precio basado en markup

El markup representa el incremento aplicado sobre el costo.

\`\`\`text
Precio antes de otros ajustes =
Costo unitario × (1 + Markup)
\`\`\`

Por ejemplo, un markup del 30 % sobre un costo de $10.000 produce un precio base de $13.000 antes de otros ajustes.

El markup del 30 % no equivale a un margen del 30 % sobre el precio de venta.

## 4. Análisis de rentabilidad

La rentabilidad estimada depende de los ingresos y de los costos que se incluyan en el modelo.

En un escenario simplificado:

\`\`\`text
Ganancia estimada por unidad =
Ingreso neto por unidad - Costos considerados
\`\`\`

\`\`\`text
Ganancia estimada por lote =
Ganancia estimada por unidad × Unidades vendidas
\`\`\`

El margen real se calcula normalmente como la ganancia dividida entre los ingresos de venta; el markup real se calcula como la ganancia dividida entre el costo correspondiente.

Las definiciones exactas deben mantenerse coherentes con el tratamiento de comisiones, impuestos, costos indirectos y redondeos de la aplicación.

## 5. Precio mínimo estimado

El precio mínimo para no generar pérdidas depende de los costos incluidos y de las deducciones variables aplicables a cada venta.

Si existen comisiones porcentuales, no basta con igualar el precio de venta al costo: el cálculo debe contemplar esas deducciones y cualquier otro costo variable relevante.

Los resultados de la calculadora son estimaciones y no sustituyen una revisión contable o tributaria.

---

# Datos y privacidad

La aplicación utiliza `localStorage` para conservar los productos guardados en el navegador.

## Tratamiento de los datos

- No requiere una base de datos remota para las funciones descritas.
- Los productos guardados están asociados al navegador y al perfil utilizados.
- Los datos no se sincronizan automáticamente entre dispositivos.
- El almacenamiento puede perderse al borrar los datos del sitio o restablecer el navegador.
- Los registros locales no se trasladan automáticamente a otro equipo.

## Recomendaciones

- Mantener una copia externa de los datos importantes cuando sea posible.
- Evitar registrar información personal innecesaria.
- Proteger el dispositivo y el perfil del navegador.
- Verificar los resultados antes de utilizarlos para tomar decisiones comerciales.
- No considerar el almacenamiento local como una copia de seguridad garantizada.

La aplicación no debe utilizarse como único sistema de respaldo de información crítica del negocio.

---

# Seguridad

La seguridad depende tanto de la implementación como de las prácticas de uso.

## Consideraciones de seguridad

- `localStorage` no ofrece cifrado automático de los datos.
- Los datos pueden ser accesibles para scripts ejecutados en el mismo origen.
- La aplicación no incorpora, en las funcionalidades descritas, autenticación ni permisos por usuario.
- Cualquier persona con acceso al mismo perfil del navegador podría consultar los productos guardados.
- No deben almacenarse contraseñas, claves privadas ni secretos en el código del cliente.
- Las dependencias deben mantenerse actualizadas y revisarse periódicamente.

## Reporte de vulnerabilidades

Si identificas un problema de seguridad, comunícalo de manera responsable a:

**Correo:** satcoresolutions@gmail.com

Evita publicar detalles que permitan explotar una vulnerabilidad antes de que pueda evaluarse y corregirse.

---

# Desarrollo y contribuciones

Las contribuciones orientadas a mejorar la precisión de los cálculos, la experiencia de usuario, la accesibilidad y la mantenibilidad son bienvenidas, sujetas a las condiciones de licencia aplicables.

## Cómo contribuir

1. Revisa la estructura y las convenciones del proyecto.
2. Identifica la mejora o el problema que deseas abordar.
3. Crea una rama para desarrollar los cambios.
4. Implementa la solución manteniendo separadas la interfaz y la lógica de negocio.
5. Comprueba las fórmulas con casos de prueba representativos.
6. Ejecuta las comprobaciones disponibles en el proyecto.
7. Documenta cualquier cambio funcional importante.
8. Envía una propuesta de cambio para su revisión.

## Áreas de mejora

- Pruebas automatizadas para las fórmulas de precios.
- Validación de casos límite y porcentajes inválidos.
- Mejoras en la accesibilidad de los formularios.
- Ampliación de las opciones de análisis.
- Exportación e importación de productos.
- Mejoras de respaldo y recuperación.
- Documentación de los cálculos.
- Optimización de la experiencia en dispositivos móviles.

Las contribuciones deben evitar la inclusión de datos comerciales reales, credenciales privadas o información personal innecesaria.

---

# Proyectos derivados

Los proyectos derivados pueden incluir mejoras en las fórmulas, nuevos métodos de fijación de precios, herramientas adicionales de análisis o adaptaciones a diferentes tipos de negocio.

Antes de copiar, modificar, redistribuir o incorporar el proyecto en otro producto, revisa las condiciones del archivo `LICENSE` y confirma qué permisos están concedidos.

La disponibilidad pública de un repositorio no implica, por sí sola, autorización ilimitada para reutilizar el código, el nombre, el logotipo, los recursos gráficos o la documentación.

---

# Atribución

Al reutilizar el proyecto de acuerdo con los permisos establecidos por su licencia, conserva los avisos de autoría y las atribuciones aplicables.

**Proyecto original:** SatCore Solutions | Calculadora de precios.

**Autoría:** SatCore Solutions.

**Repositorio:** https://github.com/satcoresolutions/satcore-calculadora-precios

La atribución no concede automáticamente derechos sobre marcas, logotipos, recursos gráficos u otros materiales que puedan estar sujetos a condiciones independientes.

---

# Marca y propiedad intelectual

**SatCore Solutions** y sus elementos identificativos forman parte de la identidad de marca de SatCore Solutions.

Salvo autorización expresa o los permisos concedidos por las condiciones legales aplicables, la reutilización del código no implica autorización para:

- Presentar una versión derivada como el producto oficial de SatCore Solutions.
- Utilizar el nombre o el logotipo de SatCore Solutions de manera que sugiera una afiliación inexistente.
- Eliminar avisos de autoría o de propiedad intelectual que deban conservarse.
- Afirmar que SatCore Solutions respalda, certifica o mantiene una adaptación sin autorización.

Los proyectos derivados deben identificar claramente sus modificaciones y su responsable cuando así lo exijan las condiciones de licencia.

---

# Dependencias de terceros

La aplicación se apoya en tecnologías y herramientas de terceros, entre ellas Next.js, React, TypeScript, Node.js y npm.

Cada dependencia conserva sus propios términos de licencia y condiciones de uso.

Antes de distribuir el proyecto o una versión derivada:

- Revisa las dependencias declaradas en `package.json`.
- Consulta el archivo de bloqueo de dependencias.
- Identifica las licencias de los paquetes incluidos.
- Conserva los avisos exigidos por sus respectivas licencias.
- Evita incorporar dependencias de procedencia desconocida o innecesarias.

La lista exacta de dependencias debe verificarse contra el repositorio real.

---

# Despliegue

La aplicación puede desplegarse en plataformas compatibles con Next.js, como [Vercel](https://vercel.com/).

## Despliegue local de producción

\`\`\`bash
npm install
npm run build
npm start
\`\`\`

## Despliegue en una plataforma compatible

1. Sube el proyecto a un repositorio de GitHub.
2. Importa el repositorio en la plataforma de despliegue.
3. Configura la versión compatible de Node.js.
4. Revisa los comandos de instalación y compilación.
5. Ejecuta el despliegue.
6. Comprueba que la aplicación se cargue correctamente.
7. Verifica los cálculos, la persistencia local y la gestión de productos.

El despliegue de la aplicación en una URL pública no sincroniza los productos entre usuarios. Cada navegador mantiene su propio almacenamiento local.

Si se necesita compartir datos entre equipos, será necesario incorporar una solución con backend, persistencia centralizada, autenticación y controles de acceso adecuados.

---

# Estado del proyecto

- **Proyecto:** SatCore Solutions | Calculadora de precios.
- **Organización:** SatCore Solutions.
- **Repositorio:** [satcore-calculadora-precios](https://github.com/satcoresolutions/satcore-calculadora-precios).
- **Tipo:** microaplicación web.
- **Estado funcional descrito:** cálculo de precios, análisis de rentabilidad y almacenamiento local de productos.
- **Versión:** por confirmar en el repositorio.
- **Última actualización:** por confirmar.

La versión y la fecha deben mantenerse sincronizadas con las entregas reales del proyecto y con su `CHANGELOG.md`.

---

# Roadmap

Las siguientes propuestas representan posibles mejoras futuras; no deben interpretarse como funcionalidades ya implementadas.

- [ ] Incorporar pruebas automatizadas para las fórmulas de precios.
- [ ] Ampliar la validación de entradas y el tratamiento de casos límite.
- [ ] Mejorar la documentación técnica de los cálculos.
- [ ] Añadir opciones adicionales de análisis de rentabilidad.
- [ ] Incorporar exportación e importación de productos.
- [ ] Mejorar las opciones de respaldo y recuperación de datos.
- [ ] Optimizar la accesibilidad y la experiencia en dispositivos móviles.
- [ ] Evaluar nuevas estrategias de redondeo de precios.
- [ ] Evaluar una arquitectura con persistencia centralizada si se requiere sincronización.

La prioridad de estas mejoras dependerá de las necesidades del proyecto y de los recursos disponibles.

---

# Licencia

El proyecto debe distribuirse conforme a las condiciones establecidas en el archivo `LICENSE` de su repositorio.

La plantilla corporativa de SatCore Solutions contempla la **SatCore Solutions Attribution License — SCSAL 1.0**.

**Antes de declarar SCSAL 1.0 como la licencia vigente**, verifica que el repositorio incluya el texto completo de esa licencia y que su aplicación a este proyecto haya sido confirmada. La presencia de una insignia o una referencia en el README no sustituye el texto legal de la licencia.

Si el proyecto todavía no tiene una licencia definida, mantén esta sección como pendiente hasta que se establezcan y publiquen las condiciones oficiales de uso, modificación y distribución.

---

# Autoría

**SatCore Solutions**

_Software and Technology Core Solutions_

Soluciones digitales seguras, accesibles y funcionales para todos.

- **GitHub:** https://github.com/satcoresolutions
- **Repositorio del proyecto:** https://github.com/satcoresolutions/satcore-calculadora-precios
- **Contacto:** satcoresolutions@gmail.com

<div align="center">

Desarrollado originalmente por **SatCore Solutions**.

© SatCore Solutions — Todos los derechos reservados, excepto los derechos expresamente concedidos mediante la licencia aplicable.

</div>
