import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  AnimatePresence,
  type MotionValue,
} from "motion/react";

export const Route = createFileRoute("/")({
  component: Index,
});

const projects = [
  { year: "2025", title: "Lumen", tag: "Product design", desc: "An AI-native analytics workspace rebuilt around speed and clarity.", color: "var(--blue-accent)", role: "Lead Designer", time: "4 mo" },
  { year: "2025", title: "Northwind", tag: "Marketing website", desc: "A landing page system for a B2B SaaS that tripled their sign-ups.", color: "var(--orange-accent)", role: "Designer & Dev", time: "6 wks" },
  { year: "2024", title: "Folio", tag: "Visual branding", desc: "Identity, type, and motion for a boutique publishing house.", color: "var(--yellow-accent)", role: "Brand Designer", time: "8 wks" },
  { year: "2024", title: "Quartz", tag: "Product design", desc: "A focused habit tracker that respects your attention.", color: "var(--ink)", role: "Product Designer", time: "3 mo" },
  { year: "2023", title: "Maple & Co.", tag: "Marketing website", desc: "Editorial-led commerce experience for a heritage coffee roaster.", color: "var(--blue-accent)", role: "Designer", time: "5 wks" },
  { year: "2023", title: "Ember", tag: "Visual branding", desc: "Warm, confident identity for a fireside conversations podcast.", color: "var(--orange-accent)", role: "Brand & Web", time: "4 wks" },
];

const services = [
  { num: "01", title: "Product Design", lines: ["UX strategy", "Interface design", "Design systems", "Prototyping"] },
  { num: "02", title: "Web Development", lines: ["React / TanStack", "Framer Motion", "Tailwind systems", "Performance"] },
  { num: "03", title: "Brand Identity", lines: ["Logo & marks", "Type systems", "Guidelines", "Launch assets"] },
];

const testimonials = [
  { q: "Tanmay shipped faster than our entire in-house team — and the result felt like ours, not his.", a: "— Aanya Patel, Northwind" },
  { q: "Easily one of the most considered designers I've worked with. Every detail had a reason.", a: "— Rohan Mehta, Lumen" },
  { q: "He made our brand feel inevitable. Like it had always existed.", a: "— Sara Iyer, Folio" },
];

const stack = ["Figma", "React", "TanStack", "Tailwind", "Motion", "Rive", "Blender", "After Effects", "Notion", "Linear"];

// ---------- helpers ----------
function Magnetic({ children, strength = 0.35, className = "" }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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

function CharReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className={className} aria-label={text}>
      {[...text].map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, rotate: -8 }}
          animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </span>
  );
}

function ScrambleText({ text, trigger }: { text: string; trigger: boolean }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!trigger) { setOut(text); return; }
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*+";
    let i = 0; let raf = 0;
    const tick = () => {
      i++;
      const next = text.split("").map((c, idx) =>
        idx < i / 2 ? c : (c === " " ? " " : chars[Math.floor(Math.random() * chars.length)])
      ).join("");
      setOut(next);
      if (i / 2 < text.length) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, text]);
  return <>{out}</>;
}

function Tilt({ children, className = "", max = 14 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 18 });
  const sry = useSpring(ry, { stiffness: 220, damping: 18 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * max); rx.set(-py * max);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScrollWord({ word, start, end, progress, accent }: { word: string; start: number; end: number; progress: MotionValue<number>; accent?: boolean }) {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [14, 0]);
  return (
    <motion.span style={{ opacity, y, color: accent ? "var(--orange-accent)" : undefined }} className="inline-block mr-[0.18em]">
      {word}
    </motion.span>
  );
}

function ScrollFillStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.3"] });
  const line1 = "Design is not what it looks like.".split(" ");
  const line2 = "It's what it does.".split(" ");
  const total = line1.length + line2.length;
  return (
    <div ref={ref} className="text-4xl md:text-7xl font-display font-bold leading-tight tracking-tight">
      <div>
        {line1.map((w, i) => (
          <ScrollWord key={`a${i}`} word={w} start={i / total} end={(i + 1) / total} progress={scrollYProgress} />
        ))}
      </div>
      <div>
        {line2.map((w, i) => {
          const idx = line1.length + i;
          return <ScrollWord key={`b${i}`} word={w} start={idx / total} end={(idx + 1) / total} progress={scrollYProgress} accent />;
        })}
      </div>
    </div>
  );
}

