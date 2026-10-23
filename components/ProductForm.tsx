
import type { PricingProduct } from "../lib/types";

interface ProductFormProps {
    product: PricingProduct;
    onChange: <K extends keyof PricingProduct>(
        key: K,
        value: PricingProduct[K]
    ) => void;
    onNew: () => void;
}

export default function ProductForm({
    product,
    onChange,
    onNew,
}: ProductFormProps) {
    return (
        <section
            aria-labelledby="product-form-title"
            className="min-w-0 rounded-2xl border border-border bg-surface p-4 shadow-md sm:p-6"
        >
            {/* Encabezado */}
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
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
                            <path d="M20 7h-9" />
                            <path d="M14 17H5" />
                            <circle cx="17" cy="17" r="3" />
                            <circle cx="7" cy="7" r="3" />
                        </svg>
                    </div>

                    <div className="min-w-0">
                        <h2
                            id="product-form-title"
                            className="text-lg font-bold tracking-tight text-text-primary sm:text-xl"
                        >
                            Producto
                        </h2>

                        <p className="mt-1 text-sm text-text-muted">
                            Define el producto y las unidades que vas a calcular.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-border-strong bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus sm:w-auto"
                    onClick={onNew}
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
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                    </svg>

                    Nuevo producto
                </button>
            </div>

            {/* Campos */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="min-w-0">
                    <label
                        htmlFor="product-name"
                        className="mb-2 block text-sm font-semibold text-text-secondary"
                    >
                        Nombre del producto
                    </label>

                    <input
                        id="product-name"
                        type="text"
                        placeholder="Ej. Camiseta estampada"
                        value={product.name}
                        onChange={(e) =>
                            onChange("name", e.target.value)
                        }
                        className="min-h-11 w-full min-w-0 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-focus/20"
                    />
                </div>

                <div className="min-w-0">
                    <label
                        htmlFor="product-units"
                        className="mb-2 block text-sm font-semibold text-text-secondary"
                    >
                        Unidades del lote
                    </label>

                    <input
                        id="product-units"
                        type="number"
                        min={1}
                        step={1}
                        value={product.units}
                        onChange={(e) =>
                            onChange(
                                "units",
                                Math.max(
                                    1,
                                    Math.floor(Number(e.target.value)) || 1
                                )
                            )
                        }
                        className="min-h-11 w-full min-w-0 rounded-xl border border-border bg-background px-3.5 py-2.5 font-mono text-sm tabular-nums text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-focus/20"
                    />
                </div>
            </div>

            {/* Ayuda */}
            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-border bg-background p-3">
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
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 11v5" />
                    <path d="M12 8h.01" />
                </svg>

                <p className="text-xs leading-relaxed text-text-muted sm:text-sm">
                    Las unidades solo se usan para repartir los costos
                    marcados como <span className="font-semibold text-text-secondary">“Del lote”</span>.
                </p>
            </div>
        </section>
    );
}
