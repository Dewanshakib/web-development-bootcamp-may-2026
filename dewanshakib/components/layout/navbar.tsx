"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import SignIn from "../auth/sign-in";
import Image from "next/image";
import logo from "@/public/assets/khorcha_logo-Photoroom.svg";

const navLinks = [
  {
    id: 1,
    src: "#",
    name: "Features",
  },
  {
    id: 2,
    src: "#",
    name: "Pricing",
  },
  {
    id: 3,
    src: "#",
    name: "Testomonials",
  },
  {
    id: 4,
    src: "#",
    name: "FAQ",
  },
];

export default function Navbar() {
  return (
    <header className="sticky shadow-2xs top-0 z-50 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="flex py-4 w-full items-center justify-between px-5">
        {/* logo */}
        <Link
          href="/"
          className="relative w-36 h-11 shrink-0 "
        >
          <Image
            src={logo}
            fill
            className="object-contain"
            alt="processi - brand logo"
            priority
          />
        </Link>

        {/* navlinks */}
        <div className="flex items-center gap-x-5">
          {navLinks.map((n) => (
            <Link key={n.id} href={n.src}>
              {n.name}
            </Link>
          ))}
        </div>

        {/* auth button */}
        <div className="flex items-center gap-x-3">
          <ThemeToggle />
          <SignIn variant={"default"} title="Get Started" />
        </div>
      </div>
    </header>
  );
}
