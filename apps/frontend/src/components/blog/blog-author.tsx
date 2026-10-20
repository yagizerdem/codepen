import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate, getAuthor } from "./blog-data";

export function BlogAuthor({
  authorId,
  date,
}: {
  authorId: string;
  date: string;
}) {
  const username = getAuthor(authorId)?.username ?? "unknown";

  return (
    <div className="flex items-center gap-3 text-sm">
      <Avatar size="sm">
        <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className="font-medium">{username}</span>
      <time dateTime={date} className="ml-auto text-muted-foreground">
        {formatDate(date)}
      </time>
    </div>
  );
}
