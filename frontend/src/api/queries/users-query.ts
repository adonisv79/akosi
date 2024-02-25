import { useQuery } from "@tanstack/react-query";
import { UsersHistoriesResponseDto } from "../api.types";
import { useAPI } from "../services/use-api";

export const useUserHistoryQuery = (userId?: string) => {
  const api = useAPI();

  const fetchHistories = async (
    userId?: string,
  ): Promise<UsersHistoriesResponseDto[]> => {
    if (!userId) return [];
    const response = await api.get(`/users/${userId}/histories`);
    return response.data;
  };
  
  return useQuery({
    queryKey: ["get-user-histories", userId],
    queryFn: async () => await fetchHistories(userId),
    throwOnError: true,
  });
};
