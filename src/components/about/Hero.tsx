"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const images = [
  "https://framerusercontent.com/images/WLJQduFa6kJyPUYts7PLBSvy2A.jpg?width=20&height=20",
  "https://framerusercontent.com/images/WLJQduFa6kJyPUYts7PLBSvy2A.jpg?width=20&height=20",
  "https://framerusercontent.com/images/WLJQduFa6kJyPUYts7PLBSvy2A.jpg?width=20&height=20",
  "https://framerusercontent.com/images/WLJQduFa6kJyPUYts7PLBSvy2A.jpg?width=20&height=20",
  "https://framerusercontent.com/images/WLJQduFa6kJyPUYts7PLBSvy2A.jpg?width=20&height=20",
];

export default function ImageTrail() {
  const container = useRef<HTMLDivElement | null>(null);
  const last = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
        console.log(e.clientX, e.clientY);
      const now = Date.now();
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      const dist = Math.hypot(dx, dy);
      const dt = now - lastTime.current;
      const speed = dist / dt;

      // Faster speed = tighter spacing
      const threshold = gsap.utils.clamp(8, 120, 160 / (speed + 0.2));

      if (dist > threshold) {
        spawn(e.clientX, e.clientY);
        last.current = { x: e.clientX, y: e.clientY };
        lastTime.current = now;
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const spawn = (x: number, y: number) => {
    const el = document.createElement("img");
    el.src = images[Math.floor(Math.random() * images.length)];
    el.className = "trail-img";
    container.current!.appendChild(el);

    gsap.fromTo(
      el,
      { x: x - 100, y: y - 100, scale: 0.6, opacity: 1 },
      {
        scale: 1.1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => el.remove(),
      }
    );
  };

  return <div ref={container} className="fixed inset-0 pointer-events-none w-screen h-screen" />;
}
