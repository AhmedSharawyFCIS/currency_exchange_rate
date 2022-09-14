import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.frankfurter.app/',
  timeout: 30000,
});
