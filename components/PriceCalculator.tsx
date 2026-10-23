
"use client";

import { useEffect, useMemo, useState } from "react";

import type {
  CostLine,
  PricingOutcome,
  PricingProduct,
} from "../lib/types";

import { calcPricing } from "../lib/pricing";
import {
  formatCOP,
  formatPct,
  uid,
} from "../lib/format";

import ProductForm from "./ProductForm";
import CostEditor from "./CostEditor";
import PricingSettings from "./PricingSettings";
import MarginSensitivity from "./MarginSensitivity";
import PricingSummary from "./PricingSummary";
import SavedProducts from "./SavedProducts";

const KEY_DRAFT = "precios:borrador";
const KEY_SAVED = "precios:productos";

const SENSITIVITY = [10, 20, 30, 40, 50, 60];

const newLine = (): CostLine => ({
  id: uid(),
  concept: "",
  amount: 0,
  scope: "unit",
});

const initial = (): PricingProduct => ({
  id: uid(),
  name: "",
  units: 1,
  lines: [newLine()],
  overheadPct: 0,
  commissionPct: 0,
  ivaPct: 19,
  mode: "margin",
  marginPct: 30,
  markupPct: 50,
  targetPrice: 0,
  roundStep: 0,
});

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);

    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Almacenamiento lleno o bloqueado.
  }
}

export default function PriceCalculator() {
  const [product, setProduct] =
    useState<PricingProduct | null>(null);

  const [saved, setSaved] = useState<PricingProduct[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setProduct(
      read<PricingProduct | null>(KEY_DRAFT, null) ?? initial()
    );

    setSaved(read<PricingProduct[]>(KEY_SAVED, []));
  }, []);

  useEffect(() => {
    if (product) {
      write(KEY_DRAFT, product);
    }
  }, [product]);

  useEffect(() => {
    if (!message) return;

    const timeout = setTimeout(() => setMessage(""), 2500);

    return () => clearTimeout(timeout);
  }, [message]);

  const outcome = useMemo<PricingOutcome | null>(
    () => (product ? calcPricing(product) : null),
    [product]
  );

  const sensitivity = useMemo(() => {
    if (!product) return [];

    return SENSITIVITY.map((margin) => ({
      margin,
      outcome: calcPricing({
        ...product,
        mode: "margin",
        marginPct: margin,
      }),
    }));
  }, [product]);

  const updateProduct = <K extends keyof PricingProduct>(
    key: K,
    value: PricingProduct[K]
  ) => {
    setProduct((current) =>
      current ? { ...current, [key]: value } : current
    );
  };

  const updateLine = (
    id: string,
    patch: Partial<CostLine>
  ) => {
    setProduct((current) =>
      current
        ? {
          ...current,
          lines: current.lines.map((line) =>
            line.id === id
              ? { ...line, ...patch }
              : line
          ),
        }
        : current
    );
  };

  const addLine = () => {
    setProduct((current) =>
      current
        ? {
          ...current,
          lines: [...current.lines, newLine()],
        }
        : current
    );
  };

  const removeLine = (id: string) => {
    setProduct((current) =>
      current && current.lines.length > 1
        ? {
          ...current,
          lines: current.lines.filter(
            (line) => line.id !== id
          ),
        }
        : current
    );
  };

  const startNew = () => {
    setProduct(initial());
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const copySummary = async () => {
    if (!product || !outcome?.ok) return;

    const result = outcome.result;

    const summary = [
      `Producto: ${product.name || "Sin nombre"}`,
      `Costo unitario: ${formatCOP(result.unitCost)}`,
      `Precio de venta (sin IVA): ${formatCOP(result.priceNet)}`,
      `IVA (${product.ivaPct}%): ${formatCOP(result.iva)}`,
      `Precio final al cliente: ${formatCOP(result.priceFinal)}`,
      `Ganancia por unidad: ${formatCOP(result.profit)} (margen ${formatPct(result.marginReal)})`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      setMessage("Resumen copiado.");
    } catch {
      setMessage("No se pudo copiar en este navegador.");
    }
  };

  const saveProduct = () => {
    if (!product) return;

    const exists = saved.some(
      (item) => item.id === product.id
    );

    const next = exists
      ? saved.map((item) =>
        item.id === product.id ? product : item
      )
      : [product, ...saved];

    setSaved(next);
    write(KEY_SAVED, next);
    setMessage("Producto guardado.");
  };

  const openSaved = (item: PricingProduct) => {
    setProduct(item);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const removeSaved = (id: string) => {
    const next = saved.filter((item) => item.id !== id);

    setSaved(next);
    write(KEY_SAVED, next);
  };

  // Estado de carga
  if (!product || !outcome) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-48 items-center justify-center rounded-2xl border border-border bg-surface p-6"
      >
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="size-5 animate-spin rounded-full border-2 border-border border-t-primary"
          />

          <p className="text-sm font-medium text-text-secondary">
            Cargando calculadora…
          </p>
        </div>
      </div>
    );
  }

  const hasCosts = product.lines.some(
    (line) => line.amount > 0
  );


  return (
    <div className="w-full min-w-0">
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-[1400px]
          min-w-0
          grid-cols-1
          items-start
          gap-6
          px-4
          sm:px-6
          lg:grid-cols-[minmax(0,1fr)_360px]
          lg:gap-8
          xl:grid-cols-[minmax(0,1fr)_380px]
        "
      >
        {/* Columna principal */}
        <main
          aria-label="Configuración de precios"
          className="
            flex
            min-w-0
            w-full
            flex-col
            gap-5
            sm:gap-6
          "
        >
          <ProductForm
            product={product}
            onChange={updateProduct}
            onNew={startNew}
          />

          <CostEditor
            product={product}
            onChange={updateProduct}
            onUpdateLine={updateLine}
            onAddLine={addLine}
            onRemoveLine={removeLine}
          />

          <PricingSettings
            product={product}
            onChange={updateProduct}
          />

          <MarginSensitivity rows={sensitivity} />
        </main>

        {/* Columna lateral fija durante el scroll */}
        <aside
          aria-label="Resultados y productos guardados"
          className="
            flex
            min-w-0
            w-full
            flex-col
            gap-5
            sm:gap-6
            lg:sticky
            lg:top-6
            lg:self-start
          "
        >
          <PricingSummary
            product={product}
            outcome={outcome}
            hasCosts={hasCosts}
            message={message}
            onCopy={copySummary}
            onSave={saveProduct}
          />

          <SavedProducts
            products={saved}
            onOpen={openSaved}
            onRemove={removeSaved}
          />
        </aside>
      </div>
    </div>
  );
}

