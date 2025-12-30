"use client";

import { useEffect, useRef } from "react";

interface PolaroidCardProps {
  src: string;
  caption?: string;
}

export default function PolaroidCard({ src, caption }: PolaroidCardProps) {
  const card = useRef<HTMLDivElement | null>(null);

  const target = useRef({ rx: -3, ry: 0, rz: -3 });
  const current = useRef({ rx: -3, ry: 0, rz: -3 });

  useEffect(() => {
    let raf: number;
    const animate = () => {
      current.current.rx += (target.current.rx - current.current.rx) * 0.08;
      current.current.ry += (target.current.ry - current.current.ry) * 0.08;
      current.current.rz += (target.current.rz - current.current.rz) * 0.08;

      if (card.current) {
        card.current.style.transform = `
          perspective(900px)
          rotateX(${current.current.rx}deg)
          rotateY(${current.current.ry}deg)
          rotateZ(${current.current.rz}deg)
        `;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  const move = (e: React.MouseEvent) => {
    const r = card.current!.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;

    target.current.ry = x / 28;
    target.current.rx = -y / 28;
    target.current.rz = -3;
  };

  const reset = () => {
    target.current.rx = -3;
    target.current.ry = 0;
    target.current.rz = -3;
  };

  return (
    <div className="w-[260px] h-[320px]">
      <div
        ref={card}
        onMouseMove={move}
        onMouseLeave={reset}
        className="relative w-full h-full rounded-xl bg-[#f3f1ec] p-3 pb-12 shadow-2xl will-change-transform"
      >
        <img src={src} className="w-full h-full object-cover rounded-md" />
        {caption && (
          <div className="absolute bottom-3 left-0 right-0 text-center text-sm font-semibold text-gray-700">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}
