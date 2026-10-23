
import {
  PRICING_MODES,
  COST_SCOPES,
  type Mode,
  type CostScope,
} from "./types";

/** Metadatos visuales para cada estrategia de cálculo. */
export const MODE_META: Record<
  Mode,
  {
    label: string;
    description: string;
    emoji: string;
  }
> = {
  margin: {
    label: "Margen",
    description: "Calcula el precio según el margen de ganancia deseado.",
    emoji: "📊",
  },
  markup: {
    label: "Markup",
    description: "Calcula el precio según el incremento sobre el costo.",
    emoji: "📈",
  },
  price: {
    label: "Precio objetivo",
    description: "Evalúa la rentabilidad de un precio establecido.",
    emoji: "🎯",
  },
};

/** Metadatos visuales para el alcance de cada costo. */
export const COST_SCOPE_META: Record<
  CostScope,
  {
    label: string;
    description: string;
  }
> = {
  unit: {
    label: "Por unidad",
    description: "El costo se aplica individualmente a cada unidad.",
  },
  batch: {
    label: "Por lote",
    description: "El costo total se distribuye entre las unidades del lote.",
  },
};

/** Clave para guardar los datos del calculador en localStorage. */
export const STORAGE_KEY = "satcore-pricing-calculator-v1";

/** Clave para guardar la preferencia de tema visual. */
export const THEME_KEY = "satcore-pricing-theme";

/** Exportaciones de las opciones del dominio. */
export {
  PRICING_MODES,
  COST_SCOPES,
};

/** Clases reutilizables que utilizan los tokens de global.css de SatCore. */
export const ui = {
  card:
    "rounded-xl border border-border bg-surface p-4 shadow-md",

  input:
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground",

  label:
    "mb-1 block text-xs font-medium uppercase tracking-wider text-text-muted",

  btnPrimary:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90",

  btnAccent:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-black-soft transition hover:opacity-90",

  btnGhost:
    "inline-flex items-center justify-center gap-2 rounded-lg border border-border-strong bg-transparent px-3 py-2 text-sm font-medium text-foreground transition hover:bg-surface-secondary",

  btnDanger:
    "inline-flex items-center justify-center rounded-lg border border-danger px-3 py-1.5 text-xs font-medium text-danger transition hover:bg-danger hover:text-black-soft",

} as const;
