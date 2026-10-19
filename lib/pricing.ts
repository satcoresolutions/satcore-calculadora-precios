export type Mode = "margin" | "markup" | "price";

export interface CostLine {
  id: string;
  concept: string;
  amount: number;
  /** "unit" = costo por cada unidad · "batch" = costo total del lote (se reparte entre las unidades) */
  scope: "unit" | "batch";
}

export interface PricingInput {
  units: number;
  lines: CostLine[];
  overheadPct: number; // costos indirectos sobre el costo directo
  commissionPct: number; // comisión / pasarela sobre el precio de venta
  ivaPct: number;
  mode: Mode;
  marginPct: number; // margen sobre el precio de venta (después de comisión)
  markupPct: number; // ganancia sobre el costo (después de comisión)
  targetPrice: number; // precio sin IVA, solo en modo "price"
  roundStep: number; // 0 = sin redondeo; si no, redondea hacia arriba el precio final
}

export interface PricingResult {
  units: number;
  directCost: number; // costo por unidad antes de indirectos
  unitCost: number; // costo por unidad con indirectos
  priceNet: number; // precio de venta sin IVA
  iva: number;
  priceFinal: number; // precio al cliente (con IVA)
  commission: number;
  profit: number; // ganancia por unidad después de comisión
  marginReal: number; // % sobre precio de venta
  markupReal: number; // % sobre costo
  minPrice: number; // precio sin IVA que deja ganancia 0
  batchRevenue: number; // ventas del lote sin IVA
  batchProfit: number;
}

export type PricingOutcome = { ok: true; result: PricingResult } | { ok: false; error: string };

const n = (v: unknown) => (Number.isFinite(Number(v)) ? Number(v) : 0);

export function calcPricing(input: PricingInput): PricingOutcome {
  const units = Math.max(1, Math.floor(n(input.units)) || 1);

  let perUnit = 0;
  let perBatch = 0;
  for (const l of input.lines) {
    if (l.scope === "batch") perBatch += n(l.amount);
    else perUnit += n(l.amount);
  }

  const directCost = perUnit + perBatch / units;
  const unitCost = directCost * (1 + n(input.overheadPct) / 100);
  const c = n(input.commissionPct) / 100;

  if (c >= 1) {
    return { ok: false, error: "La comisión debe ser menor al 100 %." };
  }

  let priceNet: number;
  if (input.mode === "margin") {
    const denom = 1 - n(input.marginPct) / 100 - c;
    if (denom <= 0) {
      return { ok: false, error: "El margen más la comisión deben sumar menos del 100 %." };
    }
    priceNet = unitCost / denom;
  } else if (input.mode === "markup") {
    priceNet = (unitCost * (1 + n(input.markupPct) / 100)) / (1 - c);
  } else {
    priceNet = Math.max(0, n(input.targetPrice));
  }

  const ivaRate = n(input.ivaPct) / 100;
  let priceFinal = priceNet * (1 + ivaRate);

  const step = n(input.roundStep);
  if (input.mode !== "price" && step > 0 && priceFinal > 0) {
    priceFinal = Math.ceil(priceFinal / step - 1e-9) * step;
    priceNet = priceFinal / (1 + ivaRate);
  }

  const commission = priceNet * c;
  const profit = priceNet - commission - unitCost;

  return {
    ok: true,
    result: {
      units,
      directCost,
      unitCost,
      priceNet,
      iva: priceFinal - priceNet,
      priceFinal,
      commission,
      profit,
      marginReal: priceNet > 0 ? (profit / priceNet) * 100 : 0,
      markupReal: unitCost > 0 ? (profit / unitCost) * 100 : 0,
      minPrice: unitCost / (1 - c),
      batchRevenue: priceNet * units,
      batchProfit: profit * units,
    },
  };
}
