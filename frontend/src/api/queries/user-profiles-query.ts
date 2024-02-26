// api/queries/helloQuery.ts
import { useQuery } from '@tanstack/react-query';
import { useAPI } from '../services/use-api';
import { components } from '../api.types';


export type UserProfileDto =
  components["schemas"]["UserProfileDto"];

export const useUserProfilesQuery = (userId?: string) => {
  const api = useAPI();

  const fetchProfiles = async () => {
    const response = await api.get<UserProfileDto[]>(`/users/${userId}/profiles`);
    return response.data;
  };

  return useQuery({
    queryKey: ["get-user-profiles", userId],
    queryFn: async () => await fetchProfiles(),
    throwOnError: true,
  });
};