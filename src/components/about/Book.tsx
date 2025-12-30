"use client";

import { useState } from "react";

interface OpeningBookProps {
  title: string;
  cover: string;
}

export default function OpeningBook({ title, cover }: OpeningBookProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative w-[210px] h-[280px] book-perspective"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Book Body */}
      <div className="absolute inset-0 book-shell">

        {/* Pages */}
        <div className="absolute right-0 top-1 bottom-1 w-[14px] book-pages" />

        {/* Cover */}
        <div
          className={`absolute inset-0 rounded-xl overflow-hidden book-cover transition-transform duration-700 ease-[cubic-bezier(.3,.9,.2,1)]
            ${open ? "book-open" : ""}`}
        >
          <img src={cover.src} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Floating Title */}
      <div
        className={`absolute -bottom-12 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-1 rounded-full text-sm backdrop-blur transition-all duration-500
        ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        {title}
      </div>
    </div>
  );
}
