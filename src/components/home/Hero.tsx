"use client";

export default function Hero() {
  const dots = Array.from(window.document.querySelectorAll(".dot")) as HTMLElement[];

  let mouse = { x: 0, y: 0 };
  let raf: number | null = null;

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (!raf) raf = requestAnimationFrame(update);
  });

  function update() {
    raf = 0;

    for (const dot of dots) {
      const r = dot.getBoundingClientRect();
      const dx = mouse.x - (r.left + r.width / 2);
      const dy = mouse.y - (r.top + r.height / 2);
      const d = Math.sqrt(dx * dx + dy * dy);

      // falloff curve
      const influence = Math.max(0, 1 - d / 160);

      const scale =
        1 +
        influence * 1.1 + // center hit ~2x
        influence * influence * 0.8;

      dot.style.transform = `scale(${scale})`;
    }
  }

  return (
    <div className="w-full h-[calc(100vh-70px)]">
      <div id="dotGrid" className="dot-grid">
        {Array.from({ length: 400 }).map((_, i) => (
          <span key={i} className="dot" />
        ))}
      </div>
    </div>
  );
}
