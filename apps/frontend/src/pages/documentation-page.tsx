import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bolt,
  Cpu,
  ExternalLink,
  Search,
  TriangleAlert,
} from "lucide-react";
import { AppFooter } from "@/components/app-footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block";
import { Input } from "@/components/ui/input";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppLayout } from "@/layouts/app-layout";
import { cn } from "cn";

const sections = [
  { id: "intro", title: "Introduction", group: "Getting Started" },
  { id: "quick-start", title: "Quick Start", group: "Getting Started" },
  { id: "editor-overview", title: "Editor Overview", group: "Editor" },
  { id: "preprocessors", title: "Preprocessors", group: "Editor" },
  { id: "shortcuts", title: "Keyboard Shortcuts", group: "Reference" },
  { id: "sandbox", title: "Sandbox & Security", group: "Reference" },
  { id: "embedding", title: "Embedding", group: "Pens" },
];

const features = [
  {
    icon: Bolt,
    title: "Zero Setup",
    text: "Write vanilla or preprocessed code instantly without npm install, bundler configs or package scripts.",
  },
  {
    icon: Cpu,
    title: "Real-time Bundling",
    text: "In-memory transpilation in web workers, so the preview updates as you type.",
  },
  {
    icon: ExternalLink,
    title: "Easy Embedding",
    text: "Lightweight iframes you can drop into any blog or documentation page.",
  },
];

const steps = [
  {
    title: "Create a Pen",
    text: "Open a new Pen and pick the preprocessors you want for each pane.",
  },
  {
    title: "Add dependencies via CDN",
    text: "Import ES modules straight from a CDN URL, with no build step.",
  },
  {
    title: "Run and share",
    text: "Your Pen renders live in the preview. Export it or share the link when you are done.",
  },
];

const starter = `<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="./styles.css" />
    <script type="module" src="./app.js"></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>`;

const panes = [
  {
    name: "HTML Pane",
    tag: "Markup",
    text: "Full control over the document body. Head tags and external stylesheets can be declared in the settings.",
    status: "Ready",
  },
  {
    name: "CSS Pane",
    tag: "Styles",
    text: "Plain CSS or a preprocessor, including Tailwind, compiled in the browser on every change.",
    status: "Active",
  },
  {
    name: "JavaScript Pane",
    tag: "Scripts",
    text: "Modern JavaScript and TypeScript with ES module imports and console output piped to the console panel.",
    status: "Live",
  },
];

const preprocessors = [
  ["HTML / Markdown", "Markdown", "Client parser", "Headings, lists, code fences", "Active"],
  ["CSS / SCSS", "text/x-scss", "Sass in the browser", "@use, nesting, variables", "Active"],
  ["Tailwind CSS", "text/tailwindcss", "Tailwind engine", "Arbitrary variants, @apply", "Active"],
  ["TypeScript", "text/typescript", "Babel preset-typescript", "Generics, JSX runtime", "Active"],
  ["CoffeeScript", "text/coffeescript", "CoffeeScript 2", "Legacy syntax support", "Beta"],
];

const shortcuts = [
  ["Run & recompile preview", "Global editor", ["Ctrl", "Enter"]],
  ["Save Pen", "Global editor", ["Ctrl", "S"]],
  ["Format code", "Active code pane", ["Alt", "F"]],
  ["Toggle line comment", "Active code pane", ["Ctrl", "/"]],
  ["Expand / collapse pane", "Workspace layout", ["Alt", "Z"]],
] as const;

const embedSnippet = `<iframe
  height="450"
  style="width: 100%; border: 1px solid #444748; border-radius: 4px;"
  title="My Pen"
  src="https://codepen.clone/embed/pen/your-pen-id?default-tab=html,result"
  loading="lazy"
  allowfullscreen>
</iframe>`;

const groups = Array.from(new Set(sections.map((s) => s.group)));

function SectionHeading({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <header className="space-y-2">
      <div className="flex items-baseline gap-3 border-b pb-3">
        <span className="font-mono text-sm text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      <p className="text-muted-foreground">{children}</p>
    </header>
  );
}

