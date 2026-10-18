import { Fragment, useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  CodeEditor,
  type EditorLanguage,
} from "@/components/work-space/code-editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const editors: { language: EditorLanguage; label: string }[] = [
  { language: "html", label: "HTML" },
  { language: "css", label: "CSS" },
  { language: "javascript", label: "JS" },
];

interface WorkSpaceProps {
  html?: string;
  css?: string;
  javascript?: string;
}

export function WorkSpace(props: WorkSpaceProps) {
  const [code, setCode] = useState<Record<EditorLanguage, string>>({
    html: props.html ?? "",
    css: props.css ?? "",
    javascript: props.javascript ?? "",
  });
  const debouncedCode = useDebounce(code, 500);

  const ifFrameRef = useRef<HTMLIFrameElement>(null);

  const getGeneratedPageURL = ({
    html,
    css,
    js,
  }: {
    html: string;
    css: string;
    js: string;
  }) => {
    const getBlobURL = (code: string, type: string) => {
      const blob = new Blob([code], { type });
      return URL.createObjectURL(blob);
    };

    const cssURL = getBlobURL(css, "text/css");
    const jsURL = getBlobURL(js, "text/javascript");

    const source = `
    <html>
      <head>
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        ${js && `<script src="${jsURL}"></script>`}
      </head>
      <body>
        ${html || ""}
      </body>
    </html>
  `;

    return getBlobURL(source, "text/html");
  };

  useEffect(() => {
    if (ifFrameRef.current) {
      const url = getGeneratedPageURL({
        html: debouncedCode.html,
        css: debouncedCode.css,
        js: debouncedCode.javascript,
      });
      ifFrameRef.current.src = url;
    }
  }, [debouncedCode]);

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
      <ResizablePanelGroup
        orientation="vertical"
        className="h-full w-full overflow-hidden rounded-lg border"
      >
        <ResizablePanel defaultSize="50%">
          <div className="h-full w-full p-2">
            <iframe
              ref={ifFrameRef}
              className="h-full w-full bg-white"
              title="Preview"
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="50%">
          <ResizablePanelGroup orientation="horizontal">
            {editors.map(({ language, label }, i) => (
              <Fragment key={language}>
                {i > 0 && <ResizableHandle withHandle />}
                <ResizablePanel defaultSize="33%">
                  <div className="flex h-full w-full flex-col overflow-hidden">
                    <div className="border-b bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {label}
                    </div>
                    <div className="min-h-0 flex-1 overflow-hidden">
                      <CodeEditor
                        language={language}
                        value={code[language]}
                        onChange={(value) =>
                          setCode((prev) => ({ ...prev, [language]: value }))
                        }
                      />
                    </div>
                  </div>
                </ResizablePanel>
              </Fragment>
            ))}
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
