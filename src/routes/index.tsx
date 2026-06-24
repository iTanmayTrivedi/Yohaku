import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  type MotionValue,
} from "motion/react";

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

// Magnetic button — pulls toward cursor
function Magnetic({ children, strength = 0.35, className = "" }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Word-by-word reveal
function RevealText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(" ");
  return (
    <div ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.7, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

// 3D tilt project card
function ProjectCard({ p, i, scrollY }: { p: typeof projects[0]; i: number; scrollY: MotionValue<number> }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 250, damping: 20 });
  const sry = useSpring(ry, { stiffness: 250, damping: 20 });
  const [hover, setHover] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 18);
    rx.set(-py * 18);
  };

  // Subtle parallax per card based on index
  const yOffset = useTransform(scrollY, [0, 1], [0, (i % 2 === 0 ? -30 : 30)]);

  return (
    <motion.a
      ref={ref}
      href="#"
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        rx.set(0);
        ry.set(0);
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: srx,
        rotateY: sry,
        y: yOffset,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-3xl border border-ink/15 bg-paper p-6 aspect-[4/5] flex flex-col justify-between overflow-hidden"
    >
      <div className="flex items-center justify-between text-sm" style={{ transform: "translateZ(40px)" }}>
        <span className="px-3 py-1 rounded-full bg-ink text-paper">{p.year}</span>
        <span className="text-muted-foreground">{p.tag}</span>
      </div>

      <motion.div
        className="absolute inset-x-6 top-1/2 -translate-y-1/2 aspect-square rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: p.color, transform: "translateZ(60px)" }}
        animate={{ scale: hover ? 1.08 : 1, rotate: hover ? 4 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.span
          className="text-6xl font-display font-bold"
          style={{ color: p.color === "var(--yellow-accent)" ? "var(--ink)" : "white" }}
          animate={{ y: hover ? -6 : 0 }}
        >
          {p.title[0]}
        </motion.span>
      </motion.div>

      <div className="relative z-10 flex items-center justify-between" style={{ transform: "translateZ(40px)" }}>
        <span className="font-display text-xl font-semibold">{p.title}</span>
        <motion.span
          className="text-sm inline-flex items-center gap-1"
          animate={{ x: hover ? 0 : -8, opacity: hover ? 1 : 0 }}
        >
          View →
        </motion.span>
      </div>
    </motion.a>
  );
}

function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 30 });
  const sy = useSpring(y, { stiffness: 400, damping: 30 });
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      const l = t.closest("[data-cursor]")?.getAttribute("data-cursor");
      setLabel(l ?? null);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
    >
      <motion.div
        animate={{ scale: label ? 4 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-orange-accent mix-blend-difference"
      >
        {label && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[3px] font-medium text-white whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}

function Index() {
  const [time, setTime] = useState("");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroProgress, [0, 1], [0, -150]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.85]);

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
      <CustomCursor />

      {/* scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-orange-accent z-[60] origin-left"
      />

      <header className="flex items-center justify-between px-6 md:px-10 py-6 text-xs uppercase tracking-[0.18em] relative z-10">
        <span className="font-medium">Tanmay Trivedi</span>
        <span className="hidden sm:inline text-muted-foreground">
          Available for work · {time} IST
        </span>
        <span className="bg-ink text-paper px-3 py-1 rounded-full">2026</span>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="px-6 md:px-10 pt-10 md:pt-20 pb-32 relative">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="inline-flex items-center gap-2 bg-blue-accent text-white px-4 py-1.5 rounded-full text-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Hey there!
            </span>
            <motion.span
              animate={{ rotate: [-6, 4, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="font-hand text-2xl text-orange-accent inline-block"
            >
              welcome →
            </motion.span>
          </motion.div>

          <h1 className="font-display font-bold leading-[0.85] text-[18vw] md:text-[14vw] tracking-[-0.06em]">
            <RevealText text="TANMAY" className="block" />
            <div className="block relative">
              <RevealText text="TRIVEDI" delay={0.15} />
              <motion.svg
                aria-hidden
                viewBox="0 0 400 60"
                className="absolute -bottom-4 left-0 w-[55%] text-orange-accent"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
              >
                <motion.path
                  d="M5 40 C 80 10, 180 55, 260 25 S 380 45, 395 20"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 1 }}
                />
              </motion.svg>
            </div>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-16 grid md:grid-cols-12 gap-8 md:gap-12 items-end"
          >
            <div className="md:col-span-7 flex flex-wrap gap-2 text-sm md:text-base">
              {["Product Designer", "Web Developer", "Brand Designer"].map((r, i) => (
                <motion.span
                  key={r}
                  whileHover={{ scale: 1.08, y: -4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="px-4 py-2 rounded-full border border-ink/20 bg-paper cursor-pointer"
                  style={{
                    color: ["var(--orange-accent)", "var(--blue-accent)", "var(--ink)"][i],
                  }}
                >
                  {r}
                </motion.span>
              ))}
            </div>
            <p className="md:col-span-5 text-lg md:text-xl text-balance leading-snug">
              3+ years of crafting meaningful products and visuals that{" "}
              <span className="font-hand text-3xl text-orange-accent">hold up</span>.
            </p>
          </motion.div>
        </motion.div>
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
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-sm uppercase tracking-[0.18em] text-muted-foreground mb-3"
              >
                ↓ below
              </motion.p>
              <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight">
                <RevealText text="Curated" />
                <span className="font-hand text-orange-accent"> Projects</span>
              </h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-md text-muted-foreground"
            >
              A selection of work across branding, product design, and visual systems — each one built with intention.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" data-cursor="open">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} p={p} i={i} scrollY={scrollYProgress} />
            ))}
          </div>
        </div>
      </section>

      {/* Big scroll-reveal statement */}
      <section className="px-6 md:px-10 py-32 border-t border-ink/15">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl md:text-7xl font-display font-bold leading-tight tracking-tight">
            <RevealText text="Design is not what it looks like." />
            <span className="block text-orange-accent">
              <RevealText text="It's what it does." />
            </span>
          </h3>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 md:px-10 py-24 border-t border-ink/15">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-hand text-3xl text-orange-accent mb-4">let's talk —</p>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[0.9]">
              <RevealText text="Got an idea?" />
              <span className="text-blue-accent block">
                <RevealText text="Let's build it." delay={0.2} />
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <Magnetic>
              <a
                data-cursor="mail"
                href="mailto:tanmay@example.com"
                className="inline-flex items-center gap-3 bg-ink text-paper px-6 py-4 rounded-full text-lg hover:bg-blue-accent transition"
              >
                tanmay@example.com →
              </a>
            </Magnetic>
            <div className="flex gap-2 flex-wrap">
              {["LinkedIn", "Twitter", "Read.cv", "Dribbble"].map((s) => (
                <motion.a
                  key={s}
                  href="#"
                  whileHover={{ y: -4, backgroundColor: "var(--yellow-accent)" }}
                  className="px-4 py-2 rounded-full border border-ink/20 bg-paper text-sm"
                >
                  {s}
                </motion.a>
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
      <Magnetic strength={0.2}>
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-ink text-paper p-1.5 rounded-full shadow-lg"
        >
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
        </motion.nav>
      </Magnetic>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}
