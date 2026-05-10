"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import SignIn from "../auth/sign-in";

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
        <div className="">
          <h1>Khorcha</h1>
        </div>

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
          <SignIn variant={"outline"} title="Login" />
          <SignIn variant={"default"} title="Get Started" />
        </div>
      </div>
    </header>
  );
}
