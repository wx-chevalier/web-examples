import { Interceptor } from 'aurelia-fetch-client';

export const bearerTokenInterceptor: Interceptor = {
  request(request: Request) {
    const token = localStorage.getItem('access_token');
    if (!request.headers.has('Authorization') && token) {
      request.headers.append('Authorization', `Bearer ${token}`);
    }
    return request;
  }
}