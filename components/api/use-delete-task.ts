import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {  InferResponseType } from "hono";
type ResponseType = InferResponseType<typeof client.board[":id"]["$delete"]>;

export const useDeleteTask = (id?:string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.board[":id"]["$delete"]({ 
        param:{ id }
       });
      if (!response.ok) {
        throw new Error("Failed to create account");
      }
      return await response.json();
    },
    onSuccess: () => {
    //   toast.success("Account deleted successfully");
      console.log("success deleted");
      queryClient.invalidateQueries({
        queryKey: ["task", { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: () => {
    //   toast.error("Failed to Delete account");
      console.log("error");
    },
  });

  return mutation;
};
