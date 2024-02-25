import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAPI } from "../services/use-api";
import type { components } from "../api.types";

export type UserCredentialsDto = components['schemas']['UserCredentialsDto']
export type SignedUserResponseDto = components['schemas']['SignedUserResponseDto']
export type PasswordDto = components['schemas']['PasswordDto']

export const useSignInAccountMutation = () => {
  const api = useAPI();
  return useMutation({
    mutationFn: async (authData: UserCredentialsDto) => {
      const response = await api.post<SignedUserResponseDto>("/auth/login", authData);
      return response.data;
    },
  });
};

export const useCreateAccountMutation = () => {
  const api = useAPI();
  return useMutation({
    mutationFn: async (data: UserCredentialsDto) => {
      const response = await api.post<SignedUserResponseDto>("/auth", data);
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
    mutationFn: async (data: UserCredentialsDto) => {
      const response = await api.put("/auth", data);
      return response.data;
    },
  });
};

export const useDeleteAccountMutation = () => {
  const api = useAPI();
  return useMutation({
    mutationFn: async (data: PasswordDto) => {
      const response = await api.delete("/auth", { data });
      return response.data;
    },
  });
};
