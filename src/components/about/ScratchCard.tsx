"use client";

import { useEffect, useRef } from "react";

interface ScratchCardProps {
  width: number;
  height: number;
  brushSize?: number;
  coverColor?: string;
  finishPercent?: number;
  children: React.ReactNode;
}

export default function ScratchCard({
  width,
  height,
  brushSize = 36,
  coverColor = "#bdbdbd",
  finishPercent = 55,
  children,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const finished = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = coverColor;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "destination-out";
  }, [width, height, coverColor]);

  const scratch = (x: number, y: number) => {
    if (finished.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
    checkFinish();
  };

  const checkFinish = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < img.length; i += 4) if (img[i] === 0) cleared++;
    const percent = (cleared / (img.length / 4)) * 100;

    if (percent >= finishPercent) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      finished.current = true;
    }
  };

  const pos = (e: PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <div className="relative select-none" style={{ width, height }}>
      <div className="absolute inset-0 z-0 rounded-xl overflow-hidden">
        {children}
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 touch-none cursor-pointer"
        onPointerDown={(e) => {
          isDrawing.current = true;
          const p = pos(e.nativeEvent);
          scratch(p.x, p.y);
        }}
        onPointerMove={(e) => {
          if (!isDrawing.current) return;
          const p = pos(e.nativeEvent);
          scratch(p.x, p.y);
        }}
        onPointerUp={() => (isDrawing.current = false)}
        onPointerLeave={() => (isDrawing.current = false)}
      />
    </div>
  );
}
