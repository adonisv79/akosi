// api/queries/helloQuery.ts
import { useQuery } from '@tanstack/react-query';
import { useAPI } from '../services/use-api';

const fetchHelloData = async () => {
  const api = useAPI();
  const response = await api.get('/api/hello');
  return response.data;
};

export const useHelloQuery = () => {
  return useQuery({
    queryKey: [''],
    queryFn: () => fetchHelloData
  });
};
