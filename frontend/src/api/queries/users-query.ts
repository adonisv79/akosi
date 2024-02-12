import { useQuery } from "@tanstack/react-query";
import api from "../services/api-services";
import { UsersHistoriesResponseDto } from "../api.types";

const fetchHistories = async (userId: string): Promise<UsersHistoriesResponseDto[]> => {
  const response = await api.get(`/users/${userId}/histories`);
  return response.data;
}

export const useUserHistoryQuery = (userId: string) => {
  return useQuery({
    queryKey: ['get-user-histories', userId],
    queryFn: async () => await fetchHistories(userId)
  });
};