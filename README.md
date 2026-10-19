# SatCore Solutions | Calculadora de precios

Microaplicación para calcular precios de venta de forma práctica y precisa. Convierte costos, gastos y márgenes de ganancia en precios de venta, con herramientas para analizar la rentabilidad por unidad y por lote.

Desarrollada con **Next.js y TypeScript** como parte de las soluciones digitales de **SatCore Solutions**.

> Soluciones digitales seguras, accesibles y funcionales para todos.

## Características

- **Cálculo del costo unitario:** suma los costos por unidad, distribuye los costos del lote entre las unidades e incorpora los costos indirectos porcentuales.
- **Tres métodos de cálculo:** determina el precio según el margen de ganancia deseado, el markup sobre el costo o un precio de venta existente.
- **Comisiones:** permite considerar las comisiones porcentuales de las pasarelas de pago.
- **IVA configurable:** admite la configuración del IVA, con una tasa inicial del 19 %.
- **Redondeo de precios:** ajusta el precio final hacia arriba a múltiplos de $100, $500 o $1.000.
- **Análisis de rentabilidad:** calcula la ganancia por unidad y por lote, el margen real, el markup real y el precio mínimo para no generar pérdidas.
- **Tabla comparativa:** compara precios y resultados con márgenes del 10 % al 60 %.
- **Gestión de productos:** guarda productos en el navegador para consultarlos o eliminarlos posteriormente.
- **Copiar resumen:** facilita la copia de los resultados calculados.
- **Persistencia local:** conserva los productos guardados mediante `localStorage`, sin necesidad de una base de datos.

## Tecnologías

- [Next.js](https://nextjs.org/) — framework de React.
- [React](https://react.dev/) — construcción de interfaces.
- [TypeScript](https://www.typescriptlang.org/) — tipado estático.
- CSS — estilos de la interfaz.
- `localStorage` — almacenamiento local de productos.

## Requisitos

- Node.js y npm.
- Git, si deseas clonar el repositorio.

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/satcoresolutions/satcore-calculadora-precios.git
cd satcore-calculadora-precios
```

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Compilación para producción

Genera la compilación:

```bash
npm run build
```

Inicia el servidor de producción:

```bash
npm start
```

El comando `npm start` requiere que la compilación de producción se haya generado previamente.

## ¿Cómo se calcula el precio?

### 1. Costo unitario

El costo unitario considera los costos individuales, los costos compartidos del lote y los costos indirectos:

```text
Costo unitario =
  Costos por unidad
  + (Costos del lote / Unidades del lote)
  + Costos indirectos
```

Los costos indirectos se calculan según el porcentaje configurado en la aplicación.

### 2. Precio basado en el margen

El margen se calcula sobre el precio de venta, no sobre el costo:

```text
Precio de venta =
  Costo unitario / (1 - Margen - Comisión)
```

Esta fórmula supone que el margen y la comisión se expresan como proporciones del precio y que el denominador es mayor que cero.

### 3. Precio basado en markup

El markup representa la ganancia como proporción del costo:

```text
Precio antes de otros ajustes =
  Costo unitario × (1 + Markup)
```

### 4. Rentabilidad

La aplicación permite analizar la ganancia estimada por unidad y por lote, así como el margen y el markup resultantes del precio calculado.

Los impuestos, comisiones y ajustes finales deben interpretarse de acuerdo con la configuración y las fórmulas implementadas en el proyecto.

## Estructura del proyecto

```text
satcore-calculadora-precios/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── PriceCalculator.tsx
├── lib/
│   ├── pricing.ts
│   └── format.ts
├── public/
│   └── logo.png
├── package.json
├── tsconfig.json
└── README.md
```

La estructura puede variar según los componentes y archivos adicionales presentes en el repositorio.

- `app/`: página principal, estructura global y estilos.
- `components/PriceCalculator.tsx`: interfaz de la calculadora.
- `lib/pricing.ts`: fórmulas y lógica de cálculo de precios.
- `lib/format.ts`: funciones de formato de moneda y porcentajes.
- `public/`: recursos estáticos, como el logotipo.

La lógica de precios está separada de la interfaz para facilitar su mantenimiento y evolución.

## Almacenamiento y privacidad

La aplicación utiliza `localStorage` para guardar productos en el navegador.

- No requiere una base de datos ni un backend para sus funciones locales.
- Los datos guardados están asociados al navegador y al dispositivo utilizados.
- Los datos locales no se sincronizan automáticamente entre dispositivos.
- Borrar los datos del navegador puede eliminar los productos guardados.

## Despliegue

La aplicación puede desplegarse en plataformas compatibles con Next.js, como [Vercel](https://vercel.com/).

Pasos generales:

1. Sube el proyecto a un repositorio de GitHub.
2. Importa el repositorio en Vercel.
3. Configura los ajustes de compilación necesarios.
4. Ejecuta el despliegue.
5. Comprueba la aplicación desde la URL proporcionada por la plataforma.

## Autoría

**SatCore Solutions**

Soluciones digitales seguras, accesibles y funcionales para todos.

- GitHub: [@satcoresolutions](https://github.com/satcoresolutions)

---

© SatCore Solutions. Todos los derechos reservados.
