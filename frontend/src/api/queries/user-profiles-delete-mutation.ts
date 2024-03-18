import { useMutation } from "@tanstack/react-query";
import { components } from "../api.types";
import { useAPI } from "../services/use-api";

export type UserProfileFieldsDto =
  components["schemas"]["UserProfileFieldsDto"];

export const useUserProfilesDeleteMutation = () => {
  const api = useAPI();

  return useMutation({
    mutationFn: async (params: { userId: string; profileId: string }) => {
      const response = await api.delete(
        `/users/${params.userId}/profiles/${params.profileId}`
      );
      return response.data;
    },
  });
};
