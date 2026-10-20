import { useState } from "react";
import {
  Bug,
  Check,
  Code2,
  Copy,
  CreditCard,
  Mail,
  Rocket,
  Search,
  Send,
} from "lucide-react";
import { AppFooter } from "@/components/app-footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { AppLayout } from "@/layouts/app-layout";

const SUPPORT_EMAIL = "support@codepen.clone";

const topics = [
  {
    id: "getting-started",
    icon: Rocket,
    title: "Getting Started",
    description:
      "Setting up your account, picking preprocessors and learning the editor shortcuts.",
    meta: "Guides",
  },
  {
    id: "billing",
    icon: CreditCard,
    title: "Account & Billing",
    description:
      "Plans, invoices and payment methods.",
    meta: "Guides",
  },
  {
    id: "editor",
    icon: Code2,
    title: "Pens & Editor",
    description:
      "Preprocessors, sandbox limits, external assets and the console.",
    meta: "Guides",
  },
  {
    id: "report",
    icon: Bug,
    title: "Report a Bug",
    description:
      "Something broken? Tell us how to reproduce it.",
    meta: "Contact us",
  },
];

const tags = [
  "forking",
  "webgl-sandbox",
  "custom-domains",
  "billing",
  "api-keys",
  "pro-features",
];

const faqs = [
  {
    q: "How does forking public Pens work?",
    a: 'All public Pens are published under the MIT License by default. Any developer can fork a public Pen at any time, and the fork keeps an immutable "Forked from @author" attribution link.',
  },
  {
    q: "Can I make my Pens private?",
    a: "Yes. Private Pens are available to Pro subscribers. They are excluded from search indexing, feeds and public profiles, and can only be opened by you or through a secret share link.",
  },
  {
    q: "Does CodePen Clone support custom domains or embeds?",
    a: 'Embed a Pen in any blog or docs page with <script async src="https://codepen.clone/assets/embed.js"></script>. Custom domains can be mapped to Project sandboxes via CNAME records in Pro workspace settings.',
  },
  {
    q: "How does the isolated sandbox execution environment work?",
    a: 'Every preview runs inside a null-origin <iframe sandbox="allow-scripts"> served from an isolated subdomain, so your scripts have no access to your session, cookies or auth tokens.',
  },
  {
    q: "What are the compiler and memory limits for scripts?",
    a: "Client-side compiles run in a Web Worker with a 15MB asset envelope. Loops that block execution for more than 3,000ms trigger the loop-protection watchdog to prevent tab lockups.",
  },
  {
    q: "How do I request account termination or data export?",
    a: 'Trigger a full JSON and ZIP export from Account Settings at any time. Selecting "Delete Account" purges your data from all databases and storage buckets within 72 hours.',
  },
];

export default function SupportPage() {
  const [query, setQuery] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const normalized = query.trim().toLowerCase().replace(/^#/, "");
  const visibleFaqs = normalized
    ? faqs.filter(({ q, a }) =>
        `${q} ${a}`.toLowerCase().includes(normalized),
      )
    : faqs;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; the address stays selectable
    }
  };

  return (
    <AppLayout>
      <div className="min-h-0 flex-1 overflow-y-auto scroll-smooth">
        <main className="mx-auto w-full max-w-6xl space-y-12 px-6 pt-10 pb-6">
          <section className="space-y-2 border-b pb-8">
            <h1 className="text-3xl font-bold tracking-tight">Support</h1>
            <p className="max-w-2xl text-muted-foreground">
              Browse the questions below or send us a message. We read
              everything.
            </p>
          </section>

          <section className="space-y-4">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-primary" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the FAQ"
                aria-label="Search the FAQ"
                className="h-11 pl-11"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">Try:</span>
              {tags.map((tag) => (
                <Button
                  key={tag}
                  type="button"
                  variant="ghost"
                  onClick={() => setQuery(tag)}
                  className="h-auto rounded border border-border px-2.5 py-1 font-normal text-muted-foreground hover:border-primary hover:bg-transparent hover:text-primary dark:hover:bg-transparent"
                >
                  #{tag}
                </Button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Help topics</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {topics.map(({ id, icon: Icon, title, description, meta }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="group flex flex-col justify-between rounded-lg border p-5 transition-all hover:-translate-y-0.5 hover:border-primary"
                >
                  <div className="space-y-3">
                    <div className="flex size-10 items-center justify-center rounded border text-primary">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-semibold transition-colors group-hover:text-primary">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                  <p className="mt-4 border-t pt-3 text-sm text-muted-foreground group-hover:text-primary">
                    {meta}
                  </p>
                </a>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="border-b pb-3">
              <h2 className="text-2xl font-semibold">
                FAQ
              </h2>
            </div>
            {visibleFaqs.length === 0 ? (
              <p className="py-6 text-sm text-muted-foreground">
                No answers match "{query}". Try another term or contact us
                below.
              </p>
            ) : (
              <Accordion className="rounded-lg border px-4">
                {visibleFaqs.map(({ q, a }, i) => (
                  <AccordionItem key={q} value={q}>
                    <AccordionTrigger>
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </section>

          <section className="grid grid-cols-1 gap-8 border-t pt-8 lg:grid-cols-12">
            <div className="space-y-6 rounded-lg border p-6 lg:col-span-7">
              <div className="space-y-1">
                <h3 className="flex items-center gap-2 text-xl font-semibold">
                  <Mail className="size-5 text-primary" />
                  Contact us
                </h3>
                <p className="text-sm text-muted-foreground">
                  Include a Pen link or the console error if you have one.
                </p>
              </div>
              {sent ? (
                <p className="flex items-center gap-2 rounded border p-4 text-sm">
                  <Check className="size-4 text-primary" />
                  Thanks, we got your message. We usually reply within 1-2 business days.
                </p>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="support-name">Name</Label>
                      <Input
                        id="support-name"
                        
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="support-email">Email</Label>
                      <Input
                        id="support-email"
                        type="email"
                        
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="support-topic">Topic</Label>
                    <NativeSelect id="support-topic" className="w-full">
                      <NativeSelectOption value="editor-bug">
                        Editor bug
                      </NativeSelectOption>
                      <NativeSelectOption value="billing">
                        Billing
                      </NativeSelectOption>
                      <NativeSelectOption value="security">
                        Security issue
                      </NativeSelectOption>
                      <NativeSelectOption value="feature">
                        Feature request
                      </NativeSelectOption>
                    </NativeSelect>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="support-message">Message</Label>
                    <Textarea
                      id="support-message"
                      rows={5}
                      placeholder="What happened?"
                      required
                    />
                  </div>
                  <Button type="submit">
                    Send Message
                    <Send />
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-4 lg:col-span-5">
              <div className="space-y-3 rounded-lg border p-5">
                <p className="text-xs tracking-wider text-muted-foreground uppercase">
                  Prefer email?
                </p>
                <div className="flex items-center justify-between rounded border p-2.5 font-mono text-sm">
                  <span className="text-primary select-all">
                    {SUPPORT_EMAIL}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={copyEmail}
                    aria-label="Copy support email"
                    title={copied ? "Copied" : "Copy email"}
                  >
                    {copied ? <Check /> : <Copy />}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  We usually reply within 1-2 business days.
                </p>
              </div>
            </div>
          </section>
        </main>

        <AppFooter />
      </div>
    </AppLayout>
  );
}
