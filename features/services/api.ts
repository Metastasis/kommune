import axios from 'axios';

type Uuid = string

interface Service {
  id: Uuid,
  title: string
}

export function getAllServices() {
  return axios.post<Service[]>('/api/service/search').then(d => d.data)
}
