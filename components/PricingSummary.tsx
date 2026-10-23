
import type {
    PricingOutcome,
    PricingProduct,
} from "../lib/types";

import {
    formatCOP,
    formatPct,
} from "../lib/format";

interface PricingSummaryProps {
    product: PricingProduct;
    outcome: PricingOutcome;
    hasCosts: boolean;
    message: string;
    onCopy: () => void;
    onSave: () => void;
}

export default function PricingSummary({
    product,
    outcome,
    hasCosts,
    message,
    onCopy,
    onSave,
}: PricingSummaryProps) {
    return (
        <section
            aria-labelledby="pricing-summary-title"
            className="min-w-0 rounded-2xl border border-border bg-surface p-4 shadow-md sm:p-6"
        >
            {/* Encabezado */}
            <div className="mb-5 flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-text-primary">
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-5"
                    >
                        <rect
                            x="4"
                            y="3"
                            width="16"
                            height="18"
                            rx="2"
                        />
                        <path d="M8 7h8" />
                        <path d="M8 11h2" />
                        <path d="M14 11h2" />
                        <path d="M8 15h2" />
                        <path d="M14 15h2" />
                        <path d="M8 18h8" />
                    </svg>
                </div>

                <div className="min-w-0">
                    <h2
                        id="pricing-summary-title"
                        className="text-lg font-bold tracking-tight text-text-primary sm:text-xl"
                    >
                        Resultado
                    </h2>

                    <p className="mt-1 text-sm text-text-muted">
                        Resumen del cálculo de tu producto.
                    </p>
                </div>
            </div>

            {/* Resultado del cálculo */}
            {!outcome.ok ? (
                <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/10 p-4"
                >
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 size-5 shrink-0 text-danger"
                    >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v4" />
                        <path d="M12 16h.01" />
                    </svg>

                    <p className="text-sm leading-relaxed text-text-secondary">
                        {outcome.error}
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    {/* Aviso de costos */}
                    {!hasCosts && product.mode !== "price" && (
                        <div className="flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 p-3">
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mt-0.5 size-5 shrink-0 text-text-secondary"
                            >
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 8v4" />
                                <path d="M12 16h.01" />
                            </svg>

                            <p className="text-sm leading-relaxed text-text-secondary">
                                Agrega al menos un costo para calcular el precio.
                            </p>
                        </div>
                    )}

                    {/* Precio final */}
                    <div className="relative overflow-hidden rounded-2xl bg-primary p-5 text-white sm:p-6">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-8 -top-10 size-36 rounded-full border border-white/10"
                        />

                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -bottom-16 right-8 size-40 rounded-full border border-white/10"
                        />

                        <div className="relative">
                            <div className="flex items-center gap-2 text-white/85">
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="size-5 shrink-0"
                                >
                                    <path d="M12 2v20" />
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>

                                <span className="text-sm font-medium">
                                    Precio final al cliente
                                </span>
                            </div>

                            <p className="mt-3 break-words font-mono text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
                                {formatCOP(outcome.result.priceFinal)}
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="size-3.5"
                                    >
                                        <path d="m5 12 4 4L19 6" />
                                    </svg>
                                    IVA incluido
                                </span>

                                {outcome.result.units > 1 && (
                                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
                                        {outcome.result.units} unidades
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Desglose */}
                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-text-primary">
                            Desglose del precio
                        </h3>

                        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div className="min-w-0 rounded-xl border border-border bg-background p-3 sm:p-4">
                                <dt className="text-xs font-medium text-text-muted sm:text-sm">
                                    Costo por unidad
                                </dt>
                                <dd className="mt-2 break-words font-mono text-sm font-semibold tabular-nums text-foreground sm:text-base">
                                    {formatCOP(outcome.result.unitCost)}
                                </dd>
                            </div>

                            <div className="min-w-0 rounded-xl border border-border bg-background p-3 sm:p-4">
                                <dt className="text-xs font-medium text-text-muted sm:text-sm">
                                    Precio de venta (sin IVA)
                                </dt>
                                <dd className="mt-2 break-words font-mono text-sm font-semibold tabular-nums text-text-primary sm:text-base">
                                    {formatCOP(outcome.result.priceNet)}
                                </dd>
                            </div>

                            <div className="min-w-0 rounded-xl border border-border bg-background p-3 sm:p-4">
                                <dt className="text-xs font-medium text-text-muted sm:text-sm">
                                    IVA ({product.ivaPct}%)
                                </dt>
                                <dd className="mt-2 break-words font-mono text-sm font-semibold tabular-nums text-foreground sm:text-base">
                                    {formatCOP(outcome.result.iva)}
                                </dd>
                            </div>

                            {product.commissionPct > 0 && (
                                <div className="min-w-0 rounded-xl border border-border bg-background p-3 sm:p-4">
                                    <dt className="text-xs font-medium text-text-muted sm:text-sm">
                                        Comisión ({product.commissionPct}%)
                                    </dt>
                                    <dd className="mt-2 break-words font-mono text-sm font-semibold tabular-nums text-foreground sm:text-base">
                                        {formatCOP(outcome.result.commission)}
                                    </dd>
                                </div>
                            )}

                            <div
                                className={`min-w-0 rounded-xl border p-3 sm:p-4 ${outcome.result.profit < 0
                                        ? "border-danger/30 bg-danger/10"
                                        : "border-success/30 bg-success/10"
                                    }`}
                            >
                                <dt className="text-xs font-medium text-text-secondary sm:text-sm">
                                    Ganancia por unidad
                                </dt>
                                <dd
                                    className={`mt-2 break-words font-mono text-sm font-bold tabular-nums sm:text-base ${outcome.result.profit < 0
                                            ? "text-danger"
                                            : "text-success"
                                        }`}
                                >
                                    {formatCOP(outcome.result.profit)}
                                </dd>
                            </div>

                            <div className="min-w-0 rounded-xl border border-border bg-background p-3 sm:p-4">
                                <dt className="text-xs font-medium text-text-muted sm:text-sm">
                                    Margen real
                                </dt>
                                <dd className="mt-2 break-words font-mono text-sm font-semibold tabular-nums text-foreground sm:text-base">
                                    {formatPct(outcome.result.marginReal)}
                                </dd>
                            </div>

                            <div className="min-w-0 rounded-xl border border-border bg-background p-3 sm:p-4">
                                <dt className="text-xs font-medium text-text-muted sm:text-sm">
                                    Markup real
                                </dt>
                                <dd className="mt-2 break-words font-mono text-sm font-semibold tabular-nums text-foreground sm:text-base">
                                    {formatPct(outcome.result.markupReal)}
                                </dd>
                            </div>

                            <div className="min-w-0 rounded-xl border border-border bg-background p-3 sm:p-4">
                                <dt className="text-xs font-medium text-text-muted sm:text-sm">
                                    Precio mínimo (sin ganancia)
                                </dt>
                                <dd className="mt-2 break-words font-mono text-sm font-semibold tabular-nums text-foreground sm:text-base">
                                    {formatCOP(outcome.result.minPrice)}
                                </dd>
                            </div>

                            {outcome.result.units > 1 && (
                                <div className="min-w-0 rounded-xl border border-border bg-background p-3 sm:p-4">
                                    <dt className="text-xs font-medium text-text-muted sm:text-sm">
                                        Ganancia del lote ({outcome.result.units} un.)
                                    </dt>
                                    <dd className="mt-2 break-words font-mono text-sm font-semibold tabular-nums text-text-primary sm:text-base">
                                        {formatCOP(outcome.result.batchProfit)}
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>

                    {/* Advertencia de pérdida */}
                    {outcome.result.profit < 0 && (
                        <div
                            role="alert"
                            className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/10 p-4"
                        >
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mt-0.5 size-5 shrink-0 text-danger"
                            >
                                <path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z" />
                                <path d="M12 9v4" />
                                <path d="M12 17h.01" />
                            </svg>

                            <p className="text-sm leading-relaxed text-text-secondary">
                                Con este precio pierdes dinero en cada unidad.
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Acciones */}
            <div className="mt-5 space-y-3">
                <button
                    type="button"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={onCopy}
                    disabled={!outcome.ok}
                >
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4"
                    >
                        <rect
                            x="8"
                            y="8"
                            width="13"
                            height="13"
                            rx="2"
                        />
                        <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
                    </svg>

                    Copiar resumen
                </button>

                <button
                    type="button"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-border-strong bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                    onClick={onSave}
                >
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4"
                    >
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l6 6v10a2 2 0 0 1-2 2Z" />
                        <path d="M17 21v-8H7v8" />
                        <path d="M7 3v5h8" />
                    </svg>

                    Guardar producto
                </button>
            </div>

            {/* Mensaje */}
            {message && (
                <div
                    role="status"
                    aria-live="polite"
                    className="mt-4 flex items-start gap-2 rounded-xl border border-success/30 bg-success/10 p-3 text-sm text-text-secondary"
                >
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 size-4 shrink-0 text-success"
                    >
                        <path d="m5 12 4 4L19 6" />
                    </svg>

                    <p className="break-words">{message}</p>
                </div>
            )}

            {/* Privacidad */}
            <div className="mt-5 flex items-start gap-2 border-t border-border pt-4">
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 size-4 shrink-0 text-text-muted"
                >
                    <rect
                        x="3"
                        y="11"
                        width="18"
                        height="10"
                        rx="2"
                    />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>

                <p className="text-xs leading-relaxed text-text-muted">
                    Lo que escribes se guarda solo en este navegador.
                </p>
            </div>
        </section>
    );
}