function FloatingSticker({ children, className = "", driftRange = 60, delay = 0 }: { children: React.ReactNode; className?: string; driftRange?: number; delay?: number }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -driftRange]);
  return (
    <motion.div
      style={{ y }}
      animate={{ rotate: [-12, 12, -12], translateY: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      whileHover={{ scale: 1.3, rotate: 0 }}
      className={`pointer-events-auto absolute select-none cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

function ScrollDial() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  return (
    <motion.div style={{ rotate }} className="pointer-events-none fixed bottom-8 left-8 z-40 w-24 h-24 hidden lg:block">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <path id="dial-circle" d="M 50 50 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" />
        </defs>
        <text fill="var(--ink)" fontSize="9" letterSpacing="2" className="font-display font-semibold uppercase">
          <textPath href="#dial-circle">● scroll ● tanmay ● trivedi ● portfolio 2026 </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg text-orange-accent">✦</div>
    </motion.div>
  );
}

function ConfettiBurst({ trigger }: { trigger: number }) {
  const colors = ["var(--orange-accent)", "var(--blue-accent)", "var(--yellow-accent)", "var(--ink)"];
  const pieces = trigger > 0 ? Array.from({ length: 24 }).map((_, i) => ({
    id: `${trigger}-${i}`,
    x: (Math.random() - 0.5) * 360,
    y: -120 - Math.random() * 180,
    r: Math.random() * 720 - 360,
    c: colors[i % colors.length],
    d: Math.random() * 0.15,
    s: 6 + Math.random() * 10,
  })) : [];
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <AnimatePresence>
        {pieces.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
            animate={{ x: p.x, y: p.y, rotate: p.r, opacity: 0, scale: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, delay: p.d, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: p.s, height: p.s, backgroundColor: p.c, borderRadius: 2 }}
            className="absolute"
          />
        ))}
      </AnimatePresence>
    </span>
  );
}

function StickyStack({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-78%"]);
  return (
    <div ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <p className="px-6 md:px-10 text-sm uppercase tracking-[0.18em] text-muted-foreground mb-6">↳ the toolkit</p>
        <motion.div style={{ x }} className="flex gap-10 whitespace-nowrap will-change-transform">
          {items.map((t, i) => (
            <span
              key={t}
              className="shrink-0 font-display font-bold text-[14vw] leading-none tracking-tight"
              style={i % 4 === 3
                ? { color: "transparent", WebkitTextStroke: "2px var(--ink)" } as React.CSSProperties
                : { color: i % 3 === 0 ? "var(--orange-accent)" : i % 3 === 1 ? "var(--ink)" : "var(--blue-accent)" }}
            >
              {t} ✦
            </span>
          ))}
        </motion.div>
        <p className="px-6 md:px-10 text-right text-sm uppercase tracking-[0.18em] text-muted-foreground mt-6">scroll →</p>
      </div>
    </div>
  );
}


function ProjectCard({ p, i, scrollY }: { p: typeof projects[0]; i: number; scrollY: MotionValue<number> }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 250, damping: 20 });
  const sry = useSpring(ry, { stiffness: 250, damping: 20 });
  const [hover, setHover] = useState(false);
  const yOffset = useTransform(scrollY, [0, 1], [0, (i % 2 === 0 ? -40 : 40)]);

  return (
    <motion.a
      ref={ref}
      href="#"
      data-cursor="open"
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 16);
        rx.set(-py * 16);
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); rx.set(0); ry.set(0); }}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: srx, rotateY: sry, y: yOffset, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className="group relative rounded-3xl border border-ink/15 bg-paper p-6 aspect-[4/5] flex flex-col justify-between overflow-hidden"
    >
      {/* spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: useTransform([mx, my], ([x, y]: number[]) => `radial-gradient(220px circle at ${x}px ${y}px, ${p.color}25, transparent 70%)`),
        }}
      />

      <div className="flex items-center justify-between text-sm relative z-10" style={{ transform: "translateZ(40px)" }}>
        <span className="px-3 py-1 rounded-full bg-ink text-paper">{p.year}</span>
        <span className="text-muted-foreground">{p.tag}</span>
      </div>

      <motion.div
        className="absolute inset-x-6 top-1/2 -translate-y-1/2 aspect-square rounded-2xl flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: p.color, transform: "translateZ(60px)" }}
        animate={{ scale: hover ? 1.06 : 1, rotate: hover ? 3 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.span
          className="text-7xl font-display font-bold"
          style={{ color: p.color === "var(--yellow-accent)" ? "var(--ink)" : "white" }}
          animate={{ y: hover ? -8 : 0, scale: hover ? 1.1 : 1 }}
        >
          {p.title[0]}
        </motion.span>
        {/* shine sweep */}
        <motion.div
          className="absolute inset-0"
          style={{ background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)" }}
          initial={{ x: "-120%" }}
          animate={{ x: hover ? "120%" : "-120%" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </motion.div>

      <div className="relative z-10 flex flex-col gap-1" style={{ transform: "translateZ(40px)" }}>
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl font-semibold"><ScrambleText text={p.title} trigger={hover} /></span>
          <motion.span className="text-sm inline-flex items-center gap-1" animate={{ x: hover ? 0 : -8, opacity: hover ? 1 : 0 }}>
            Open →
          </motion.span>
        </div>
        <motion.p
          className="text-sm text-muted-foreground leading-snug"
          initial={false}
          animate={{ opacity: hover ? 1 : 0.7, y: hover ? 0 : 4 }}
        >
          {p.desc}
        </motion.p>
      </div>
    </motion.a>
  );
}

function ParticleTrail() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; dx: number; dy: number; size: number; color: string; hot: boolean }>>([]);
  const idRef = useRef(0);
  const lastRef = useRef({ x: 0, y: 0, t: 0 });

  useEffect(() => {
    const colors = ["var(--orange-accent)", "var(--blue-accent)", "var(--yellow-accent)"];
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastRef.current.x;
      const dy = e.clientY - lastRef.current.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 8 || now - lastRef.current.t < 16) return;
      lastRef.current = { x: e.clientX, y: e.clientY, t: now };

      const t = e.target as HTMLElement;
      const hot = !!t.closest("[data-cursor],a,button");
      const count = hot ? 4 : 1;

      setParticles((prev) => {
        const next = [...prev];
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = hot ? 30 + Math.random() * 60 : 10 + Math.random() * 20;
          next.push({
            id: idRef.current++,
            x: e.clientX,
            y: e.clientY,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed - (hot ? 20 : 6),
            size: hot ? 6 + Math.random() * 8 : 4 + Math.random() * 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            hot,
          });
        }
        return next.slice(-80);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 0.9, scale: 1 }}
            animate={{ x: p.x + p.dx, y: p.y + p.dy, opacity: 0, scale: 0.3, rotate: p.hot ? 180 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.hot ? 1.1 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => setParticles((prev) => prev.filter((q) => q.id !== p.id))}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: p.size,
              height: p.size,
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
              borderRadius: p.hot ? 2 : 999,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function CustomCursor() {

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const t = e.target as HTMLElement;
      const l = t.closest("[data-cursor]")?.getAttribute("data-cursor");
      setLabel(l ?? null);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div style={{ x: sx, y: sy }} className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block">
      <motion.div
        animate={{ scale: label ? 5 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-orange-accent mix-blend-difference flex items-center justify-center"
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute text-[2.6px] font-semibold text-white whitespace-nowrap uppercase tracking-wider"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function ServiceRow({ s, i }: { s: typeof services[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative border-t border-ink/15 py-8 md:py-12 cursor-pointer overflow-hidden group"
      data-cursor="hire"
    >
      {/* sliding fill */}
      <motion.div
        className="absolute inset-0 bg-ink origin-left"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: hover ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "bottom" }}
      />
      <div className="relative grid grid-cols-12 gap-4 items-baseline">
        <motion.span
          className="col-span-2 font-display text-xl md:text-2xl"
          animate={{ color: hover ? "var(--paper)" : "var(--ink)" }}
        >
          {s.num}
        </motion.span>
        <motion.h3
          className="col-span-6 md:col-span-5 font-display text-4xl md:text-6xl font-bold tracking-tight"
          animate={{ color: hover ? "var(--paper)" : "var(--ink)", x: hover ? 16 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {s.title}
        </motion.h3>
        <motion.ul
          className="col-span-4 md:col-span-5 text-sm md:text-base space-y-1"
          animate={{ color: hover ? "var(--paper)" : "var(--ink)" }}
        >
          {s.lines.map((l) => <li key={l}>— {l}</li>)}
        </motion.ul>
      </div>
    </motion.div>
  );
}

function Marquee({ items, dir = 1, accent }: { items: string[]; dir?: 1 | -1; accent: string }) {
  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-10 whitespace-nowrap text-2xl md:text-4xl font-display font-medium will-change-transform"
        style={{ animation: `marquee${dir === 1 ? "" : "Rev"} 35s linear infinite` }}
      >
        {Array.from({ length: 2 }).map((_, k) => (
          <div key={k} className="flex gap-10 shrink-0 items-center">
            {items.map((it, i) => (
              <span key={i} className="flex items-center gap-10">
                <span>{it}</span>
                <span style={{ color: accent }}>✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Mac-style dock with magnification + active indicator ----------
const NAV = [
  { l: "Home", h: "#top", id: "top", icon: "M3 12l9-9 9 9v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z" },
  { l: "About", h: "#about", id: "about", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20a8 8 0 0 1 16 0" },
  { l: "Works", h: "#works", id: "works", icon: "M3 7h18M3 12h18M3 17h12" },
  { l: "Services", h: "#services", id: "services", icon: "M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" },
  { l: "Contact", h: "#contact", id: "contact", icon: "M3 5h18v14H3zM3 5l9 8 9-8" },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function DockItem({ item, mouseX, active, onHover }: { item: typeof NAV[0]; mouseX: MotionValue<number>; active: boolean; onHover: (l: string | null) => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const distance = useTransform(mouseX, (val) => {
    const r = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - r.x - r.width / 2;
  });
  const sizeT = useTransform(distance, [-140, 0, 140], [40, 72, 40]);
  const size = useSpring(sizeT, { stiffness: 220, damping: 18, mass: 0.4 });
  const liftT = useTransform(distance, [-140, 0, 140], [0, -14, 0]);
  const lift = useSpring(liftT, { stiffness: 220, damping: 18 });

  return (
    <motion.a
      ref={ref}
      href={item.h}
      data-cursor={item.l.toLowerCase()}
      onMouseEnter={() => onHover(item.l)}
      onMouseLeave={() => onHover(null)}
      style={{ width: size, height: size, y: lift }}
      className="relative flex items-center justify-center rounded-full text-paper"
    >
      {active && (
        <motion.span
          layoutId="dock-active"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="absolute inset-0 rounded-full bg-yellow-accent"
        />
      )}
      <motion.svg viewBox="0 0 24 24" className="relative w-1/2 h-1/2" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        style={{ color: active ? "var(--ink)" : "var(--paper)" }}>
        <path d={item.icon} />
      </motion.svg>
    </motion.a>
  );
}

function Dock({ time }: { time: string }) {
  const active = useActiveSection(NAV.map((n) => n.id));
  const mouseX = useMotionValue(Infinity);
  const [label, setLabel] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // reveal on scroll past hero
  useEffect(() => {
    const onScroll = () => setOpen(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: open ? 0 : 90, opacity: open ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
    >
      {/* hovered label bubble */}
      <AnimatePresence>
        {label && (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.85 }}
            transition={{ duration: 0.18 }}
            className="px-3 py-1 rounded-full bg-ink text-paper text-xs uppercase tracking-[0.18em] shadow-lg"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>

      <Magnetic strength={0.15}>
        <motion.nav
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="relative flex items-end gap-2 bg-ink/95 backdrop-blur-xl border border-white/10 px-3 py-2 rounded-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]"
        >
          {/* shimmer line */}
          <motion.span
            aria-hidden
            className="absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-yellow-accent to-transparent"
            animate={{ x: ["-50%", "350%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <div className="flex items-center gap-1 pr-3 mr-1 border-r border-white/10 h-10">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-paper text-[10px] uppercase tracking-[0.2em] font-medium">{time || "live"}</span>
          </div>
          {NAV.map((n) => (
            <DockItem key={n.l} item={n} mouseX={mouseX} active={active === n.id} onHover={setLabel} />
          ))}
          <div className="flex items-center gap-1 pl-3 ml-1 border-l border-white/10 h-10">
            <kbd className="text-paper/70 text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-md border border-white/15">⌘ K</kbd>
          </div>
        </motion.nav>
      </Magnetic>
    </motion.div>
  );
}

function ScrollToTop({ progress }: { progress: MotionValue<number> }) {
  const [show, setShow] = useState(false);
  useEffect(() => progress.on("change", (v) => setShow(v > 0.15)), [progress]);
  const circumference = 2 * Math.PI * 18;
  const dash = useTransform(progress, (v) => `${v * circumference} ${circumference}`);
  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      data-cursor="top"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.5 }}
      whileHover={{ scale: 1.1, rotate: -8 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-paper border border-ink/15 shadow-lg flex items-center justify-center group"
      aria-label="Scroll to top"
    >
      <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90 w-full h-full">
        <circle cx="20" cy="20" r="18" fill="none" stroke="var(--ink)" strokeOpacity="0.1" strokeWidth="2" />
        <motion.circle cx="20" cy="20" r="18" fill="none" stroke="var(--orange-accent)" strokeWidth="2" strokeLinecap="round" style={{ strokeDasharray: dash }} />
      </svg>
      <motion.svg viewBox="0 0 24 24" className="w-5 h-5 relative" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"
        animate={{ y: [0, -2, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
        <path d="M12 19V5M5 12l7-7 7 7" />
      </motion.svg>
    </motion.button>
  );
}

function Index() {
  const [time, setTime] = useState("");
  const [burst, setBurst] = useState(0);

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const heroY = useTransform(heroProgress, [0, 1], [0, -200]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.82]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const blobRot = useTransform(scrollYProgress, [0, 1], [0, 180]);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <main className="grid-paper min-h-screen relative overflow-hidden">
      <CustomCursor />
      <ParticleTrail />

      <ScrollDial />

      {/* playful floating stickers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <FloatingSticker className="top-[8%] right-[6%] text-5xl" driftRange={120}>✺</FloatingSticker>
        <FloatingSticker className="top-[26%] left-[4%] font-hand text-3xl text-orange-accent rotate-[-12deg]" driftRange={80} delay={0.4}>hi there!</FloatingSticker>
        <FloatingSticker className="top-[78%] right-[8%] text-4xl text-blue-accent" driftRange={180} delay={0.8}>✦</FloatingSticker>
        <FloatingSticker className="top-[140%] left-[3%] text-6xl text-yellow-accent" driftRange={220} delay={1.2}>◉</FloatingSticker>
        <FloatingSticker className="top-[180%] right-[5%] font-hand text-3xl text-blue-accent rotate-[8deg]" driftRange={260} delay={0.6}>scroll more →</FloatingSticker>
        <FloatingSticker className="top-[240%] left-[6%] text-5xl text-orange-accent" driftRange={300} delay={1.5}>✧</FloatingSticker>
        <FloatingSticker className="top-[300%] right-[10%] text-4xl" driftRange={340} delay={0.9}>❋</FloatingSticker>
      </div>


      {/* floating blob */}
      <motion.div
        style={{ y: blobY, rotate: blobRot }}
        className="pointer-events-none absolute top-[20%] -right-40 w-[520px] h-[520px] rounded-full opacity-40 blur-3xl"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, var(--orange-accent), transparent 60%)" }} />
      </motion.div>
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        className="pointer-events-none absolute top-[60%] -left-40 w-[480px] h-[480px] rounded-full opacity-30 blur-3xl"
      >
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle at 70% 50%, var(--blue-accent), transparent 60%)" }} />
      </motion.div>

      {/* scroll progress */}
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed top-0 left-0 right-0 h-1 bg-orange-accent z-[60] origin-left" />

      <header id="top" className="flex items-center justify-between px-6 md:px-10 py-6 text-xs uppercase tracking-[0.18em] relative z-10">
        <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="font-medium">Tanmay Trivedi</motion.span>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="hidden sm:flex items-center gap-2 text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Available for work · {time} IST
        </motion.span>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          data-cursor="toggle"
          className="bg-ink text-paper px-3 py-1 rounded-full hover:bg-blue-accent transition"
        >
          {theme === "light" ? "Light" : "Dark"} · 2026
        </button>
      </header>

      {/* HERO */}
      <section ref={heroRef} className="px-6 md:px-10 pt-10 md:pt-20 pb-32 relative">
        <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-8 flex-wrap">
            <span className="inline-flex items-center gap-2 bg-blue-accent text-white px-4 py-1.5 rounded-full text-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Hey there!
            </span>
            <motion.span animate={{ rotate: [-6, 4, -6] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="font-hand text-2xl text-orange-accent inline-block">
              welcome →
            </motion.span>
          </motion.div>

          <h1 className="font-display font-bold leading-[0.85] text-[18vw] md:text-[14vw] tracking-[-0.06em]">
            <RevealText text="TANMAY" className="block" />
            <div className="block relative">
              <RevealText text="TRIVEDI" delay={0.15} />
              <motion.svg aria-hidden viewBox="0 0 400 60" className="absolute -bottom-4 left-0 w-[55%] text-orange-accent">
                <motion.path
                  d="M5 40 C 80 10, 180 55, 260 25 S 380 45, 395 20"
                  stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 1 }}
                />
              </motion.svg>
            </div>
          </h1>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.4 }} className="mt-16 grid md:grid-cols-12 gap-8 md:gap-12 items-end">
            <div className="md:col-span-7 flex flex-wrap gap-2 text-sm md:text-base">
              {["Product Designer", "Web Developer", "Brand Designer"].map((r, i) => (
                <motion.span key={r} whileHover={{ scale: 1.08, y: -4, rotate: [-2, 2, 0][i] }} transition={{ type: "spring", stiffness: 400 }} data-cursor="role"
                  className="px-4 py-2 rounded-full border border-ink/20 bg-paper cursor-pointer"
                  style={{ color: ["var(--orange-accent)", "var(--blue-accent)", "var(--ink)"][i] }}>
                  {r}
                </motion.span>
              ))}
            </div>
            <p className="md:col-span-5 text-lg md:text-xl text-balance leading-snug">
              3+ years of crafting meaningful products and visuals that{" "}
              <span className="font-hand text-3xl text-orange-accent">hold up</span>.
            </p>
          </motion.div>

          {/* stats strip */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-ink/15 pt-8">
            {[
              { n: "40+", l: "Projects shipped" },
              { n: "12", l: "Industries" },
              { n: "8", l: "Awards & features" },
              { n: "100%", l: "Repeat clients" },
            ].map((s, i) => (
              <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 + i * 0.1 }}>
                <div className="font-display text-5xl md:text-6xl font-bold">
                  <CharReveal text={s.n} delay={2 + i * 0.1} />
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-2">{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-ink/15 bg-paper py-5">
        <Marquee accent="var(--orange-accent)" items={["Designing experiences", "that help brands grow", "Landing pages", "Visual branding", "Product design"]} />
      </div>

      {/* STICKY HORIZONTAL STACK */}
      <StickyStack items={stack} />


      {/* ABOUT */}
      <section id="about" className="px-6 md:px-10 py-24 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-sm uppercase tracking-[0.18em] text-muted-foreground mb-3">↳ about</motion.p>
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[0.9]">
              <RevealText text="Designer," />
              <span className="block text-blue-accent"><RevealText text="developer," delay={0.15} /></span>
              <span className="block font-hand text-orange-accent text-6xl md:text-8xl">& storyteller.</span>
            </h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-lg leading-relaxed">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              I'm a multidisciplinary designer based in India, helping early-stage teams ship products that feel inevitable. I sit somewhere between strategy, craft and engineering — and I like it there.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              Currently freelancing with founders I admire. Previously at studios shipping work for SaaS, fintech and consumer brands.
            </motion.p>
            <div className="flex flex-wrap gap-2 pt-4">
              {stack.map((t, i) => (
                <motion.span key={t} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -3, backgroundColor: "var(--yellow-accent)" }}
                  className="px-3 py-1 rounded-full border border-ink/20 bg-paper text-sm">
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="px-6 md:px-10 py-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-sm uppercase tracking-[0.18em] text-muted-foreground mb-3">↓ below</motion.p>
              <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight">
                <RevealText text="Curated" />
                <span className="font-hand text-orange-accent"> Projects</span>
              </h2>
            </div>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-md text-muted-foreground">
              A selection of work across branding, product design and visual systems — each one built with intention.
            </motion.p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} scrollY={scrollYProgress} />)}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 md:px-10 py-24 border-t border-ink/15 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight">
              <RevealText text="What I" />
              <span className="block text-blue-accent"><RevealText text="actually do." delay={0.15} /></span>
            </h2>
            <p className="font-hand text-2xl text-orange-accent">— pick your flavour</p>
          </div>
          <div>
            {services.map((s, i) => <ServiceRow key={s.num} s={s} i={i} />)}
            <div className="border-t border-ink/15" />
          </div>
        </div>
      </section>

      {/* MARQUEE 2 */}
      <div className="border-y border-ink/15 bg-ink text-paper py-5">
        <Marquee accent="var(--yellow-accent)" dir={-1} items={["Open for Q1 2026", "Based in India", "Working globally", "Selectively taking projects", "Let's talk"]} />
      </div>

      {/* TESTIMONIALS */}
      <section className="px-6 md:px-10 py-24 relative">
        <div className="max-w-7xl mx-auto">
          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-sm uppercase tracking-[0.18em] text-muted-foreground mb-12">↳ kind words</motion.p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}>
                <Tilt className="rounded-3xl border border-ink/15 p-7 bg-paper relative h-full group overflow-hidden" max={10}>
                  <motion.div aria-hidden className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-yellow-accent/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span style={{ transform: "translateZ(40px)" }} className="block font-display text-6xl text-orange-accent leading-none relative">"</span>
                  <blockquote style={{ transform: "translateZ(30px)" }} className="text-lg leading-snug -mt-4 relative">{t.q}</blockquote>
                  <figcaption style={{ transform: "translateZ(20px)" }} className="mt-6 text-sm text-muted-foreground relative">{t.a}</figcaption>
                </Tilt>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 md:px-10 py-24 border-t border-ink/15 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-12">
            <RevealText text="How we'll" />
            <span className="font-hand text-orange-accent"> work together</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: "01", t: "Intro call", d: "30 minutes to see if it's a fit." },
              { n: "02", t: "Scope & plan", d: "Goals, timeline, deliverables — written down." },
              { n: "03", t: "Build", d: "Weekly demos, async comments, fast loops." },
              { n: "04", t: "Ship & support", d: "Launch together and stay close after." },
            ].map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-3xl border border-ink/15 p-6 bg-paper relative overflow-hidden group">
                <motion.div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-orange-accent/15 group-hover:scale-150 transition-transform duration-700" />
                <div className="font-display text-4xl font-bold text-orange-accent">{s.n}</div>
                <h3 className="font-display text-2xl font-semibold mt-4">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BIG STATEMENT */}
      <section className="px-6 md:px-10 py-32 border-t border-ink/15">
        <div className="max-w-7xl mx-auto">
          <ScrollFillStatement />
        </div>

      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 md:px-10 py-24 border-t border-ink/15">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-hand text-3xl text-orange-accent mb-4">let's talk —</p>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[0.9]">
              <RevealText text="Got an idea?" />
              <span className="text-blue-accent block"><RevealText text="Let's build it." delay={0.2} /></span>
            </h2>
            <p className="text-muted-foreground mt-6 max-w-md">Replies within 24 hours · Booking projects for Q1 2026 · Based in India, working globally.</p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <div className="relative">
              <ConfettiBurst trigger={burst} />
              <Magnetic>
                <a
                  data-cursor="mail"
                  href="mailto:tanmay@example.com"
                  onClick={() => setBurst((b) => b + 1)}
                  className="inline-flex items-center gap-3 bg-ink text-paper px-6 py-4 rounded-full text-lg hover:bg-blue-accent transition relative"
                >
                  tanmay@example.com →
                </a>
              </Magnetic>
            </div>

            <div className="flex gap-2 flex-wrap md:justify-end">
              {["LinkedIn", "Twitter", "Read.cv", "Dribbble", "GitHub"].map((s) => (
                <Magnetic key={s} strength={0.5}>
                  <motion.a href="#" data-cursor={s.toLowerCase()} whileHover={{ y: -4, backgroundColor: "var(--yellow-accent)", scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="block px-4 py-2 rounded-full border border-ink/20 bg-paper text-sm">{s}</motion.a>
                </Magnetic>
              ))}
            </div>

          </div>
        </div>
      </section>

      <footer className="px-6 md:px-10 py-8 flex items-center justify-between text-xs uppercase tracking-[0.18em] border-t border-ink/15">
        <span>© 2026 Tanmay Trivedi</span>
        <span className="text-muted-foreground">Made with care in India</span>
      </footer>

      <Dock time={time} />
      <ScrollToTop progress={scrollYProgress} />

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marqueeRev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </main>
  );
}
