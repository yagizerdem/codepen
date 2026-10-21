export const ALL_TAGS = "All";

export function getExcerpt(body: string): string {
  return body.split("\n\n")[0];
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
