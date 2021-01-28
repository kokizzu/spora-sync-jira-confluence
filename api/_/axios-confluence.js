import axios from 'axios';
import qs from 'qs';

const {
  CONFLUENCE_PASSWORD,
  CONFLUENCE_URL,
  CONFLUENCE_USERNAME,
} = process.env;

export default axios.create({
  baseURL: new URL('/wiki/rest/api', CONFLUENCE_URL).href,
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: CONFLUENCE_USERNAME,
    password: CONFLUENCE_PASSWORD,
  },
  paramsSerializer: params => (
    qs.stringify(params, {
      arrayFormat: 'repeat',
    })
  ),
});
