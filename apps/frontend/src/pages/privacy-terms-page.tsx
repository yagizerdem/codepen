import { AppFooter } from "@/components/app-footer";
import { AppLayout } from "@/layouts/app-layout";

const sections = [
  ["overview", "Overview"],
  ["information", "Information we collect"],
  ["usage", "How we use your data"],
  ["cookies", "Cookies and local storage"],
  ["content", "Your content and Pens"],
  ["acceptable-use", "Acceptable use"],
  ["termination", "Account termination"],
  ["contact", "Contact"],
];

const cookies = [
  [
    "__cp_session_token",
    "HttpOnly cookie",
    "Keeps you signed in (JWT)",
    "30 days",
  ],
  [
    "cp_theme_pref",
    "LocalStorage",
    "Your theme: dark, light or system",
    "Until cleared",
  ],
  [
    "cp_active_editor_draft",
    "LocalStorage",
    "Unsaved editor changes if the connection drops",
    "Until you save",
  ],
  [
    "cp_panel_layout_ratios",
    "LocalStorage",
    "Widths of the HTML, CSS and JS panes",
    "Until cleared",
  ],
];

export default function PrivacyTermsPage() {
  return (
    <AppLayout>
      <div className="min-h-0 flex-1 overflow-y-auto scroll-smooth">
        <div className="mx-auto flex w-full max-w-5xl gap-16 px-6 pt-10">
          <nav
            aria-label="On this page"
            className="sticky top-6 hidden h-fit w-48 shrink-0 text-sm lg:block"
          >
            <ul className="space-y-2">
              {sections.map(([id, title]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <main className="min-w-0 max-w-2xl flex-1 space-y-10 leading-7 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_section]:scroll-mt-6 [&_a]:underline [&_p+p]:mt-3">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Privacy &amp; Terms
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Last updated October 14, 2025 (v2.4)
              </p>
            </div>

            <section id="overview">
              <h2>Overview</h2>
              <p>
                CodePen Clone lets you write, preview, share and fork small web
                experiments in the browser. This page covers both our privacy
                policy and our terms of service, so you can see in one place
                what we do with your data and what we expect from you.
              </p>
              <p>
                The short version: you own your code, public Pens are MIT
                licensed unless you say otherwise, we don't sell your data, and
                your code runs in an isolated sandbox.
              </p>
            </section>

            <section id="information">
              <h2>Information we collect</h2>
              <p>We only collect what we need to run the service.</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong>Account:</strong> your GitHub OAuth identifier, email
                  address (for verification), username, public handle and
                  avatar.
                </li>
                <li>
                  <strong>Code:</strong> your HTML, CSS and JS, preprocessor
                  settings, uploaded assets and the CDN libraries you link to.
                </li>
                <li>
                  <strong>Logs:</strong> compile errors, crash diagnostics,
                  sandbox timeouts and anonymous view counts. We don't track you
                  across other sites.
                </li>
              </ul>
            </section>

            <section id="usage">
              <h2>How we use your data</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Running your code.</strong> We compile and bundle it,
                  then load it in a sandboxed iframe (
                  <code className="font-mono text-sm">
                    sandbox="allow-scripts"
                  </code>
                  ) with no access to our origin.
                </li>
                <li>
                  <strong>Autosave.</strong> We keep a timeline of your edits so
                  a browser refresh doesn't lose your work.
                </li>
                <li>
                  <strong>Discovery.</strong> Trending is ranked by hearts,
                  forks, views and comments. We don't sell ad placement.
                </li>
              </ul>
            </section>

            <section id="cookies">
              <h2>Cookies and local storage</h2>
              <p>These are all the keys the app stores in your browser.</p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b text-muted-foreground">
                      <th className="py-2 pr-4 font-medium">Key</th>
                      <th className="py-2 pr-4 font-medium">Type</th>
                      <th className="py-2 pr-4 font-medium">Purpose</th>
                      <th className="py-2 font-medium">Lifetime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookies.map(([key, type, purpose, lifetime]) => (
                      <tr key={key} className="border-b align-top">
                        <td className="py-2 pr-4 font-mono text-xs">{key}</td>
                        <td className="py-2 pr-4">{type}</td>
                        <td className="py-2 pr-4">{purpose}</td>
                        <td className="py-2">{lifetime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="content">
              <h2>Your content and Pens</h2>
              <p>
                You keep the copyright on everything you write. When you make a
                Pen public, other people may learn from it, fork it and build on
                it under the MIT License, unless you add a different license to
                the Pen.
              </p>
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap border-l-2 pl-4 font-mono text-xs leading-5 text-muted-foreground">
                {`Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.`}
              </pre>
              <p>
                Public Pens are visible to everyone, can appear in featured
                feeds, and can be forked with the original author credited.
                Private Pens (PRO) are hidden from search engines and can only
                be opened by you or through a secret share link.
              </p>
            </section>

            <section id="acceptable-use">
              <h2>Acceptable use</h2>
              <p>
                Sandboxes run on shared compiler nodes and are viewed by other
                people, so a few rules apply.
              </p>
              <p className="mt-3 font-medium">Welcome:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>CSS animations and WebGL or Three.js experiments</li>
                <li>Component prototypes and design system sandboxes</li>
                <li>Tutorials and interactive demos</li>
                <li>
                  Commercial proofs of concept that stay within sandbox limits
                </li>
              </ul>
              <p className="mt-3 font-medium">Not allowed:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Crypto-mining scripts (Coinhive, Monero and similar)</li>
                <li>Fake login forms that imitate banks or SSO pages</li>
                <li>DDoS tests or bot traffic</li>
                <li>Illegal media or pirated software</li>
              </ul>
            </section>

            <section id="termination">
              <h2>Account termination</h2>
              <p>
                You can delete your account at any time from your profile
                settings.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Private Pens and uploaded assets are permanently deleted
                  within 72 hours of your request.
                </li>
                <li>
                  Public Pens that others have forked are anonymized and
                  archived, so those forks keep working.
                </li>
              </ul>
            </section>

            <section id="contact" className="pb-4">
              <h2>Contact</h2>
              <p>
                For questions about these terms, DMCA takedowns, or a signed
                Data Processing Addendum, email{" "}
                <a href="mailto:legal@codepen.clone">legal@codepen.clone</a>. We
                usually reply within 1-2 business days.
              </p>
              <address className="mt-3 text-sm not-italic text-muted-foreground">
                CodePen Clone, Inc.
                <br />
                548 Market St, Suite 29283
                <br />
                San Francisco, CA 94104-5401
              </address>
            </section>
          </main>
        </div>

        <AppFooter />
      </div>
    </AppLayout>
  );
}
