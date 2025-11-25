"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Home, User, FolderGit2, Mail } from "lucide-react";

export default function Sidebar() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    gsap.from(ref.current, {
      x: -40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });
  }, []);

  return (
    <aside
      ref={ref}
      className="absolute  h-full w-24 bg-cyber-dark border-r border-cyber-accentRed/40 flex flex-col items-center py-8 gap-8 rounded-r-3xl shadow-xl"
    >
      <div className="w-14 h-14 rounded-full bg-black border border-cyber-accentRed flex items-center justify-center text-cyber-accentRed font-audiowide text-xl">
        A
      </div>

      <nav className="flex flex-col gap-6">
        <Btn icon={<Home size={26} />} />
        <Btn icon={<User size={26} />} />
        <Btn icon={<FolderGit2 size={26} />} />
        <Btn icon={<Mail size={26} />} />
      </nav>

      <div className="mt-auto mb-6 w-16 h-16 rounded-full bg-black border border-cyber-accentRed" />
    </aside>
  );
}

function Btn({ icon }: any) {
  return (
    <button className="w-14 h-14 flex items-center justify-center rounded-full bg-black border border-cyber-accentRed/30 hover:border-cyber-accentRed hover:shadow-[0_0_12px_#E10600] transition-all duration-300 text-white">
      {icon}
    </button>
  );
}
