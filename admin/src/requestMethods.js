import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2QwOGM1NmVlYWNhMDBkOGM4OGE0MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2OTY0MDQ5MCwiZXhwIjoxNjY5ODk5NjkwfQ.41OAZUfLFfpRNtQyNGGXIwPRdBF50d41JFH3Kdrvp10';

export const publicRequest = axios.create({
  baseURL: BASE_URL
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` }
});
