import { createContext, useContext, useState } from "react";

type BlogProviderProps = {
  children: React.ReactNode;
};

type BlogProviderState = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState: BlogProviderState = {
  isLoading: false,
  setIsLoading: () => null,
};

const BlogProviderContext = createContext<BlogProviderState>(initialState);

export function BlogProvider({ children, ...props }: BlogProviderProps) {
  const [isLoading, setIsLoading] = useState(initialState.isLoading);

  return (
    <BlogProviderContext.Provider
      {...props}
      value={{ isLoading, setIsLoading }}
    >
      {children}
    </BlogProviderContext.Provider>
  );
}

export const useBlog = () => {
  const context = useContext(BlogProviderContext);

  if (context === undefined)
    throw new Error("useBlog must be used within a BlogProvider");

  return context;
};
