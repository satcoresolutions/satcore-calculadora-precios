import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import InstallPWAButton from "@/components/InstallPWAButton";

import PriceCalculator from "@/components/PriceCalculator";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10">
        {/* Encabezado */}
        <header className="mb-8 flex flex-col gap-6">
          {/* Marca */}
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
              <Image
                src="/logo.png"
                alt="SatCore Solutions"
                width={200}
                height={65}
                className="h-auto w-[180px] sm:w-[200px]"
                priority
              />

              <div className="hidden h-10 w-px bg-border sm:block" />

              <div className="max-w-md">
                <p className="text-sm leading-6 text-text-secondary">
                  Soluciones digitales seguras, accesibles y funcionales para
                  todos.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <InstallPWAButton />
              <ThemeToggle />
            </div>
          </div>

          {/* Título */}
          <div className="mx-auto w-full max-w-3xl text-center">
            <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl lg:text-4xl">
              Calculadora de precios
            </h1>

            <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-base">
              Ingresa tus costos y el margen que quieres ganar; te ayudamos a
              calcular el precio de venta.
            </p>
          </div>
        </header>

        {/* Calculadora */}
        <PriceCalculator />
      </div>
    </main>
  );
}
