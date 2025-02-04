import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.board.$post>["json"];
type ResponseType = InferResponseType<typeof client.api.board.$post>;

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationFn: async (json) => {
        const response = await client.api.board.$post( { json } );
        if (!response.ok) {
          throw new Error("Failed to create task");
        }
        return await response.json();
      },
      onSuccess: () => {
        toast.success("Task created");
        console.log("success");
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });
      },
      onError: () => {
        toast.error("Failed to create Task");
        console.log("error");
      },
    });
  
    return mutation;
  };