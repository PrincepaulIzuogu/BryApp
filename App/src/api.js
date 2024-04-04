// App/src/api.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // Update with your backend URL
});

export default instance;
