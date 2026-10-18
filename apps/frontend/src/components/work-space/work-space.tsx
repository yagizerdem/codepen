import { Fragment, useEffect, useState } from "react";
import { ImportIcon, UploadIcon } from "lucide-react";
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
import { useEventEmitter } from "@/hooks/useEventEmitter";

const editors: { language: EditorLanguage; label: string }[] = [
  { language: "html", label: "HTML" },
  { language: "css", label: "CSS" },
  { language: "javascript", label: "JS" },
];

const fileConfig: Record<
  EditorLanguage,
  { fileName: string; mimeType: string; accept: string }
> = {
  html: { fileName: "index.html", mimeType: "text/html", accept: ".html,.htm" },
  css: { fileName: "style.css", mimeType: "text/css", accept: ".css" },
  javascript: {
    fileName: "script.js",
    mimeType: "text/javascript",
    accept: ".js,.mjs,.cjs",
  },
};

interface WorkSpaceProps {
  html?: string;
  css?: string;
  javascript?: string;
  refreshIframe?: () => void;
}

export function WorkSpace(props: WorkSpaceProps) {
  const { eventData } = useEventEmitter<{ data: string }>("refresh-workspace");

  const [code, setCode] = useState<Record<EditorLanguage, string>>({
    html: props.html ?? "",
    css: props.css ?? "",
    javascript: props.javascript ?? "",
  });
  const debouncedCode = useDebounce(code, 500);

  // Changing the key remounts the iframe. Setting srcdoc on an iframe whose
  // script is stuck in an infinite loop does nothing, but removing it does.
  const [preview, setPreview] = useState({ key: 0, srcDoc: "" });

  const exportCode = (language: EditorLanguage) => {
    const { fileName, mimeType } = fileConfig[language];
    const url = URL.createObjectURL(
      new Blob([code[language]], { type: mimeType }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importCode = async (language: EditorLanguage, file?: File) => {
    if (!file) return;
    const text = await file.text();
    setCode((prev) => ({ ...prev, [language]: text }));
  };

  // The sandboxed iframe has an opaque origin, so it can't load blob: URLs
  // created by this page. Inline everything into srcDoc instead.
  const getGeneratedPageSource = ({
    html,
    css,
    js,
  }: {
    html: string;
    css: string;
    js: string;
  }) => `<!DOCTYPE html>
<html>
  <head>
    <style>${css.replace(/<\/style/gi, "<\\/style")}</style>
  </head>
  <body>
    ${html}
    <script>${js.replace(/<\/script/gi, "<\\/script")}</script>
  </body>
</html>`;

  useEffect(() => {
    setPreview((prev) => ({
      key: prev.key + 1,
      srcDoc: getGeneratedPageSource({
        html: debouncedCode.html,
        css: debouncedCode.css,
        js: debouncedCode.javascript,
      }),
    }));
  }, [debouncedCode, eventData]);

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
      <ResizablePanelGroup
        orientation="vertical"
        className="h-full w-full overflow-hidden rounded-lg border"
      >
        <ResizablePanel defaultSize="50%">
          <div className="h-full w-full p-2">
            <iframe
              key={preview.key}
              srcDoc={preview.srcDoc}
              className="h-full w-full bg-white"
              title="Preview"
              sandbox="allow-scripts"
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
                    <div className="flex items-center justify-between border-b bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      <span>{label}</span>
                      <div className="flex items-center gap-1">
                        <label
                          title={`Import ${label} file`}
                          className="cursor-pointer rounded p-1 hover:bg-accent hover:text-foreground"
                        >
                          <ImportIcon className="size-3.5" />
                          <input
                            type="file"
                            hidden
                            accept={fileConfig[language].accept}
                            onChange={(e) => {
                              void importCode(language, e.target.files?.[0]);
                              e.target.value = "";
                            }}
                          />
                        </label>
                        <button
                          type="button"
                          title={`Export ${label} file`}
                          onClick={() => exportCode(language)}
                          className="cursor-pointer rounded p-1 hover:bg-accent hover:text-foreground"
                        >
                          <UploadIcon className="size-3.5" />
                        </button>
                      </div>
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
