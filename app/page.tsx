
import Image from "next/image";
import PriceCalculator from "@/components/PriceCalculator";

export default function Home() {
  return (
    <main className="container">
      <header className="top">
        <div className="brand">
          <Image
            src="/logo.png"
            alt="SatCore Solutions"
            width={200}
            height={65}
            className="brand-logo"
            priority
          />

          <div>
            <div className="brand-tagline">
              Soluciones digitales seguras, accesibles y funcionales para todos.
            </div>
          </div>
        </div>

        <div className="top-content">
          <h1>Calculadora de precios</h1>
          <p className="muted">
            Ingresa tus costos y el margen que quieres ganar; te ayudamos a
            calcular el precio de venta.
          </p>
        </div>
      </header>

      <PriceCalculator />
    </main>
  );
}
