import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MoreVerticalIcon, SquarePenIcon, Trash2Icon } from "lucide-react";
import type { Pen } from "@codepen/shared";
import API from "@/lib/axios-wrapper";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function PenActions({ pen, href }: { pen: Pen; href: string }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const deletion = useMutation({
    mutationFn: () => API.delete(`/api/pens/${pen._id}`),
    onSuccess: () => {
      setConfirmingDelete(false);
      toast.success("Pen deleted", { position: "top-right" });
      return queryClient.invalidateQueries({ queryKey: ["pens"] });
    },
    onError: (error) => toast(error.message, { position: "top-right" }),
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="More options"
              className="shrink-0"
            />
          }
        >
          <MoreVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => navigate(href)}>
            <SquarePenIcon />
            Open in editor
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setConfirmingDelete(true)}
          >
            <Trash2Icon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirmingDelete} onOpenChange={setConfirmingDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this pen?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the pen and its HTML, CSS and JS. It
              can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletion.isPending}>
              Cancel
            </AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={deletion.isPending}
              onClick={() => deletion.mutate()}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
