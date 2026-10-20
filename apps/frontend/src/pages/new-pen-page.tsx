import {
  WorkSpace,
  type WorkspaceCode,
} from "@/components/work-space/work-space";
import { AppLayout } from "@/layouts/app-layout";
import { Button } from "@base-ui/react";
import { CheckIcon, RefreshCwIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEventEmitter } from "@/hooks/useEventEmitter";
import { Fragment, useState } from "react";
import { createPenSchema, type CreatePenInput } from "@codepen/validator";
import { useMutation } from "@tanstack/react-query";
import API from "@/lib/axios-wrapper";
import type { ApiResponse } from "@codepen/shared";
import { toast } from "sonner";

export default function NewPenPage() {
  const { publishEvent } = useEventEmitter<{ data: string }>(
    "refresh-workspace",
  );
  const [errors, setErrors] = useState<string[]>([]);

  const [code, setCode] = useState<WorkspaceCode>({
    html: "",
    css: "",
    javascript: "",
  });

  async function handleSave() {
    try {
      setErrors([]);
      const result = await createPenSchema.safeParseAsync(code);
      if (!result.success) {
        const errors: string[] = result.error.issues.map(
          (issue) => issue.message,
        );
        setErrors(errors);
        return;
      }
      await mutation.mutateAsync(code as CreatePenInput);
    } finally {
    }
  }

  const mutation = useMutation({
    mutationFn: createPen,

    onSuccess: (data) => {
      toast(data.message, {
        position: "top-right",
      });
      console.log(data);
    },
    onError: (error) => {
      toast(error.message, {
        position: "top-right",
      });
      console.error("Error creating pen:", error);
    },
  });

  async function createPen(dto: CreatePenInput): Promise<ApiResponse<unknown>> {
    return (await API.post("/api/pens", dto)).data;
  }

  return (
    <AppLayout>
      {errors.length > 0 && (
        <Fragment>
          {errors.map((error, index) => {
            return (
              <div key={index} className="text-destructive bold">
                {error}
              </div>
            );
          })}
          <br />
        </Fragment>
      )}

      <div className="w-full h-8 flex flex-row gap-2 pl-2">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                onMouseUp={() => publishEvent({ data: "" })}
                className="bg-accent w-fit h-fit flex items-center justify-center align-middle cursor-pointer p-1 rounded-md"
              >
                <RefreshCwIcon className="h-4 w-4" />
              </Button>
            }
          />
          <TooltipContent>
            <p>Refresh</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                onMouseUp={() => handleSave()}
                className="bg-accent w-fit h-fit flex items-center justify-center align-middle cursor-pointer p-1 rounded-md"
              >
                <CheckIcon className="h-4 w-4" />
              </Button>
            }
          />
          <TooltipContent>
            <p>Save</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <WorkSpace code={code} setCode={setCode} />
    </AppLayout>
  );
}
