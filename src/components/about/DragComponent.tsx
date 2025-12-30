"use client";
import { useRef } from "react";

/* ======================= */
/*  MAIN CANVAS COMPONENT  */
/* ======================= */

export default function DragComponent() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const pos = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);

  const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));

  const clampBounds = () => {
    if (!rootRef.current || !canvasRef.current) return;

    const root = rootRef.current.getBoundingClientRect();
    const canvas = canvasRef.current.getBoundingClientRect();

    const minX = root.width - canvas.width;
    const minY = root.height - canvas.height;

    pos.current.x = clamp(pos.current.x, minX, 0);
    pos.current.y = clamp(pos.current.y, minY, 0);
  };

  const update = () => {
    if (!canvasRef.current) return;
    canvasRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
  };

  return (
    <div
      ref={rootRef}
      className="relative w-full h-full overflow-hidden bg-neutral-200 rounded-xl select-none"
      onWheel={(e) => {
        e.preventDefault();
        pos.current.x -= e.deltaX;
        pos.current.y -= e.deltaY;
        clampBounds();
        update();
      }}
    >
      {/* Drag Overlay */}
      <div
        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => {
          dragging.current = true;
          start.current = {
            x: e.clientX - pos.current.x,
            y: e.clientY - pos.current.y,
          };
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return;
          pos.current.x = e.clientX - start.current.x;
          pos.current.y = e.clientY - start.current.y;
          clampBounds();
          update();
        }}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      />

      {/* Giant Canvas */}
      <div
        ref={canvasRef}
        className="absolute left-0 top-0 w-[200vw] h-[200vh] p-24 will-change-transform"
      >
        <section className="max-w-[480px] rounded-2xl bg-white p-8 shadow-sm border space-y-8">
          <header className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img src="/avatar.jpg" className="w-14 h-14 rounded-full object-cover" />
              <div>
                <h2 className="font-semibold text-lg">Andre Souza</h2>
                <p className="text-sm text-gray-500">Design Engineer</p>
              </div>
            </div>
          </header>

          <div className="text-sm text-gray-700 leading-relaxed space-y-4">
            <p>
              Welcome to <em className="not-italic font-medium">my space on the internet</em>. I'm a design engineer who crafts
              interactions that spark joy, delight, and a sense of magic in users.
            </p>
            <p>
              Growing up, I spent hours playing Street Fighter, Donkey Kong, and Super Mario with my dad.
            </p>
            <p>Have fun exploring my portfolio.</p>
          </div>

          <div className="space-y-3">
            <Experience color="bg-sky-500" company="Praia Health" role="Staff Product Designer" period="2024 – Present" />
            <Experience color="bg-emerald-500" company="Stone" role="Specialist Product Designer" period="2022 – 2024" />
            <Experience color="bg-lime-600" company="Pagar.me" role="Senior Product Designer" period="2019 – 2022" />
            <Experience color="bg-orange-500" company="Try" role="UX Designer & Researcher" period="2018 – 2019" />
            <Experience color="bg-indigo-700" company="National Council of Science" role="UX Designer" period="2018" />
          </div>
        </section>
      </div>
    </div>
  );
}

/* ======================= */
/*     EXPERIENCE CARD     */
/* ======================= */

function Experience({
  color,
  company,
  role,
  period,
}: {
  color: string;
  company: string;
  role: string;
  period: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4 bg-white">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-md ${color}`} />
        <div>
          <div className="font-medium">{company}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      </div>
      <span className="text-xs px-3 py-1 rounded-full bg-gray-50 border text-gray-600">
        {period}
      </span>
    </div>
  );
}
