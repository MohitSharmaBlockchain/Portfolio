"use client";

import { useEffect, useRef, useState } from "react";

interface CDSleevePlayerProps {
  cover: string;
  title: string;
}

export default function CDSleevePlayer({ cover, title }: CDSleevePlayerProps) {
  const [open, setOpen] = useState(false);
  const discRef = useRef<HTMLDivElement | null>(null);
  const spinRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open || !spinRef.current) return;

    let rot = 0;
    let raf: number;

    const spin = () => {
      rot += 0.35;
      spinRef.current!.style.transform = `rotate(${rot}deg)`;
      raf = requestAnimationFrame(spin);
    };

    spin();
    return () => cancelAnimationFrame(raf);
  }, [open]);

  return (
    <div className="relative w-[300px] h-[300px] group">
      {/* DISC (behind) */}
      <div
        ref={discRef}
        className={`absolute left-[120px] top-[120px] transition-transform duration-700
        ${open ? "translate-x-[160px]" : "translate-x-0"}`}
        style={{ width: 240, height: 240 }}
      >
        <div ref={spinRef} className="w-full h-full rounded-full vinyl-disc">
          <div className="absolute inset-[35%] rounded-full overflow-hidden">
            <img src={cover.src} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* COVER */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`absolute inset-0 rounded-2xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(.3,.8,.2,1)]
        ${open ? "-rotate-12 translate-x-[-50px]" : ""}`}
      >
        <img src={cover.src} className="w-full h-full object-cover" />
      </button>

      {/* TITLE */}
      <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 bg-black/70 text-white px-5 py-1.5 rounded-full backdrop-blur opacity-0 group-hover:opacity-100 transition">
        {title}
      </div>
    </div>
  );
}
