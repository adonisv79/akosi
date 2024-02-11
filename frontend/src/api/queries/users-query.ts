import { useQuery } from "@tanstack/react-query";
import api from "../services/api-services";

export const useUserHistoryQuery = (userId: string) => {
  return useQuery({
    queryKey: ['get-user-histories', userId],
    queryFn: () => async (userId: string) => {
      const response = await api.get(`/api/users/${userId}/histories`);
      return response.data;
    }
  });
};