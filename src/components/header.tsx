"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const items = ["Projects", "About", "Playground", "Resume"];
  const pathname = usePathname() || "/";

  console.log("pathname:", pathname);
  return (
    <header className="w-full flex items-center justify-between py-4 px-6">
      <div className="text-xl">Mohit Sharma</div>

      <nav className="text-base flex gap-6 items-center" aria-label="Primary">
        {items.map((it) => {
          const path = `/${it.toLowerCase()}`;
          const isActive = pathname === path || pathname.startsWith(path + "/");

          return (
            <Link
              key={it}
              href={path}
              aria-current={isActive ? "page" : undefined}
              className={`transition-colors [font-family:var(--Manrope)] ${
                isActive ? "text-white" : "text-[#ffffff80]"
              }`}
            >
              {it}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
