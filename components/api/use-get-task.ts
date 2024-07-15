import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetTask = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["task", { id }],
    queryFn: async () => {
        const response = await client.api.board[":id"].$get({ param: { id } });
        if (!response.ok) {
          toast.error("Failed to fetch task");
          throw new Error("Failed to fetch task");
        }
        const  data  = await response.json();
        return data.task;
    },
  });

  return query;
};
