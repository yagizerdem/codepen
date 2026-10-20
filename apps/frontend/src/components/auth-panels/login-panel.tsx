import React, { useState, type FormEvent } from "react";
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
import { XIcon } from "lucide-react";

type FieldName = keyof z.infer<typeof loginSchema>;
type FieldErrors = Partial<Record<FieldName, string>>;

interface LoginPanelProps {
  onSubmit?: (data: LoginInput) => void | Promise<void>;
  onSignUp?: () => void;
  onClose?: () => void;
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
}

export default function LoginPanel({
  onSubmit,
  onSignUp,
  onClose,
  ref,
  className,
}: LoginPanelProps) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const result = loginSchema.safeParse({
      email: form.get("email"),
      password: form.get("password"),
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
    setSubmitting(true);
    try {
      await onSubmit?.(result.data);
    } finally {
      setSubmitting(false);
    }
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
        <form id="login-form" noValidate onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="m@example.com"
                aria-invalid={!!errors.email}
              />
              <FieldError message={errors.email} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
              />
              <FieldError message={errors.password} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          form="login-form"
          className="w-full cursor-pointer"
          disabled={submitting}
        >
          Login
        </Button>
      </CardFooter>
    </Card>
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
