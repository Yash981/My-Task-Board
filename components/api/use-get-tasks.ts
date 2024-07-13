import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetTasks = () => {
  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await client.board.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const res = await response.json();
      return res;
    },
  });
  return query;
};
