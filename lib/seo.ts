
/**
 * Configuración central de SEO.
 * Define NEXT_PUBLIC_SITE_URL en producción.
 */

export const SITE = {
  name: "Calculadora de precios",
  brand: "SatCore Solutions",

  description:
    "Calcula el precio de venta de tus productos a partir de sus costos y el margen de ganancia deseado. Una herramienta práctica para establecer precios de forma rápida y sencilla.",

  shortDescription:
    "Calcula precios de venta según tus costos y margen de ganancia.",

  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/+$/, ""),

  locale: "es_CO",
  language: "es-CO",
  themeColor: "#132a8e",

  keywords: [
    "calculadora de precios",
    "calculadora de precio de venta",
    "calcular precio de venta",
    "calculadora de costos",
    "margen de ganancia",
    "calcular margen de beneficio",
    "costos y precios",
    "precio de venta de productos",
    "herramienta para emprendedores",
    "SatCore Solutions",
  ],
} as const;

/**
 * Construye una URL absoluta a partir de una ruta.
 */
export const absoluteUrl = (path = "/") =>
  `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
