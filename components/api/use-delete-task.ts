import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {  InferResponseType } from "hono";
import { toast } from "sonner";
type ResponseType = InferResponseType<typeof client.api.board[":id"]["$delete"]>;

export const useDeleteTask = (id?:string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.board[":id"]["$delete"]({ 
        param:{ id }
       });
      if (!response.ok) {
        toast.error("Failed to create Task");
        throw new Error("Failed to create Task");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Task deleted successfully");
      // console.log("success deleted");
      queryClient.invalidateQueries({
        queryKey: ["task", { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: () => {
      toast.error("Failed to Delete Task");
      console.log("error");
    },
  });

  return mutation;
};
