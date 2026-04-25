import { Bell, Search, Menu } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
];

export default function SiteHeader({
  activeItem = "Home",
  showSearch = true,
  actionLabel = "Get Alerts",
  action,
  secondaryAction,
}) {
  return (
    <header className="rounded-[28px] border  glass-panel px-5 py-4 z-50">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] text-xl font-semibold text-white shadow-lg">
              A
            </div>
            <Link href="/" className="group">
              <p className="text-2xl font-semibold tracking-tight   group-hover:text-white transition-colors duration-200">
                AtmosGrid
              </p>
              <p className="text-sm  ">Breathe Better, Live Better</p>
            </Link>
          </div>

          <nav className="hidden lg:flex flex-wrap items-center gap-6 ml-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="relative group">
                <span
                  className={`text-sm font-medium transition-colors duration-200 ${
                    item.name === activeItem ? "text-white" : "  group-hover:text-white"
                  }`}
                >
                  {item.name}
                </span>
                <span
                  className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full   transition-all duration-300 ${
                    item.name === activeItem ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {showSearch ? (
            <div className="flex items-center gap-3 rounded-full border   bg-[rgba(255,255,255,0.03)] px-4 py-3  ">
              <Search className="h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search location..." 
                className="bg-transparent border-none text-sm outline-none   placeholder: "
              />
            </div>
          ) : null}

          {secondaryAction}

          {action ? (
            <form action={action}>
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--ring)] px-5 py-3 text-sm font-medium   transition hover:  hover:text-white"
              >
                <Bell className="h-4 w-4" />
                {actionLabel}
              </button>
            </form>
          ) : (
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--ring)] px-5 py-3 text-sm font-medium   transition hover:  hover:text-white"
            >
              <Bell className="h-4 w-4" />
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
