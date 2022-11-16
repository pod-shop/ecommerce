import axios, { AxiosRequestConfig } from 'axios';

/**
 * Common fetcher to use by default for SWR.
 */
//export default (resource: RequestInfo, init?: RequestInit) => fetch(resource, init).then(res => res.json());
export default (url: string) => axios.get(url).then(res => res.data);

axios.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  if (config.headers) {
    config.headers['Content-Type'] = 'application/json';

    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbIlJPTEVfQURNSU4iXSwiaWQiOiIxMGI1MDNiOC1mM2Q5LTQyOGEtYmRhYS1jM2NjMGEwYzg3YmUiLCJ1c2VybmFtZSI6ImFkbWluQHRlc3QuY29tIiwic3ViIjoiMTBiNTAzYjgtZjNkOS00MjhhLWJkYWEtYzNjYzBhMGM4N2JlIiwiaWF0IjoxNjQ3MDIxMjE4LCJleHAiOjQ4MDI3MTM4Mzh9.RIi9gCy2GQTybzX47UDq3yCnOBZ02saW9uBu9Io5CFTXG0xf4XIxIrn87wpPew7vx1nDSYEoOjP_xogZMjt7eQ';
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});
