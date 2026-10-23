import type { PricingProduct } from "../lib/types";

import { calcPricing } from "../lib/pricing";

import {
  formatCOP,
  formatPct,
} from "../lib/format";

interface SavedProductsProps {
  products: PricingProduct[];
  onOpen: (product: PricingProduct) => void;
  onRemove: (id: string) => void;
}

export default function SavedProducts({
  products,
  onOpen,
  onRemove,
}: SavedProductsProps) {
  return (
    <section
      aria-labelledby="saved-products-title"
      className="min-w-0 rounded-2xl border border-border bg-surface p-4 shadow-md sm:p-6"
    >
      {/* Encabezado */}
      <div className="mb-5 flex items-start gap-3">
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
            <path d="M6 3h12a2 2 0 0 1 2 2v16l-8-4-8 4V5a2 2 0 0 1 2-2Z" />
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          <h2
            id="saved-products-title"
            className="text-lg font-bold tracking-tight text-text-primary sm:text-xl"
          >
            Productos guardados
          </h2>

          <p className="mt-1 text-sm leading-relaxed text-text-muted">
            Consulta y administra tus productos guardados.
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold tabular-nums text-text-secondary">
          {products.length}
        </span>
      </div>

      {/* Estado vacío */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-strong bg-background px-4 py-8 text-center sm:py-10">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/5 text-text-muted">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6"
            >
              <path d="M6 3h12a2 2 0 0 1 2 2v16l-8-4-8 4V5a2 2 0 0 1 2-2Z" />
              <path d="M9 8h6" />
              <path d="M9 12h6" />
            </svg>
          </div>

          <p className="mt-3 text-sm font-semibold text-text-secondary">
            Aún no has guardado productos
          </p>

          <p className="mt-1 max-w-xs text-sm leading-relaxed text-text-muted">
            Los productos que guardes aparecerán aquí para que
            puedas consultarlos cuando los necesites.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => {
            const outcome = calcPricing(product);

            return (
              <li
                key={product.id}
                className="
                  flex min-w-0 flex-col gap-4
                  rounded-xl border border-border
                  bg-background p-4
                  transition-colors hover:border-primary/40
                "
              >
                {/* Información del producto */}
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-text-primary">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
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

                  <div className="min-w-0 flex-1">
                    {/* Nombre */}
                    <h3 className="break-words text-sm font-semibold leading-6 text-foreground sm:text-base">
                      {product.name || "Sin nombre"}
                    </h3>

                    {/* Precio */}
                    <div className="mt-2 min-w-0">
                      {outcome.ok ? (
                        <p className="break-words font-mono text-base font-bold leading-6 tabular-nums text-text-primary sm:text-lg">
                          {formatCOP(outcome.result.priceFinal)}
                        </p>
                      ) : (
                        <p className="text-sm leading-5 text-text-muted">
                          Resultado no disponible
                        </p>
                      )}
                    </div>

                    {/* Margen */}
                    {outcome.ok && (
                      <div className="mt-2">
                        <span className="inline-flex max-w-full items-center rounded-lg border border-border bg-surface px-2.5 py-1 text-xs leading-5 text-text-secondary sm:text-sm">
                          <span className="mr-1.5 text-text-muted">
                            Margen:
                          </span>

                          <span className="font-semibold tabular-nums">
                            {formatPct(outcome.result.marginReal)}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex min-w-0 items-center gap-2 border-t border-border pt-3">
                  <button
                    type="button"
                    className="
                      inline-flex min-h-10 min-w-0 flex-1
                      items-center justify-center gap-1.5
                      rounded-lg border border-border-strong
                      px-3 py-2 text-sm font-semibold
                      text-text-primary transition-colors
                      hover:border-primary hover:bg-primary/5
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-focus
                    "
                    onClick={() => onOpen(product)}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4 shrink-0"
                    >
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>

                    Abrir
                  </button>

                  <button
                    type="button"
                    aria-label={`Borrar producto ${product.name || "Sin nombre"}`}
                    className="
                      inline-flex min-h-10 min-w-0 flex-1
                      items-center justify-center gap-1.5
                      rounded-lg border border-danger/30
                      px-3 py-2 text-sm font-semibold
                      text-danger transition-colors
                      hover:bg-danger/10
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-danger
                    "
                    onClick={() => onRemove(product.id)}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4 shrink-0"
                    >
                      <path d="M3 6h18" />
                      <path d="M8 6V4h8v2" />
                      <path d="m19 6-1 14H6L5 6" />
                      <path d="M10 11v5" />
                      <path d="M14 11v5" />
                    </svg>

                    Borrar
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
