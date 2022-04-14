import axios from 'axios';
import { API_KEY, PAGE_SIZE } from './constants';

const apiService = axios.create({
    baseURL: "https://api.flickr.com/services/rest",
    timeout: 3000
});

const requestInterceptor = (request) => {
    request.params = {
        ...request.params,
        "api_key": API_KEY,
        "format": "json",
        "nojsoncallback": 1,
        "per_page": PAGE_SIZE
    }
    return request;
  };
  
const responseInterceptor = (response) => {
    return response;
};

apiService.interceptors.request.use(requestInterceptor);
apiService.interceptors.response.use(responseInterceptor);

export default apiService;