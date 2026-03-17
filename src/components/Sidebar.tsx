"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "⊞" },
  { href: "/backend", label: "AI Backend", icon: "🤖" },
  { href: "/plugins", label: "Plugins", icon: "🔌" },
  { href: "/integrations", label: "Integrations", icon: "🔗" },
  { href: "/billing", label: "Billing", icon: "💳" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-gray-900 text-white">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-bold">
          A
        </div>
        <div>
          <p className="font-semibold text-sm">AI Hub</p>
          <p className="text-xs text-gray-400">Centralized AI Backend</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800">
          <div className="w-7 h-7 rounded-full bg-violet-500 flex items-center justify-center text-xs font-bold">
            U
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium truncate">Admin User</p>
            <p className="text-xs text-gray-400">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
