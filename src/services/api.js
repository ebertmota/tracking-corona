import axios from 'axios';

const api = axios.create({
  baseURL: 'https://covid19-brazil-api.now.sh',
});

export default api;
