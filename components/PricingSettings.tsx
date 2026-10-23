
import type { PricingProduct, Mode } from "../lib/types";

interface PricingSettingsProps {
    product: PricingProduct;
    onChange: <K extends keyof PricingProduct>(
        key: K,
        value: PricingProduct[K],
    ) => void;
}

const MODES: {
    id: Mode;
    label: string;
    description: string;
    icon: "target" | "trending" | "wallet";
}[] = [
        {
            id: "margin",
            label: "Por margen",
            description: "Define cuánto quieres ganar sobre el precio de venta.",
            icon: "target",
        },
        {
            id: "markup",
            label: "Por markup",
            description: "Establece cuánto aumentarás sobre el costo.",
            icon: "trending",
        },
        {
            id: "price",
            label: "Precio objetivo",
            description: "Evalúa la rentabilidad de un precio que ya tienes.",
            icon: "wallet",
        },
    ];

const num = (value: string) =>
    Math.max(0, Number(value) || 0);

const inputClassName = [
    "w-full min-w-0 rounded-lg border border-border",
    "bg-background px-3 py-2.5 text-sm text-foreground",
    "transition-colors duration-200",
    "focus:border-primary focus:outline-none",
    "focus-visible:ring-2 focus-visible:ring-primary/20",
    "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

const labelClassName =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted";

function ModeIcon({
    icon,
}: {
    icon: (typeof MODES)[number]["icon"];
}) {
    const commonProps = {
        "aria-hidden": true as const,
        viewBox: "0 0 24 24",
        fill: "none",
        className: "size-5",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    };

    if (icon === "target") {
        return (
            <svg {...commonProps}>
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1" />
            </svg>
        );
    }

    if (icon === "trending") {
        return (
            <svg {...commonProps}>
                <path d="M3 17 9 11l4 4 8-9" />
                <path d="M15 6h6v6" />
            </svg>
        );
    }

    return (
        <svg {...commonProps}>
            <rect x="3" y="5" width="18" height="15" rx="2" />
            <path d="M3 10h18M7 15h4" />
        </svg>
    );
}

export default function PricingSettings({
    product,
    onChange,
}: PricingSettingsProps) {
    const activeMode = MODES.find(
        (mode) => mode.id === product.mode,
    );

    return (
        <section
            aria-labelledby="pricing-settings-title"
            className="min-w-0 rounded-2xl border border-border bg-surface p-4 shadow-md sm:p-6"
        >
            {/* Encabezado */}
            <div className="mb-6 flex items-start gap-3">
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
                        <path d="M4 7h16M7 4v6M4 17h16M17 14v6" />
                    </svg>
                </div>

                <div className="min-w-0">
                    <h2
                        id="pricing-settings-title"
                        className="text-lg font-bold tracking-tight text-text-primary sm:text-xl"
                    >
                        Configuración del precio
                    </h2>

                    <p className="mt-1 text-sm leading-relaxed text-text-muted">
                        Selecciona la estrategia que mejor se adapte a tu negocio.
                    </p>
                </div>
            </div>

            {/* Selector de estrategia */}
            <fieldset className="min-w-0 border-0 p-0">
                <legend className={labelClassName}>
                    ¿Cómo quieres fijar el precio?
                </legend>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {MODES.map((mode) => {
                        const isActive = product.mode === mode.id;

                        return (
                            <button
                                key={mode.id}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => onChange("mode", mode.id)}
                                className={[
                                    "relative flex min-w-0 items-start gap-3 rounded-xl border p-4 text-left",
                                    "transition-colors duration-200",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                                    isActive
                                        ? "border-primary bg-primary/5 shadow-sm"
                                        : "border-border bg-background hover:border-border-strong hover:bg-surface",
                                ].join(" ")}
                            >
                                <span
                                    className={[
                                        "flex size-10 shrink-0 items-center justify-center rounded-lg",
                                        "transition-colors duration-200",
                                        isActive
                                            ? "bg-primary text-white"
                                            : "bg-surface text-text-muted",
                                    ].join(" ")}
                                >
                                    <ModeIcon icon={mode.icon} />
                                </span>

                                <span className="min-w-0 flex-1">
                                    <span
                                        className={[
                                            "block text-sm font-semibold",
                                            isActive
                                                ? "text-text-primary"
                                                : "text-text-secondary",
                                        ].join(" ")}
                                    >
                                        {mode.label}
                                    </span>

                                    <span className="mt-1 block text-xs leading-relaxed text-text-muted">
                                        {mode.description}
                                    </span>
                                </span>

                                {isActive && (
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        className="absolute right-3 top-3 size-4 text-primary"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m5 10 3 3 7-7" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>
            </fieldset>

            {/* Parámetros de cálculo */}
            <div className="my-6 border-t border-border" />

            <div className="mb-4">
                <h3 className="text-base font-semibold text-text-primary">
                    Parámetros de cálculo
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-text-muted">
                    Ajusta los porcentajes y las condiciones del precio final.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {product.mode === "margin" && (
                    <div className="min-w-0 rounded-xl border border-border bg-background p-4">
                        <label
                            htmlFor="pricing-margin"
                            className={labelClassName}
                        >
                            Margen deseado (%)
                        </label>

                        <div className="relative">
                            <input
                                id="pricing-margin"
                                type="number"
                                min={0}
                                max={99}
                                step="any"
                                inputMode="decimal"
                                value={product.marginPct}
                                onChange={(e) =>
                                    onChange(
                                        "marginPct",
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
                            Porcentaje de ganancia deseado sobre el precio de venta neto.
                        </p>
                    </div>
                )}

                {product.mode === "markup" && (
                    <div className="min-w-0 rounded-xl border border-border bg-background p-4">
                        <label
                            htmlFor="pricing-markup"
                            className={labelClassName}
                        >
                            Markup sobre el costo (%)
                        </label>

                        <div className="relative">
                            <input
                                id="pricing-markup"
                                type="number"
                                min={0}
                                step="any"
                                inputMode="decimal"
                                value={product.markupPct}
                                onChange={(e) =>
                                    onChange("markupPct", num(e.target.value))
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
                            Porcentaje que se incrementa sobre el costo base.
                        </p>
                    </div>
                )}

                {product.mode === "price" && (
                    <div className="min-w-0 rounded-xl border border-border bg-background p-4">
                        <label
                            htmlFor="pricing-target-price"
                            className={labelClassName}
                        >
                            Precio de venta sin IVA (COP)
                        </label>

                        <input
                            id="pricing-target-price"
                            type="number"
                            min={0}
                            step="any"
                            inputMode="decimal"
                            value={product.targetPrice}
                            onChange={(e) =>
                                onChange("targetPrice", num(e.target.value))
                            }
                            className={`${inputClassName} font-medium tabular-nums`}
                        />

                        <p className="mt-2 text-xs leading-relaxed text-text-muted">
                            Precio neto que deseas evaluar para conocer su rentabilidad.
                        </p>
                    </div>
                )}

                <div className="min-w-0 rounded-xl border border-border bg-background p-4">
                    <label
                        htmlFor="pricing-iva"
                        className={labelClassName}
                    >
                        IVA (%)
                    </label>

                    <div className="relative">
                        <input
                            id="pricing-iva"
                            type="number"
                            min={0}
                            max={100}
                            step="any"
                            inputMode="decimal"
                            value={product.ivaPct}
                            onChange={(e) =>
                                onChange("ivaPct", Math.min(100, num(e.target.value)))
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
                        Impuesto agregado al precio neto para calcular el precio final.
                    </p>
                </div>

                <div className="min-w-0 rounded-xl border border-border bg-background p-4 sm:col-span-2">
                    <label
                        htmlFor="pricing-round-step"
                        className={labelClassName}
                    >
                        Redondeo del precio final
                    </label>

                    <select
                        id="pricing-round-step"
                        value={product.roundStep}
                        disabled={product.mode === "price"}
                        onChange={(e) =>
                            onChange("roundStep", Number(e.target.value))
                        }
                        className={inputClassName}
                    >
                        <option value={0}>Sin redondeo</option>
                        <option value={100}>Redondear hacia arriba a $100</option>
                        <option value={500}>Redondear hacia arriba a $500</option>
                        <option value={1000}>Redondear hacia arriba a $1.000</option>
                    </select>

                    <p className="mt-2 text-xs leading-relaxed text-text-muted">
                        {product.mode === "price"
                            ? "El redondeo está desactivado porque estás evaluando un precio establecido."
                            : "El ajuste se aplica hacia arriba al precio final, según el intervalo seleccionado."}
                    </p>
                </div>
            </div>

            {/* Explicación del modo activo */}
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-primary/15 bg-primary/5 p-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
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
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 11v5M12 8h.01" />
                    </svg>
                </span>

                <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-primary">
                        {activeMode?.label ?? "Modo de cálculo"}
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                        {product.mode === "margin" &&
                            "El margen representa la ganancia como proporción del precio de venta neto. Por ejemplo, un margen del 30 % significa una ganancia de $30 por cada $100 de venta neta, antes de otros conceptos que no estén incluidos en el cálculo."}

                        {product.mode === "markup" &&
                            "El markup representa el incremento sobre el costo. Por ejemplo, con un costo de $100 y un markup del 50 %, el precio neto inicial sería $150, antes de considerar la comisión."}

                        {product.mode === "price" &&
                            "Ingresa el precio neto que ya cobras. La calculadora evaluará la rentabilidad que resulta de tus costos, comisiones e impuestos."}
                    </p>
                </div>
            </div>
        </section>
    );
}
