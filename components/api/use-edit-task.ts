import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.board[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.board[":id"]["$patch"]>["json"];

export const useEditTask = (id?:string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationFn: async (json) => {
        const response = await client.api.board[":id"]["$patch"]({ 
          json,
          param:{ id }
         });
        if (!response.ok) {
          toast.error("Failed to Edit task");
          throw new Error("Failed to Edit task");
        }
        return await response.json();
      },
      onSuccess: () => {
        toast.success("Task Updated");
        console.log("success");
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
          });
          queryClient.invalidateQueries({
              queryKey: ["task", { id }],
          });
      },
      onError: () => {
        toast.error("Failed to Edit Task");
        console.log("error");
      },
    });
  
    return mutation;
  };