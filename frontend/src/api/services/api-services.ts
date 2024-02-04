// api/services/apiService.ts
import axios from 'axios';

const bearerToken = sessionStorage.getItem('accessToken');
const api = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: bearerToken ? `Bearer ${bearerToken}` : undefined,
    // Add other headers if needed
  },
});

export default api;
