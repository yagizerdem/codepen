import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "./blog-data";
import { useQuery } from "@tanstack/react-query";
import API from "@/lib/axios-wrapper";
import type { ApiResponse, AuthorResponse } from "@codepen/shared";
import { Skeleton } from "@components/ui/skeleton";

export function BlogAuthor({
  authorId,
  date,
}: {
  authorId: string;
  date: string;
}) {
  async function fetchAuthor(): Promise<AuthorResponse> {
    const response = (await API.get(`/api/users/${authorId}`))
      .data as ApiResponse<AuthorResponse>;

    if (!response.success) {
      throw new Error(response.message ?? "Failed to fetch author");
    }

    if (!response.data) {
      throw new Error("Author data is missing");
    }

    return response.data;
  }

  const { isLoading, data } = useQuery<AuthorResponse>({
    queryKey: ["author", authorId],
    queryFn: fetchAuthor,
  });

  const username = data?.username ?? "Unknown";

  return (
    <div className="flex items-center gap-3 text-sm">
      {isLoading ? (
        <>
          <Skeleton className="size-6 rounded-full bg-foreground/10" />
          <Skeleton className="h-4 w-24 bg-foreground/10" />
        </>
      ) : (
        <>
          <Avatar size="sm">
            <AvatarFallback>
              {username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{username}</span>
        </>
      )}
      <time dateTime={date} className="ml-auto text-muted-foreground">
        {formatDate(date)}
      </time>
    </div>
  );
}
