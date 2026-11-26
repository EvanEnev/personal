"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  animate, motion, useAnimationFrame, useInView, useMotionValue, useMotionValueEvent,
  useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap,
} from "motion/react";

export function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [p, setP] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, 1, { duration: reduce ? 0 : 1.6, ease: [0.2, 0.7, 0.2, 1], onUpdate: setP });
    return () => c.stop();
  }, [inView, reduce]);

  return (
    <>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true">{value.replace(/\d+/g, (n) => String(Math.round(+n * p)))}</span>
    </>
  );
}

export function Ticker({ words }: { words: string[] }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);
  const reduce = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b) dir.current = Math.sign(b);
    x.set(wrap(-50, 0, x.get() - dir.current * 1.1 * (delta / 1000) * (1 + Math.abs(b))));
  });

  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-ink bg-accent py-4.5 text-white">
      <motion.div style={{ x: useTransform(x, (v) => `${v}%`) }} className="flex w-max">
        {[...words, ...words].map((w, i) => (
          <span key={i} className="pr-10 font-display text-[32px] font-extrabold tracking-[-0.01em] whitespace-nowrap">
            {w} <span className="pl-9 opacity-60">✳</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Accordion({ items }: { items: { head: React.ReactNode; body: React.ReactNode }[] }) {
  const [open, setOpen] = useState(0);
  const id = useId();

  return items.map((item, i) => (
    <div key={i} data-open={open === i || undefined} className="group/item reveal border-b border-ink">
      <button
        type="button"
        aria-expanded={open === i}
        aria-controls={`${id}-${i}`}
        onClick={() => setOpen(open === i ? -1 : i)}
        className="grid w-full cursor-pointer grid-cols-[2rem_1fr_1.75rem] items-baseline gap-x-8 gap-y-3 px-2 py-7 text-left transition-colors hover:bg-neutral-500/12 md:grid-cols-[2rem_1fr_1fr_1.75rem]"
      >
        {item.head}
      </button>
      <div
        id={`${id}-${i}`}
        inert={open !== i}
        className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-data-open/item:grid-rows-[1fr] motion-reduce:transition-none"
      >
        <div className="overflow-hidden">{item.body}</div>
      </div>
    </div>
  ));
}

export function StickyHeader({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setHidden(y > 120 && y > (scrollY.getPrevious() ?? 0)));

  return (
    <motion.div
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 z-20 bg-paper/85 backdrop-blur-md"
    >
      {children}
    </motion.div>
  );
}
