import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

const projects = [
  { year: "2025", title: "Lumen", tag: "Product design", color: "var(--blue-accent)" },
  { year: "2025", title: "Northwind", tag: "Marketing website", color: "var(--orange-accent)" },
  { year: "2024", title: "Folio", tag: "Visual branding", color: "var(--yellow-accent)" },
  { year: "2024", title: "Quartz", tag: "Product design", color: "var(--ink)" },
  { year: "2023", title: "Maple & Co.", tag: "Marketing website", color: "var(--blue-accent)" },
  { year: "2023", title: "Ember", tag: "Visual branding", color: "var(--orange-accent)" },
];

function Index() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }),
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="grid-paper min-h-screen relative overflow-hidden">
      {/* Top status bar */}
      <header className="flex items-center justify-between px-6 md:px-10 py-6 text-xs uppercase tracking-[0.18em]">
        <span className="font-medium">Tanmay Trivedi</span>
        <span className="hidden sm:inline text-muted-foreground">
          Available for work · {time} IST
        </span>
        <span className="bg-ink text-paper px-3 py-1 rounded-full">2026</span>
      </header>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-10 md:pt-20 pb-32 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 bg-blue-accent text-white px-4 py-1.5 rounded-full text-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Hey there!
            </span>
            <span className="font-hand text-2xl text-orange-accent rotate-[-6deg]">
              welcome →
            </span>
          </div>

          <h1 className="font-display font-bold leading-[0.85] text-[18vw] md:text-[14vw] tracking-[-0.06em]">
            <span className="block">TANMAY</span>
            <span className="block relative">
              TRIVEDI
              <svg
                aria-hidden
                viewBox="0 0 400 60"
                className="absolute -bottom-4 left-0 w-[55%] text-orange-accent"
              >
                <path
                  d="M5 40 C 80 10, 180 55, 260 25 S 380 45, 395 20"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <div className="mt-16 grid md:grid-cols-12 gap-8 md:gap-12 items-end">
            <div className="md:col-span-7 flex flex-wrap gap-2 text-sm md:text-base">
              {["Product Designer", "Web Developer", "Brand Designer"].map((r, i) => (
                <span
                  key={r}
                  className="px-4 py-2 rounded-full border border-ink/20 bg-paper"
                  style={{
                    color: [
                      "var(--orange-accent)",
                      "var(--blue-accent)",
                      "var(--ink)",
                    ][i],
                  }}
                >
                  {r}
                </span>
              ))}
            </div>
            <p className="md:col-span-5 text-lg md:text-xl text-balance leading-snug">
              3+ years of crafting meaningful products and visuals that{" "}
              <span className="font-hand text-3xl text-orange-accent">hold up</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="border-y border-ink/15 bg-paper py-5 overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap animate-[scroll_30s_linear_infinite] text-2xl md:text-4xl font-display font-medium">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-10 shrink-0">
              <span>Designing experiences</span>
              <span className="text-orange-accent">✦</span>
              <span>that help brands grow</span>
              <span className="text-blue-accent">●</span>
              <span>Landing pages</span>
              <span className="text-orange-accent">✦</span>
              <span>Visual branding</span>
              <span className="text-blue-accent">●</span>
              <span>Product design</span>
              <span className="text-orange-accent">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Works */}
      <section id="works" className="px-6 md:px-10 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground mb-3">
                ↓ below
              </p>
              <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight">
                Curated <span className="font-hand text-orange-accent">Projects</span>
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              A selection of work across branding, product design, and visual systems — each one built with intention.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <a
                key={p.title}
                href="#"
                className="group relative rounded-3xl border border-ink/15 bg-paper p-6 aspect-[4/5] flex flex-col justify-between overflow-hidden transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="px-3 py-1 rounded-full bg-ink text-paper">{p.year}</span>
                  <span className="text-muted-foreground">{p.tag}</span>
                </div>
                <div
                  className="absolute inset-x-6 top-1/2 -translate-y-1/2 aspect-square rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: p.color }}
                >
                  <span
                    className="text-5xl font-display font-bold"
                    style={{ color: p.color === "var(--yellow-accent)" ? "var(--ink)" : "white" }}
                  >
                    {p.title[0]}
                  </span>
                </div>
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-display text-xl font-semibold">{p.title}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition text-sm">
                    View →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 md:px-10 py-24 border-t border-ink/15">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-hand text-3xl text-orange-accent mb-4">let's talk —</p>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[0.9]">
              Got an idea?<br />
              <span className="text-blue-accent">Let's build it.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <a
              href="mailto:tanmay@example.com"
              className="inline-flex items-center gap-3 bg-ink text-paper px-6 py-4 rounded-full text-lg hover:bg-blue-accent transition"
            >
              tanmay@example.com →
            </a>
            <div className="flex gap-2 flex-wrap">
              {["LinkedIn", "Twitter", "Read.cv", "Dribbble"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="px-4 py-2 rounded-full border border-ink/20 bg-paper hover:bg-yellow-accent transition text-sm"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 md:px-10 py-8 flex items-center justify-between text-xs uppercase tracking-[0.18em] border-t border-ink/15">
        <span>© 2026 Tanmay Trivedi</span>
        <span className="text-muted-foreground">Made with care in India</span>
      </footer>

      {/* Floating menu pill */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-ink text-paper p-1.5 rounded-full shadow-lg">
        {[
          { l: "Home", h: "#" },
          { l: "Works", h: "#works" },
          { l: "Contact", h: "#contact" },
        ].map((i, idx) => (
          <a
            key={i.l}
            href={i.h}
            className={`px-4 py-2 rounded-full text-sm transition ${
              idx === 0 ? "bg-yellow-accent text-ink" : "hover:bg-white/10"
            }`}
          >
            {i.l}
          </a>
        ))}
      </nav>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}
