import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetTasks = () => {
  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await client.api.board.$get();
      if (!response.ok) {
        toast.error("Failed to fetch tasks");
        throw new Error("Failed to fetch tasks");
      }
      const res = await response.json();
      return res;
    },
  });
  return query;
};
