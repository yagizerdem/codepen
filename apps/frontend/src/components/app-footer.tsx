const footerLinks = [
  { label: "Docs", href: "/documentation" },
  { label: "Blog", href: "/blog" },
  { label: "Support", href: "/settings" },
  { label: "Privacy & Terms", href: "/trending" },
];

export function AppFooter() {
  return (
    <footer className="mt-8 w-full bg-muted py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-3 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">CodePen</span>
          <span>© 2026 CodePen Demo Inc. Built for creative developers.</span>
        </div>

        <div className="flex items-center gap-5">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
