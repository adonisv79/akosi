import { useQuery } from "@tanstack/react-query";
import { components } from "../api.types";
import { useAPI } from "../services/use-api";

export type UsersHistoriesResponseDto =
  components["schemas"]["UsersHistoriesResponseDto"];

export const useUserHistoryQuery = (userId?: string) => {
  const api = useAPI();

  const fetchHistories = async (userId?: string) => {
    if (!userId) return [];
    const response = await api.get<UsersHistoriesResponseDto[]>(
      `/users/${userId}/histories`
    );
    return response.data;
  };

  return useQuery({
    queryKey: ["get-user-histories", userId],
    queryFn: async () => await fetchHistories(userId),
    throwOnError: true,
  });
};
