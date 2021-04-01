import request from '@/utils/request';

export async function getMapData() {
  return request('/api/processmap/data');
}
