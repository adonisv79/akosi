import { useMutation } from "@tanstack/react-query";
import { components } from "../api.types";
import { useAPI } from "../services/use-api";
import { AxiosError } from "axios";

export type UserProfileFieldsDto =
  components["schemas"]["UserProfileFieldsDto"];

export const useUserProfilesMutation = (userId?: string) => {
  const api = useAPI();

  return useMutation({
    mutationFn: async (data: UserProfileFieldsDto) => {
      const response = await api.post(`/users/${userId}/profiles`, data);
      return response.data;
    },
    onError: (error: AxiosError) => {
      throw error;
    },
  });
};
