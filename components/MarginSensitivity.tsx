
import type { PricingOutcome } from "../lib/types";
import { formatCOP } from "../lib/format";

interface SensitivityRow {
    margin: number;
    outcome: PricingOutcome;
}

interface MarginSensitivityProps {
    rows: SensitivityRow[];
}

const cellClassName =
    "whitespace-nowrap px-4 py-3.5 text-sm text-text-secondary";

export default function MarginSensitivity({
    rows,
}: MarginSensitivityProps) {
    return (
        <section
            aria-labelledby="margin-sensitivity-title"
            className="min-w-0 rounded-2xl border border-border bg-surface p-4 shadow-md sm:p-6"
        >
            {/* Encabezado */}
            <div className="mb-2 flex items-start gap-3">
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
                        <path d="M3 3v18h18" />
                        <path d="m7 14 4-4 4 3 5-7" />
                        <path d="M16 6h4v4" />
                    </svg>
                </div>

                <div className="min-w-0">
                    <h2
                        id="margin-sensitivity-title"
                        className="text-lg font-bold tracking-tight text-text-primary sm:text-xl"
                    >
                        Precio según el margen
                    </h2>

                    <p className="mt-1 text-sm leading-relaxed text-text-muted">
                        Compara cómo cambia el precio de venta y la ganancia al modificar
                        el margen, manteniendo los mismos costos.
                    </p>
                </div>
            </div>

            {/* Indicador de contexto */}
            <div className="mb-5 mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-text-secondary">
                    <span className="size-2 rounded-full bg-primary" />
                    Costos constantes
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-text-secondary">
                    <span className="size-2 rounded-full bg-secondary" />
                    Diferentes márgenes
                </span>
            </div>

            {/* Tabla */}
            <div className="overflow-hidden rounded-xl border border-border bg-background">
                <div
                    className="overflow-x-auto"
                    role="region"
                    aria-label="Comparación de precios según el margen"
                    tabIndex={0}
                >
                    <table className="w-full min-w-[620px] border-collapse text-left">
                        <thead>
                            <tr className="border-b border-border bg-surface">
                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted"
                                >
                                    Margen
                                </th>

                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-text-muted"
                                >
                                    Precio sin IVA
                                </th>

                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-text-muted"
                                >
                                    Precio final
                                </th>

                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-text-muted"
                                >
                                    Ganancia / unidad
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {rows.map((row) => (
                                <tr
                                    key={row.margin}
                                    className="transition-colors duration-150 hover:bg-surface"
                                >
                                    <th
                                        scope="row"
                                        className={`${cellClassName} font-semibold text-text-primary`}
                                    >
                                        <span className="inline-flex items-center gap-2">
                                            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                                                {row.margin}%
                                            </span>
                                        </span>
                                    </th>

                                    {row.outcome.ok ? (
                                        <>
                                            <td
                                                className={`${cellClassName} text-right font-mono tabular-nums`}
                                            >
                                                {formatCOP(row.outcome.result.priceNet)}
                                            </td>

                                            <td
                                                className={`${cellClassName} text-right font-mono font-semibold tabular-nums text-text-primary`}
                                            >
                                                {formatCOP(row.outcome.result.priceFinal)}
                                            </td>

                                            <td
                                                className={`${cellClassName} text-right font-mono font-semibold tabular-nums`}
                                            >
                                                <span className="inline-flex items-center justify-end gap-2 text-green-700 dark:text-secondary">
                                                    {formatCOP(row.outcome.result.profit)}
                                                </span>
                                            </td>
                                        </>
                                    ) : (
                                        <td
                                            colSpan={3}
                                            className="px-4 py-4 text-sm text-text-muted"
                                        >
                                            <span className="inline-flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2">
                                                <svg
                                                    aria-hidden="true"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className="size-4 shrink-0 text-text-secondary"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M12 3 22 20H2L12 3Z" />
                                                    <path d="M12 9v4M12 16h.01" />
                                                </svg>

                                                <span>
                                                    No disponible con la comisión configurada
                                                </span>
                                            </span>
                                        </td>
                                    )}
                                </tr>
                            ))}

                            {rows.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-10 text-center text-sm text-text-muted"
                                    >
                                        No hay escenarios para comparar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Nota informativa */}
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-primary/15 bg-primary/5 p-4">
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
                        Cómo interpretar la tabla:
                    </span>{" "}
                    el precio sin IVA corresponde al valor antes del impuesto; el precio
                    final lo incluye. La ganancia por unidad considera los costos y la
                    comisión según las reglas de cálculo actuales.
                </p>
            </div>
        </section>
    );
}
