
export const PRICING_MODES = [
  "margin",
  "markup",
  "price",
] as const;

export type Mode = (typeof PRICING_MODES)[number];

/** Alcance del costo: por unidad o por lote completo. */
export const COST_SCOPES = [
  "unit",
  "batch",
] as const;

export type CostScope = (typeof COST_SCOPES)[number];

/** Línea de costo asociada al cálculo de precios. */
export interface CostLine {
  id: string;
  /** Nombre o descripción del concepto del costo. */
  concept: string;
  /** Valor monetario del costo. */
  amount: number;
  /** unit = costo por unidad · batch = costo total del lote. */
  scope: CostScope;
}


/** Producto guardado con sus datos de identificación y configuración de precios. */
export interface PricingProduct extends PricingInput {
  /** Identificador único del producto. */
  id: string;

  /** Nombre descriptivo del producto. */
  name: string;
}

/** Entradas necesarias para calcular el precio de venta. */
export interface PricingInput {
  /** Cantidad de unidades que componen el lote. */
  units: number;

  /** Costos directos registrados para el cálculo. */
  lines: CostLine[];

  /** Costos indirectos como porcentaje del costo directo. */
  overheadPct: number;

  /** Comisión o pasarela como porcentaje del precio sin IVA. */
  commissionPct: number;

  /** Porcentaje de IVA aplicado al precio de venta. */
  ivaPct: number;

  /** Estrategia utilizada para calcular el precio. */
  mode: Mode;

  /** Margen objetivo sobre el precio sin IVA, después de comisión. */
  marginPct: number;

  /** Incremento objetivo sobre el costo, después de comisión. */
  markupPct: number;

  /** Precio objetivo sin IVA; se utiliza en modo "price". */
  targetPrice: number;

  /** Incremento para redondear hacia arriba el precio final. */
  roundStep: number;
}

/** Resultado del cálculo de precios para una unidad y un lote. */
export interface PricingResult {
  /** Cantidad de unidades calculadas. */
  units: number;

  /** Costo directo por unidad antes de costos indirectos. */
  directCost: number;

  /** Costo por unidad después de costos indirectos. */
  unitCost: number;

  /** Precio de venta unitario sin IVA. */
  priceNet: number;

  /** Valor del IVA por unidad. */
  iva: number;

  /** Precio final unitario con IVA. */
  priceFinal: number;

  /** Comisión por unidad. */
  commission: number;

  /** Ganancia por unidad después de comisión. */
  profit: number;

  /** Margen real porcentual sobre el precio sin IVA. */
  marginReal: number;

  /** Ganancia real porcentual sobre el costo unitario. */
  markupReal: number;

  /** Precio mínimo sin IVA para alcanzar el punto de equilibrio. */
  minPrice: number;

  /** Ingresos del lote sin IVA. */
  batchRevenue: number;

  /** Ganancia total del lote después de comisión. */
  batchProfit: number;
}

/** Resultado exitoso o fallido de una operación de cálculo. */
export type PricingOutcome =
  | {
    ok: true;
    result: PricingResult;
  }
  | {
    ok: false;
    error: string;
  };
