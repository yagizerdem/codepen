import { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

export type EditorLanguage = "html" | "css" | "javascript";

interface CodeEditorProps {
  language: EditorLanguage;
  value?: string;
  onChange?: (value: string) => void;
}

const THEME_NAME = "app-theme";

// Monaco only understands hex colors, so resolve the app's CSS variables.
function cssVar(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

export function CodeEditor({ language, value, onChange }: CodeEditorProps) {
  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) return;

    const applyTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");

      monaco.editor.defineTheme(THEME_NAME, {
        base: isDark ? "vs-dark" : "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": cssVar("--stitch-background"),
          "editor.foreground": cssVar("--stitch-on-background"),
          "editorGutter.background": cssVar("--stitch-background"),
          "editor.lineHighlightBackground": cssVar(
            "--stitch-surface-container-low",
          ),
          "editor.selectionBackground": cssVar(
            "--stitch-surface-container-highest",
          ),
          "editorLineNumber.foreground": cssVar("--stitch-on-surface-variant"),
          "editorLineNumber.activeForeground": cssVar("--stitch-primary"),
          "editorCursor.foreground": cssVar("--stitch-primary"),
          "editorWidget.background": cssVar("--stitch-surface-container-high"),
          "editorIndentGuide.background1": cssVar("--stitch-outline-variant"),
        },
      });
      monaco.editor.setTheme(THEME_NAME);
    };

    applyTheme();

    // ThemeProvider toggles the "dark"/"light" class on <html>.
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [monaco]);

  return (
    <Editor
      language={language}
      value={value}
      theme={THEME_NAME}
      onChange={(next) => onChange?.(next ?? "")}
      options={{ minimap: { enabled: false }, automaticLayout: true }}
      className="h-full w-full overflow-hidden"
    />
  );
}
