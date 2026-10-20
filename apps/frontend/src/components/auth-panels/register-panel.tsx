import React, { useState, type FormEvent } from "react";
import { z } from "zod";
import { registerSchema, type RegisterInput } from "@codepen/validator";
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

const registerFormSchema = registerSchema
  .extend({ confirmPassword: z.string().min(1, "Please repeat your password") })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FieldName = keyof z.infer<typeof registerFormSchema>;
type FieldErrors = Partial<Record<FieldName, string>>;

interface RegisterPanelProps {
  onSubmit?: (data: RegisterInput) => void | Promise<void>;
  onSignIn?: () => void;
  onClose?: () => void;
  ref?: React.Ref<HTMLDivElement>;
  className: string;
}

export default function RegisterPanel({
  onSubmit,
  onSignIn,
  onClose,
  ref,
  className,
}: RegisterPanelProps) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const age = String(form.get("age") ?? "").trim();

    const result = registerFormSchema.safeParse({
      username: form.get("username"),
      email: form.get("email"),
      password: form.get("password"),
      confirmPassword: form.get("confirmPassword"),
      age: age === "" ? undefined : Number(age),
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...payload } = result.data;
    setSubmitting(true);
    try {
      await onSubmit?.(payload);
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
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
        <CardAction>
          <Button
            type="button"
            className="cursor-pointer"
            variant="link"
            onClick={onSignIn}
          >
            Log In
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="register-form" noValidate onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="johndoe"
                aria-invalid={!!errors.username}
              />
              <FieldError message={errors.username} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="m@example.com"
                aria-invalid={!!errors.email}
              />
              <FieldError message={errors.email} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={!!errors.password}
              />
              <FieldError message={errors.password} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Password again</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                aria-invalid={!!errors.confirmPassword}
              />
              <FieldError message={errors.confirmPassword} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Age (optional)</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min={0}
                step={1}
                aria-invalid={!!errors.age}
              />
              <FieldError message={errors.age} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          form="register-form"
          className="w-full cursor-pointer"
          disabled={submitting}
        >
          Register
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
