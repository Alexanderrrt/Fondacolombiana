const STATS = [
  { value: "Desde 2018", label: "Nacidos en San Jose" },
  { value: "2",          label: "Ubicaciones" },
  { value: "6K+",        label: "Seguidores en Instagram" },
  { value: "64.5K",      label: "Likes en TikTok" },
  { value: "11AM–9:30PM", label: "Abiertos Cada Día" },
];

export function StatsBar() {
  return (
    <div aria-label="Datos rápidos de Fonda Colombiana" className="relative z-10 border-y border-crema/10 bg-negro">
      <div aria-hidden="true" className="flex h-1 w-full">
        <div className="flex-1 bg-amarillo" />
        <div className="flex-1 bg-rojo" />
        <div className="flex-1 bg-azul" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center divide-x divide-crema/10 px-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center px-5 py-4 text-center sm:px-7 sm:py-5">
            <span className="font-serif text-lg font-extrabold text-crema sm:text-xl">{stat.value}</span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-crema/40">{stat.label}</span>
          </div>
        ))}
      </div>

      <div aria-hidden="true" className="flex h-1 w-full">
        <div className="flex-1 bg-azul" />
        <div className="flex-1 bg-rojo" />
        <div className="flex-1 bg-amarillo" />
      </div>
    </div>
  );
}
