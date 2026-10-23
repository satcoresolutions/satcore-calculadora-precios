
import type { CostLine, PricingProduct } from "../lib/types";

interface CostEditorProps {
    product: PricingProduct;
    onUpdateLine: (id: string, patch: Partial<CostLine>) => void;
    onAddLine: () => void;
    onRemoveLine: (id: string) => void;
    onChange: <K extends keyof PricingProduct>(
        key: K,
        value: PricingProduct[K],
    ) => void;
}

const num = (value: string) =>
    Math.max(0, Number(value) || 0);

const inputClassName = [
    "w-full min-w-0 rounded-lg border border-border",
    "bg-background px-3 py-2.5 text-sm text-foreground",
    "placeholder:text-text-muted",
    "transition-colors duration-200",
    "focus:border-primary focus:outline-none",
    "focus-visible:ring-2 focus-visible:ring-primary/20",
    "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

const labelClassName =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted";

export default function CostEditor({
    product,
    onUpdateLine,
    onAddLine,
    onRemoveLine,
    onChange,
}: CostEditorProps) {
    return (
        <section
            aria-labelledby="cost-editor-title"
            className="min-w-0 rounded-2xl border border-border bg-surface p-4 shadow-md sm:p-6"
        >
            {/* Encabezado */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="size-5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="5" width="18" height="15" rx="2" />
                            <path d="M7 9h10M7 13h4M7 16h3" />
                            <path d="M16 15v2M16 12v.01" />
                        </svg>
                    </div>

                    <div className="min-w-0">
                        <h2
                            id="cost-editor-title"
                            className="text-lg font-bold tracking-tight text-text-primary sm:text-xl"
                        >
                            Estructura de costos
                        </h2>

                        <p className="mt-1 text-sm leading-relaxed text-text-muted">
                            Define los costos necesarios para fabricar o prestar tu producto.
                        </p>
                    </div>
                </div>

                <span className="inline-flex w-fit items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-text-secondary">
                    {product.lines.length}{" "}
                    {product.lines.length === 1 ? "concepto" : "conceptos"}
                </span>
            </div>

            {/* Editor de costos */}
            <div className="space-y-3">
                <div className="hidden grid-cols-[minmax(0,1fr)_140px_150px_40px] gap-3 px-3 md:grid">
                    <span className={labelClassName}>Concepto</span>
                    <span className={labelClassName}>Valor</span>
                    <span className={labelClassName}>Aplicación</span>
                    <span className="sr-only">Acciones</span>
                </div>

                {product.lines.map((line, index) => (
                    <div
                        key={line.id}
                        className="rounded-xl border border-border bg-background p-3 transition-colors duration-200 hover:border-border-strong sm:p-4 md:grid md:grid-cols-[minmax(0,1fr)_140px_150px_40px] md:items-end md:gap-3"
                    >
                        <div className="mb-3 min-w-0 md:mb-0">
                            <label
                                htmlFor={`cost-concept-${line.id}`}
                                className={labelClassName}
                            >
                                <span className="md:hidden">Concepto</span>
                                <span className="hidden md:inline">
                                    <span className="sr-only">Concepto de costo </span>
                                    {`Costo ${index + 1}`}
                                </span>
                            </label>

                            <input
                                id={`cost-concept-${line.id}`}
                                type="text"
                                autoComplete="off"
                                placeholder="Materia prima, mano de obra, empaque..."
                                value={line.concept}
                                onChange={(e) =>
                                    onUpdateLine(line.id, {
                                        concept: e.target.value,
                                    })
                                }
                                className={inputClassName}
                            />
                        </div>

                        <div className="mb-3 min-w-0 md:mb-0">
                            <label
                                htmlFor={`cost-amount-${line.id}`}
                                className={labelClassName}
                            >
                                Valor (COP)
                            </label>

                            <input
                                id={`cost-amount-${line.id}`}
                                type="number"
                                min={0}
                                step="any"
                                inputMode="decimal"
                                value={line.amount}
                                onChange={(e) =>
                                    onUpdateLine(line.id, {
                                        amount: num(e.target.value),
                                    })
                                }
                                className={`${inputClassName} tabular-nums`}
                            />
                        </div>

                        <div className="mb-3 min-w-0 md:mb-0">
                            <label
                                htmlFor={`cost-scope-${line.id}`}
                                className={labelClassName}
                            >
                                Aplicación
                            </label>

                            <select
                                id={`cost-scope-${line.id}`}
                                value={line.scope}
                                onChange={(e) =>
                                    onUpdateLine(line.id, {
                                        scope: e.target.value as CostLine["scope"],
                                    })
                                }
                                className={inputClassName}
                            >
                                <option value="unit">Por unidad</option>
                                <option value="batch">Por lote</option>
                            </select>
                        </div>

                        <div className="flex justify-end md:justify-center">
                            <button
                                type="button"
                                aria-label={`Eliminar costo ${index + 1}`}
                                title={
                                    product.lines.length === 1
                                        ? "Debe existir al menos un concepto"
                                        : "Eliminar costo"
                                }
                                disabled={product.lines.length === 1}
                                onClick={() => onRemoveLine(line.id)}
                                className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-text-muted transition-colors duration-200 hover:border-danger hover:bg-danger/10 hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:bg-transparent disabled:hover:text-text-muted"
                            >
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="size-4"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                >
                                    <path d="M5 7h14M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Agregar costo */}
            <div className="mt-4">
                <button
                    type="button"
                    onClick={onAddLine}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary transition-colors duration-200 hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 sm:w-auto"
                >
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="size-4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    >
                        <path d="M12 5v14M5 12h14" />
                    </svg>

                    Agregar concepto de costo
                </button>
            </div>

            {/* Costos indirectos y comisiones */}
            <div className="my-6 border-t border-border" />

            <div className="mb-4">
                <h3 className="text-base font-semibold text-text-primary">
                    Costos adicionales
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-text-muted">
                    Configura los porcentajes que afectan el costo y el precio de venta.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="min-w-0 rounded-xl border border-border bg-background p-4">
                    <label
                        htmlFor="cost-overhead"
                        className={labelClassName}
                    >
                        Costos indirectos (%)
                    </label>

                    <div className="relative">
                        <input
                            id="cost-overhead"
                            type="number"
                            min={0}
                            step="any"
                            inputMode="decimal"
                            value={product.overheadPct}
                            onChange={(e) =>
                                onChange("overheadPct", num(e.target.value))
                            }
                            className={`${inputClassName} pr-10 font-medium tabular-nums`}
                        />

                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm font-semibold text-text-muted"
                        >
                            %
                        </span>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-text-muted">
                        Arriendo, servicios públicos y otros gastos operativos.
                    </p>
                </div>

                <div className="min-w-0 rounded-xl border border-border bg-background p-4">
                    <label
                        htmlFor="cost-commission"
                        className={labelClassName}
                    >
                        Comisión / pasarela de pago (%)
                    </label>

                    <div className="relative">
                        <input
                            id="cost-commission"
                            type="number"
                            min={0}
                            max={99}
                            step="any"
                            inputMode="decimal"
                            value={product.commissionPct}
                            onChange={(e) =>
                                onChange(
                                    "commissionPct",
                                    Math.min(99, num(e.target.value)),
                                )
                            }
                            className={`${inputClassName} pr-10 font-medium tabular-nums`}
                        />

                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm font-semibold text-text-muted"
                        >
                            %
                        </span>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-text-muted">
                        Porcentaje descontado del precio neto de venta.
                    </p>
                </div>
            </div>

            {/* Nota informativa */}
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-primary/15 bg-primary/5 p-4">
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-0.5 size-5 shrink-0 text-primary"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 11v5M12 8h.01" />
                </svg>

                <p className="text-sm leading-relaxed text-text-secondary">
                    <span className="font-semibold text-text-primary">
                        ¿Cómo se aplican?
                    </span>{" "}
                    Los costos indirectos incrementan el costo base del producto. La
                    comisión se calcula sobre el precio neto de venta. Los costos por
                    lote se distribuyen entre las unidades configuradas.
                </p>
            </div>
        </section>
    );
}
