import {
  Bell,
  ChevronDown,
  Code,
  Heart,
  LogOut,
  Plus,
  Search,
  Settings,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigate } from "react-router";
import { Button } from "@base-ui/react";

const navItems = [
  { label: "Explore", href: "/explore" },
  { label: "Trending", href: "/trending" },
  { label: "Blog", href: "/blog" },
  { label: "Documentation", href: "/documentation" },
];

const menuItems = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "My Pens", href: "/my-pens", icon: Code },
  { label: "Liked Pens", href: "/liked-pens", icon: Heart },
  { label: "Settings", href: "/settings", icon: Settings },
];

type AppHeaderProps = {
  username: string;
  activePath?: string;
  hasNotifications?: boolean;
  onLogout?: () => void;
};

export function AppHeader({
  username,
  activePath,
  hasNotifications = false,
  onLogout,
}: AppHeaderProps) {
  const navigation = useNavigate();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/95 shadow-[0_1px_8px_rgba(0,0,0,0.4)] backdrop-blur-md ">
      <div className="flex h-16 w-full items-center justify-between gap-3 px-3">
        <div className="flex items-center gap-5">
          <a
            href="/"
            className="flex items-center gap-1.5 text-lg font-bold tracking-tight"
          >
            CodePen
            <span className="inline-block size-1.5 rounded-full bg-primary" />
          </a>

          <nav className="hidden items-center gap-1 text-sm xl:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={activePath === item.href ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 transition-colors",
                  activePath === item.href
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mx-3 hidden max-w-xl flex-1 md:block">
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search Pens, Projects, Collections, Coders..."
              className="h-10 w-full rounded-lg bg-muted pl-9 pr-12 text-sm text-foreground shadow-inner placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <kbd className="pointer-events-none absolute right-2.5 select-none rounded bg-accent px-1.5 py-0.5 text-xs text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onMouseUp={() => navigation("/new-pen")}
            className="cursor-pointer flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus className="size-4" />
            New Pen
          </Button>

          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Bell className="size-5" />
            {hasNotifications && (
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary ring-2 ring-background" />
            )}
          </button>

          <ThemeToggle />

          <div className="group relative">
            <button
              type="button"
              aria-haspopup="menu"
              className="flex items-center gap-1 rounded-full p-1 transition-colors hover:bg-accent focus:outline-none"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-medium uppercase">
                {username.charAt(0)}
              </span>
              <ChevronDown className="hidden size-3.5 text-muted-foreground transition-colors group-hover:text-foreground sm:inline-block" />
            </button>

            <div
              role="menu"
              className="pointer-events-none absolute right-0 top-full z-50 mt-2 w-56 rounded-xl bg-popover py-1 text-popover-foreground opacity-0 shadow-[0_12px_32px_rgba(0,0,0,0.65)] transition-all duration-150 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100"
            >
              <div className="px-3 py-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Signed in as
                </p>
                <p className="truncate text-sm font-medium">@{username}</p>
              </div>
              <div className="my-1 h-px bg-border" />
              {menuItems.map(({ label, href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  role="menuitem"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="size-4" />
                  {label}
                </a>
              ))}
              <div className="my-1 h-px bg-border" />
              <button
                type="button"
                role="menuitem"
                onClick={onLogout}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive transition-colors hover:bg-accent"
              >
                <LogOut className="size-4" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
