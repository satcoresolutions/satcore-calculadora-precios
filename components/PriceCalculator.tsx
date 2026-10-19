"use client";

import { useEffect, useMemo, useState } from "react";
import { calcPricing, type CostLine, type Mode, type PricingInput } from "@/lib/pricing";
import { formatCOP, formatPct, uid } from "@/lib/format";

interface State extends PricingInput {
  id: string;
  name: string;
}

const KEY_DRAFT = "precios:borrador";
const KEY_SAVED = "precios:productos";

const newLine = (): CostLine => ({ id: uid(), concept: "", amount: 0, scope: "unit" });

const initial = (): State => ({
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
    /* almacenamiento lleno o bloqueado: se ignora */
  }
}

const MODES: { id: Mode; label: string }[] = [
  { id: "margin", label: "Por margen" },
  { id: "markup", label: "Por markup" },
  { id: "price", label: "Tengo un precio" },
];

const SENSITIVITY = [10, 20, 30, 40, 50, 60];

export default function PriceCalculator() {
  const [state, setState] = useState<State | null>(null);
  const [saved, setSaved] = useState<State[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setState(read<State | null>(KEY_DRAFT, null) ?? initial());
    setSaved(read<State[]>(KEY_SAVED, []));
  }, []);

  useEffect(() => {
    if (state) write(KEY_DRAFT, state);
  }, [state]);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(""), 2500);
    return () => clearTimeout(t);
  }, [message]);

  const outcome = useMemo(() => (state ? calcPricing(state) : null), [state]);

  const sensitivity = useMemo(() => {
    if (!state) return [];
    return SENSITIVITY.map((m) => ({
      margin: m,
      outcome: calcPricing({ ...state, mode: "margin", marginPct: m }),
    }));
  }, [state]);

  if (!state || !outcome) return <p className="muted">Cargando…</p>;

  const set = <K extends keyof State>(key: K, value: State[K]) =>
    setState((s) => (s ? { ...s, [key]: value } : s));

  const num = (v: string) => Math.max(0, Number(v) || 0);

  const updateLine = (id: string, patch: Partial<CostLine>) =>
    setState((s) =>
      s ? { ...s, lines: s.lines.map((l) => (l.id === id ? { ...l, ...patch } : l)) } : s
    );

  const addLine = () => setState((s) => (s ? { ...s, lines: [...s.lines, newLine()] } : s));

  const removeLine = (id: string) =>
    setState((s) =>
      s && s.lines.length > 1 ? { ...s, lines: s.lines.filter((l) => l.id !== id) } : s
    );

  const hasCosts = state.lines.some((l) => l.amount > 0);
  const r = outcome.ok ? outcome.result : null;

  const copySummary = async () => {
    if (!r) return;
    const text = [
      `Producto: ${state.name || "Sin nombre"}`,
      `Costo unitario: ${formatCOP(r.unitCost)}`,
      `Precio de venta (sin IVA): ${formatCOP(r.priceNet)}`,
      `IVA (${state.ivaPct}%): ${formatCOP(r.iva)}`,
      `Precio final al cliente: ${formatCOP(r.priceFinal)}`,
      `Ganancia por unidad: ${formatCOP(r.profit)} (margen ${formatPct(r.marginReal)})`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setMessage("Resumen copiado.");
    } catch {
      setMessage("No se pudo copiar en este navegador.");
    }
  };

  const saveProduct = () => {
    const exists = saved.some((p) => p.id === state.id);
    const next = exists ? saved.map((p) => (p.id === state.id ? state : p)) : [state, ...saved];
    setSaved(next);
    write(KEY_SAVED, next);
    setMessage("Producto guardado.");
  };

  const startNew = () => {
    setState(initial());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openSaved = (p: State) => {
    setState(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeSaved = (id: string) => {
    const next = saved.filter((p) => p.id !== id);
    setSaved(next);
    write(KEY_SAVED, next);
  };

  return (
    <div className="layout">
      <div className="stack">
        <section className="panel">
          <div className="panel-head">
            <h2>Producto</h2>
            <button type="button" className="btn btn-ghost" onClick={startNew}>
              + Nuevo producto
            </button>
          </div>
          <div className="grid grid-2">
            <label>
              Nombre del producto
              <input
                placeholder="Ej. Camiseta estampada"
                value={state.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </label>
            <label>
              Unidades del lote
              <input
                type="number"
                min={1}
                value={state.units}
                onChange={(e) => set("units", Math.max(1, Math.floor(Number(e.target.value)) || 1))}
              />
            </label>
          </div>
          <p className="hint">
            Las unidades solo se usan para repartir los costos marcados como “Del lote”.
          </p>
        </section>

        <section className="panel">
          <h2>Costos</h2>
          <div className="cost-rows">
            <div className="cost-row cost-head">
              <span>Concepto</span>
              <span>Valor</span>
              <span>Aplica</span>
              <span />
            </div>
            {state.lines.map((l) => (
              <div className="cost-row" key={l.id}>
                <input
                  placeholder="Materia prima, mano de obra, empaque…"
                  value={l.concept}
                  onChange={(e) => updateLine(l.id, { concept: e.target.value })}
                />
                <input
                  type="number"
                  min={0}
                  value={l.amount}
                  onChange={(e) => updateLine(l.id, { amount: num(e.target.value) })}
                />
                <select
                  value={l.scope}
                  onChange={(e) => updateLine(l.id, { scope: e.target.value as CostLine["scope"] })}
                >
                  <option value="unit">Por unidad</option>
                  <option value="batch">Del lote</option>
                </select>
                <button
                  type="button"
                  className="icon-btn"
                  aria-label="Eliminar costo"
                  onClick={() => removeLine(l.id)}
                  disabled={state.lines.length === 1}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button type="button" className="btn" onClick={addLine}>
            + Agregar costo
          </button>

          <div className="grid grid-2 spaced">
            <label>
              Costos indirectos (%)
              <input
                type="number"
                min={0}
                value={state.overheadPct}
                onChange={(e) => set("overheadPct", num(e.target.value))}
              />
            </label>
            <label>
              Comisión / pasarela de pago (%)
              <input
                type="number"
                min={0}
                max={99}
                value={state.commissionPct}
                onChange={(e) => set("commissionPct", Math.min(99, num(e.target.value)))}
              />
            </label>
          </div>
          <p className="hint">
            Los indirectos se suman al costo (arriendo, servicios…). La comisión se descuenta del precio de venta.
          </p>
        </section>

        <section className="panel">
          <h2>Cómo quieres fijar el precio</h2>
          <div className="seg" role="tablist">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={state.mode === m.id}
                className={state.mode === m.id ? "active" : ""}
                onClick={() => set("mode", m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="grid grid-2 spaced">
            {state.mode === "margin" && (
              <label>
                Margen deseado (%)
                <input
                  type="number"
                  min={0}
                  max={99}
                  value={state.marginPct}
                  onChange={(e) => set("marginPct", Math.min(99, num(e.target.value)))}
                />
              </label>
            )}
            {state.mode === "markup" && (
              <label>
                Markup sobre el costo (%)
                <input
                  type="number"
                  min={0}
                  value={state.markupPct}
                  onChange={(e) => set("markupPct", num(e.target.value))}
                />
              </label>
            )}
            {state.mode === "price" && (
              <label>
                Precio de venta sin IVA ($)
                <input
                  type="number"
                  min={0}
                  value={state.targetPrice}
                  onChange={(e) => set("targetPrice", num(e.target.value))}
                />
              </label>
            )}
            <label>
              IVA (%)
              <input
                type="number"
                min={0}
                max={100}
                value={state.ivaPct}
                onChange={(e) => set("ivaPct", Math.min(100, num(e.target.value)))}
              />
            </label>
            <label>
              Redondear precio final
              <select
                value={state.roundStep}
                disabled={state.mode === "price"}
                onChange={(e) => set("roundStep", Number(e.target.value))}
              >
                <option value={0}>Sin redondeo</option>
                <option value={100}>Hacia arriba a $100</option>
                <option value={500}>Hacia arriba a $500</option>
                <option value={1000}>Hacia arriba a $1.000</option>
              </select>
            </label>
          </div>
          <p className="hint">
            {state.mode === "margin" &&
              "Margen = ganancia ÷ precio de venta. Con 30 % de margen, de cada $100 vendidos te quedan $30."}
            {state.mode === "markup" &&
              "Markup = ganancia ÷ costo. Con 50 % de markup, un costo de $100 se vende en $150."}
            {state.mode === "price" &&
              "Escribe el precio que ya cobras y mira qué margen te deja realmente."}
          </p>
        </section>

        <section className="panel">
          <h2>Precio según el margen</h2>
          <p className="hint" style={{ marginTop: 0 }}>
            Mismos costos, con distintos márgenes, para comparar de un vistazo.
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Margen</th>
                  <th>Sin IVA</th>
                  <th>Precio final</th>
                  <th>Ganancia / un.</th>
                </tr>
              </thead>
              <tbody>
                {sensitivity.map((row) => (
                  <tr key={row.margin}>
                    <td>{row.margin}%</td>
                    {row.outcome.ok ? (
                      <>
                        <td>{formatCOP(row.outcome.result.priceNet)}</td>
                        <td>{formatCOP(row.outcome.result.priceFinal)}</td>
                        <td>{formatCOP(row.outcome.result.profit)}</td>
                      </>
                    ) : (
                      <td colSpan={3} className="muted">
                        No aplica con esta comisión
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <aside className="side">
        <section className="panel summary">
          <h2>Resultado</h2>
          {!outcome.ok ? (
            <p className="alert">{outcome.error}</p>
          ) : (
            <>
              {!hasCosts && state.mode !== "price" ? (
                <p className="hint" style={{ marginTop: 0 }}>
                  Agrega al menos un costo para calcular el precio.
                </p>
              ) : null}
              <div className="hero">
                <span>Precio final al cliente</span>
                <strong>{formatCOP(outcome.result.priceFinal)}</strong>
                <small>IVA incluido</small>
              </div>
              <dl>
                <div>
                  <dt>Costo por unidad</dt>
                  <dd>{formatCOP(outcome.result.unitCost)}</dd>
                </div>
                <div>
                  <dt>Precio de venta (sin IVA)</dt>
                  <dd>{formatCOP(outcome.result.priceNet)}</dd>
                </div>
                <div>
                  <dt>IVA ({state.ivaPct}%)</dt>
                  <dd>{formatCOP(outcome.result.iva)}</dd>
                </div>
                {state.commissionPct > 0 && (
                  <div>
                    <dt>Comisión ({state.commissionPct}%)</dt>
                    <dd>{formatCOP(outcome.result.commission)}</dd>
                  </div>
                )}
                <div className={outcome.result.profit < 0 ? "loss" : "gain"}>
                  <dt>Ganancia por unidad</dt>
                  <dd>{formatCOP(outcome.result.profit)}</dd>
                </div>
                <div>
                  <dt>Margen real</dt>
                  <dd>{formatPct(outcome.result.marginReal)}</dd>
                </div>
                <div>
                  <dt>Markup real</dt>
                  <dd>{formatPct(outcome.result.markupReal)}</dd>
                </div>
                <div>
                  <dt>Precio mínimo (sin ganancia)</dt>
                  <dd>{formatCOP(outcome.result.minPrice)}</dd>
                </div>
                {outcome.result.units > 1 && (
                  <div>
                    <dt>Ganancia del lote ({outcome.result.units} un.)</dt>
                    <dd>{formatCOP(outcome.result.batchProfit)}</dd>
                  </div>
                )}
              </dl>
              {outcome.result.profit < 0 ? (
                <p className="alert">Con este precio pierdes dinero en cada unidad.</p>
              ) : null}
            </>
          )}

          <button type="button" className="btn btn-primary btn-block" onClick={copySummary} disabled={!r}>
            Copiar resumen
          </button>
          <button type="button" className="btn btn-block" onClick={saveProduct}>
            Guardar producto
          </button>
          {message ? <p className="toast">{message}</p> : null}
          <p className="hint">Lo que escribes se guarda solo en este navegador.</p>
        </section>

        <section className="panel">
          <h2>Productos guardados</h2>
          {saved.length === 0 ? (
            <p className="muted">Aún no has guardado productos.</p>
          ) : (
            <ul className="history">
              {saved.map((p) => {
                const o = calcPricing(p);
                return (
                  <li key={p.id}>
                    <div>
                      <strong>{p.name || "Sin nombre"}</strong>
                      <div className="muted small">
                        {o.ok ? `${formatCOP(o.result.priceFinal)} · margen ${formatPct(o.result.marginReal)}` : "—"}
                      </div>
                    </div>
                    <div className="history-actions">
                      <button type="button" className="link" onClick={() => openSaved(p)}>
                        Abrir
                      </button>
                      <button type="button" className="link danger" onClick={() => removeSaved(p.id)}>
                        Borrar
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </aside>
    </div>
  );
}
