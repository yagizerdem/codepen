import { WorkSpace } from "@/components/work-space/work-space";
import { AppLayout } from "@/layouts/app-layout";
import { Button } from "@base-ui/react";
import { CheckIcon, RefreshCwIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEventEmitter } from "@/hooks/useEventEmitter";

export default function NewPenPage() {
  const { publishEvent } = useEventEmitter<{ data: string }>(
    "refresh-workspace",
  );

  return (
    <AppLayout>
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
        <Button className="bg-accent w-fit h-fit flex items-center justify-center align-middle cursor-pointer p-1 rounded-md">
          <CheckIcon className="h-4 w-4" />
        </Button>
      </div>
      <WorkSpace />
    </AppLayout>
  );
}
