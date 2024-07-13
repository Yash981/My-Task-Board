import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type RequestType = InferRequestType<typeof client.board.$post>["json"];
type ResponseType = InferResponseType<typeof client.board.$post>;

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationFn: async (json) => {
        const response = await client.board.$post( { json } );
        if (!response.ok) {
          throw new Error("Failed to create task");
        }
        return await response.json();
      },
      onSuccess: () => {
        // toast.success("Account created");
        console.log("success");
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });
      },
      onError: () => {
        // toast.error("Failed to create account");
        console.log("error");
      },
    });
  
    return mutation;
  };