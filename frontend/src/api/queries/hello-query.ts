// api/queries/helloQuery.ts
import { useQuery } from '@tanstack/react-query';
import api from '../services/api-services';

const fetchHelloData = async () => {
  const response = await api.get('/api/hello');
  return response.data;
};

export const useHelloQuery = () => {
  return useQuery({
    queryKey: [''],
    queryFn: () => fetchHelloData
  });
};
