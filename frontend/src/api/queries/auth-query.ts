import { useMutation } from "@tanstack/react-query";
import api from "../services/api-services";

type AuthData = {
  username: string;
  password: string;
};

export const useSignInAccountMutation = () => {
  return useMutation({
    mutationFn: async (authData: AuthData) => {
      const response = await api.post("/auth/login", authData);
      return response.data;
    },
  });
};

export const useCreateAccountMutation = () => {
  return useMutation({
    mutationFn: async (authData: AuthData) => {
      const response = await api.post("/auth", authData);
      return response.data;
    },
  });
};

export const useUpdateCredentialsMutation = () => {
  return useMutation({
    mutationFn: async (updatedAuthData: AuthData) => {
      const response = await api.put("/auth", updatedAuthData);
      return response.data;
    },
  });
};

export const useDeleteAccountMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await api.delete("/auth");
      return response.data;
    },
  });
};
