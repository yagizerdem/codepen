import API from "@/lib/axios-wrapper";
import type { ApiResponse, Blog } from "@codepen/shared";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function ReadPage() {
  const { blogid } = useParams();
  const blogId = blogid;

  async function fetchBlog(): Promise<Blog> {
    const response = (await API.get(`/api/blogs/${blogId}`))
      .data as ApiResponse<Blog>;

    if (!response.success) {
      throw new Error(response.message);
    }

    if (response.data) return response.data;
    throw new Error("No blog data found");
  }

  const { isLoading, data } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: fetchBlog,
  });

  console.log(data);

  return <div>{blogId}</div>;
}
