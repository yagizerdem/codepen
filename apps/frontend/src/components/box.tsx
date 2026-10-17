import { cn } from "cn";

interface BoxProps {
  className?: string;
}

export default function Box({ className }: BoxProps) {
  return <div className={cn("", className)}></div>;
}
