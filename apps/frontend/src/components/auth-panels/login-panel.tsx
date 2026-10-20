import React, { useState, type KeyboardEvent } from "react";
import { z } from "zod";
import { loginSchema, type LoginInput } from "@codepen/validator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "cn";
import { EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import API from "@/lib/axios-wrapper";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";

type FieldName = keyof z.infer<typeof loginSchema>;
type FieldErrors = Partial<Record<FieldName, string>>;

interface LoginFormState {
  email: string;
  password: string;
  showPassword: boolean;
}

const initialFormState: LoginFormState = {
  email: "yagiz@gmail.com",
  password: "12345aA!",
  showPassword: false,
};

interface LoginPanelProps {
  onSubmit?: (data: LoginInput) => void | Promise<void>;
  onSignUp?: () => void;
  onClose?: () => void;
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
}

export default function LoginPanel({
  onSignUp,
  onClose,
  ref,
  className,
}: LoginPanelProps) {
  const [form, setForm] = useState<LoginFormState>(initialFormState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const { setIsLoggedIn } = useAuth();

  function update<K extends keyof LoginFormState>(
    key: K,
    value: LoginFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const mutation = useMutation({
    mutationFn: async (dto: LoginInput) => {
      return (await API.post("/api/auth/login", dto)).data;
    },
    onSuccess: () => {
      onClose?.();
      toast("Logged in successfully", { position: "top-right" });
      setIsLoggedIn(true);
    },
    onError: (error) => {
      toast(error?.message ?? "An error occurred", { position: "top-right" });
    },
  });

  function handleSubmit() {
    if (mutation.isPending) return;

    const result = loginSchema.safeParse({
      email: form.email,
      password: form.password,
    });

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as FieldName;
        fieldErrors[key] ??= issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    mutation.mutate(result.data);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <Card className={cn("w-full max-w-sm", className)} ref={ref}>
      <div className="absolute top-2 right-2">
        <Button
          type="button"
          variant="ghost"
          className="cursor-pointer "
          onMouseUp={onClose}
        >
          <XIcon />
        </Button>
      </div>
      <br />
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button
            type="button"
            className="cursor-pointer"
            variant="link"
            onClick={onSignUp}
          >
            Register
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div id="login-form" onKeyDown={handleKeyDown}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                autoComplete="off"
                placeholder="m@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={!!errors.email}
              />
              <FieldError message={errors.email} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="login-password">Password</Label>
              <div className="relative">
                <Input
                  id="login-password"
                  type={form.showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="pr-10"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  aria-invalid={!!errors.password}
                />
                <PasswordToggle
                  visible={form.showPassword}
                  onToggle={() => update("showPassword", !form.showPassword)}
                />
              </div>
              <FieldError message={errors.password} />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="button"
          className="w-full cursor-pointer"
          disabled={mutation.isPending}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}

function PasswordToggle({
  visible,
  onToggle,
}: {
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      tabIndex={-1}
      aria-label={visible ? "Hide password" : "Show password"}
      onClick={onToggle}
      className="absolute inset-y-0 right-0 h-auto w-10 cursor-pointer rounded-none p-0 text-muted-foreground hover:bg-transparent hover:text-foreground dark:hover:bg-transparent"
    >
      {visible ? (
        <EyeOffIcon className="size-4" />
      ) : (
        <EyeIcon className="size-4" />
      )}
    </Button>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}
