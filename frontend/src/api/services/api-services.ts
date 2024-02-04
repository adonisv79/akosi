// api/services/apiService.ts
import axios from 'axios';

const bearerToken = sessionStorage.getItem('accessToken');
let preferedLanguageCode = localStorage.getItem('lang');
if (preferedLanguageCode !== 'en') preferedLanguageCode += ', en'
const api = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: bearerToken ? `Bearer ${bearerToken}` : undefined,
    'Accept-Language': preferedLanguageCode,
    // Add other headers if needed
  },
});

export default api;
