import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAPI } from "../services/use-api";

type AuthData = {
  username: string;
  password: string;
};

export const useSignInAccountMutation = () => {
  const api = useAPI();
  return useMutation({
    mutationFn: async (authData: AuthData) => {
      const response = await api.post("/auth/login", authData);
      return response.data;
    },
  });
};

export const useCreateAccountMutation = () => {
  const api = useAPI();
  return useMutation({
    mutationFn: async (authData: AuthData) => {
      const response = await api.post("/auth", authData);
      return response.data;
    },
    onError: (error: AxiosError) => {      
      throw error;
    }
  });
};

export const useUpdateCredentialsMutation = () => {
  const api = useAPI();
  return useMutation({
    mutationFn: async (updatedAuthData: AuthData) => {
      const response = await api.put("/auth", updatedAuthData);
      return response.data;
    },
  });
};

export const useDeleteAccountMutation = () => {
  const api = useAPI();
  return useMutation({
    mutationFn: async () => {
      const response = await api.delete("/auth");
      return response.data;
    },
  });
};