export default function DocumentationPage() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(sections[0].id);

  const normalized = query.trim().toLowerCase();
  const visible = sections.filter((s) =>
    s.title.toLowerCase().includes(normalized),
  );

  const activeIndex = sections.findIndex((s) => s.id === active);
  const prev = sections[activeIndex - 1];
  const next = sections[activeIndex + 1];

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { root, rootMargin: "0px 0px -70% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <AppLayout>
      <div
        ref={scrollerRef}
        className="min-h-0 flex-1 overflow-y-auto scroll-smooth"
      >
        <div className="mx-auto flex w-full max-w-7xl">
          <aside className="sticky top-0 hidden h-[calc(100vh-5rem)] w-64 shrink-0 space-y-6 overflow-y-auto border-r px-4 py-8 md:block">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-primary" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the docs"
                aria-label="Search the docs"
                className="pl-9"
              />
            </div>
            <nav className="space-y-5" aria-label="Documentation">
              {groups.map((group) => {
                const items = visible.filter((s) => s.group === group);
                if (items.length === 0) return null;
                return (
                  <div key={group} className="space-y-1">
                    <p className="px-2 text-xs tracking-wider text-muted-foreground uppercase">
                      {group}
                    </p>
                    {items.map(({ id, title }) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          goTo(id);
                        }}
                        className={cn(
                          "block rounded px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary",
                          active === id && "bg-muted font-medium text-primary",
                        )}
                      >
                        {title}
                      </a>
                    ))}
                  </div>
                );
              })}
              {visible.length === 0 && (
                <p className="px-2 text-sm text-muted-foreground">
                  No pages match "{query}".
                </p>
              )}
            </nav>
          </aside>

          <main className="min-w-0 flex-1 space-y-14 px-6 py-10 lg:px-10">
            <section className="space-y-3 border-b pb-8">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">
                  Documentation
                </h1>
                <Badge variant="secondary">v1.0</Badge>
              </div>
              <p className="max-w-2xl text-muted-foreground">
                Everything you need to write, preview, share and embed
                front-end code in the browser.
              </p>
            </section>

            <section id="intro" className="scroll-mt-6 space-y-6">
              <SectionHeading index={0} title="Introduction">
                CodePen Clone runs HTML, CSS and JavaScript in the browser and
                renders the result in an isolated, sandboxed iframe. There is
                no local environment to set up.
              </SectionHeading>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {features.map(({ icon: Icon, title, text }) => (
                  <Card key={title}>
                    <CardHeader>
                      <div className="mb-2 flex size-10 items-center justify-center rounded border text-primary">
                        <Icon className="size-5" />
                      </div>
                      <CardTitle>{title}</CardTitle>
                      <CardDescription>{text}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>

            <section id="quick-start" className="scroll-mt-6 space-y-6">
              <SectionHeading index={1} title="Quick Start">
                Get a working snippet on the screen in under a minute.
              </SectionHeading>
              <ol className="space-y-4">
                {steps.map(({ title, text }, i) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border font-mono text-sm text-primary">
                      {i + 1}
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-semibold">{title}</h3>
                      <p className="text-sm text-muted-foreground">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <CodeBlock>
                <CodeBlockHeader>
                  <CodeBlockTitle>index.html</CodeBlockTitle>
                  <CodeBlockActions>
                    <CodeBlockCopyButton value={starter} />
                  </CodeBlockActions>
                </CodeBlockHeader>
                <CodeBlockContent lineNumbers>{starter}</CodeBlockContent>
              </CodeBlock>
            </section>

            <section id="editor-overview" className="scroll-mt-6 space-y-6">
              <SectionHeading index={2} title="Editor Overview">
                The editor is split into three panes. Each one compiles on its
                own and reports errors without blocking the others.
              </SectionHeading>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {panes.map(({ name, tag, text, status }) => (
                  <Card key={name}>
                    <CardHeader>
                      <CardTitle>{name}</CardTitle>
                      <CardDescription>{tag}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{text}</p>
                      <Badge variant="outline">{status}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section id="preprocessors" className="scroll-mt-6 space-y-6">
              <SectionHeading index={3} title="Preprocessors">
                Supported languages and how they are compiled in the browser.
              </SectionHeading>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Language</TableHead>
                      <TableHead>Identifier</TableHead>
                      <TableHead>Compiler</TableHead>
                      <TableHead>Features</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {preprocessors.map(([lang, id, mode, feats, status]) => (
                      <TableRow key={lang}>
                        <TableCell className="font-medium">{lang}</TableCell>
                        <TableCell className="font-mono text-xs text-primary">
                          {id}
                        </TableCell>
                        <TableCell>{mode}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {feats}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={status === "Beta" ? "outline" : "secondary"}
                          >
                            {status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>

            <section id="shortcuts" className="scroll-mt-6 space-y-6">
              <SectionHeading index={4} title="Keyboard Shortcuts">
                Keybindings that follow common code editor conventions.
              </SectionHeading>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Scope</TableHead>
                      <TableHead className="text-right">Keybinding</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shortcuts.map(([action, scope, keys]) => (
                      <TableRow key={action}>
                        <TableCell className="font-medium">{action}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {scope}
                        </TableCell>
                        <TableCell className="text-right">
                          <KbdGroup>
                            {keys.map((k) => (
                              <Kbd key={k}>{k}</Kbd>
                            ))}
                          </KbdGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>

            <section id="sandbox" className="scroll-mt-6 space-y-6">
              <SectionHeading index={5} title="Sandbox & Security">
                All user code runs inside an isolated sandbox with no access
                to your session.
              </SectionHeading>
              <Alert>
                <TriangleAlert />
                <AlertTitle>Iframe sandbox restrictions</AlertTitle>
                <AlertDescription>
                  Previews run with <code className="font-mono">allow-scripts</code>{" "}
                  only. Access to parent cookies, storage and{" "}
                  <code className="font-mono">window.top</code> is blocked, so a
                  Pen cannot read or change anything outside its own frame.
                </AlertDescription>
              </Alert>
            </section>

            <section id="embedding" className="scroll-mt-6 space-y-6">
              <SectionHeading index={6} title="Embedding">
                Embed a live Pen in a blog, documentation page or presentation.
              </SectionHeading>
              <CodeBlock>
                <CodeBlockHeader>
                  <CodeBlockTitle>Embed snippet</CodeBlockTitle>
                  <CodeBlockActions>
                    <CodeBlockCopyButton value={embedSnippet} />
                  </CodeBlockActions>
                </CodeBlockHeader>
                <CodeBlockContent>{embedSnippet}</CodeBlockContent>
              </CodeBlock>
            </section>

            <nav
              className="grid grid-cols-1 gap-4 border-t pt-8 sm:grid-cols-2"
              aria-label="Page navigation"
            >
              {prev ? (
                <button
                  type="button"
                  onClick={() => goTo(prev.id)}
                  className="group rounded-lg border p-4 text-left transition-colors hover:border-primary"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ArrowLeft className="size-3" /> Previous
                  </span>
                  <span className="font-medium group-hover:text-primary">
                    {prev.title}
                  </span>
                </button>
              ) : (
                <span />
              )}
              {next && (
                <button
                  type="button"
                  onClick={() => goTo(next.id)}
                  className="group rounded-lg border p-4 text-right transition-colors hover:border-primary sm:col-start-2"
                >
                  <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                    Next <ArrowRight className="size-3" />
                  </span>
                  <span className="font-medium group-hover:text-primary">
                    {next.title}
                  </span>
                </button>
              )}
            </nav>
          </main>

          <aside className="sticky top-0 hidden h-[calc(100vh-5rem)] w-56 shrink-0 overflow-y-auto border-l px-4 py-8 xl:block">
            <p className="mb-3 text-xs tracking-wider text-muted-foreground uppercase">
              On this page
            </p>
            <ul className="space-y-1.5 text-sm">
              {sections.map(({ id, title }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(id);
                    }}
                    className={cn(
                      "block border-l-2 border-transparent py-0.5 pl-3 text-muted-foreground transition-colors hover:text-primary",
                      active === id && "border-primary font-medium text-primary",
                    )}
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <AppFooter />
      </div>
    </AppLayout>
  );
}
