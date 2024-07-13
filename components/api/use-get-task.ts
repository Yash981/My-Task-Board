import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetTask = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["task", { id }],
    queryFn: async () => {
        const response = await client.board[":id"].$get({ param: { id } });
        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }
        const  data  = await response.json();
        return data.task;
    },
  });

  return query;
};
