import request from '@/utils/request';

export async function getAccessToken() {
  return request('http://localhost:3000', {
    method: 'GET',
  });
}
