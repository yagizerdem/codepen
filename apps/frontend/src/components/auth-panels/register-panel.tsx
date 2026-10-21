import React, { useEffect, useState, type FormEvent } from "react";
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
import { EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import API from "@/lib/axios-wrapper";
import type { ApiResponse } from "@codepen/shared";
import { toast } from "sonner";

const registerFormSchema = registerSchema
  .extend({ confirmPassword: z.string().min(1, "Please repeat your password") })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FieldName = keyof z.infer<typeof registerFormSchema>;
type FieldErrors = Partial<Record<FieldName, string>>;

interface RegisterFormState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

const initialFormState: RegisterFormState = {
  username: "yagiz",
  email: "yagiz@gmail.com",
  password: "12345aA!",
  confirmPassword: "12345aA!",
  age: "12",
  showPassword: false,
  showConfirmPassword: false,
};

interface RegisterPanelProps {
  onSignIn?: () => void;
  onClose?: () => void;
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
}

export default function RegisterPanel({
  onSignIn,
  onClose,
  ref,
  className,
}: RegisterPanelProps) {
  const [form, setForm] = useState<RegisterFormState>(initialFormState);

  function update<K extends keyof RegisterFormState>(
    key: K,
    value: RegisterFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }
  const [errors, setErrors] = useState<FieldErrors>({});

  const mutation = useMutation({
    mutationFn: async (dto: RegisterInput) => {
      const res = await API.post<ApiResponse>("/api/auth/register", dto);
      return res.data;
    },

    onSuccess: (response) => {
      onClose?.();
      toast(response.message ?? "Account created successfully", {
        position: "top-right",
      });
    },

    onError: (error) => {
      toast(error?.message ?? "An error occurred", { position: "top-right" });
    },
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedAge = form.age.trim();
    const result = registerFormSchema.safeParse({
      username: form.username,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      age: trimmedAge === "" ? undefined : Number(trimmedAge),
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
    const { confirmPassword: _confirm, ...payload } = result.data;

    await mutation.mutateAsync(payload);
  }

  // console.log(
  //   "data " + mutation.data,
  //   "error " + mutation.error,
  //   "isSuccess " + mutation.isSuccess,
  //   "isError " + mutation.isError,
  //   "pending " + mutation.isPending,
  // );

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
                type="text"
                autoComplete="username"
                placeholder="johndoe"
                value={form.username}
                onChange={(e) => update("username", e.target.value)}
                aria-invalid={!!errors.username}
              />
              <FieldError message={errors.username} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="m@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={!!errors.email}
              />
              <FieldError message={errors.email} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
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
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Password again</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={form.showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="pr-10"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  aria-invalid={!!errors.confirmPassword}
                />
                <PasswordToggle
                  visible={form.showConfirmPassword}
                  onToggle={() =>
                    update("showConfirmPassword", !form.showConfirmPassword)
                  }
                />
              </div>
              <FieldError message={errors.confirmPassword} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Age (optional)</Label>
              <Input
                id="age"
                type="number"
                min={0}
                step={1}
                value={form.age}
                onChange={(e) => update("age", e.target.value)}
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
          disabled={mutation.isPending}
        >
          Register
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
