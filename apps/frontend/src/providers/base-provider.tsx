import { createContext, useContext } from "react";
import { ThemeProvider } from "@providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./auth-provider";
import { BlogProvider } from "./blog-provider";

type BaseProviderProps = {
  children: React.ReactNode;
};

type BaseProviderState = {};

const initialState: BaseProviderState = {};

const BaseProviderContext = createContext<BaseProviderState>(initialState);

export function BaseProvider({ children, ...props }: BaseProviderProps) {
  return (
    <BaseProviderContext.Provider {...props} value={initialState}>
      <TooltipProvider>
        <ThemeProvider>
          <BlogProvider>
            <AuthProvider>{children}</AuthProvider>
          </BlogProvider>
        </ThemeProvider>
      </TooltipProvider>
    </BaseProviderContext.Provider>
  );
}

export const useBase = () => {
  const context = useContext(BaseProviderContext);

  if (context === undefined)
    throw new Error("useBase must be used within a BaseProvider");

  return context;
};
