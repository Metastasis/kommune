import axios from 'axios';

type Uuid = string
interface UiInputDifference {
  id: string,
  type: 'numberDiff',
  previous: {
    name: string,
    min: number,
  },
  current: {
    name: string,
    min: number,
  }
}
interface UiInputFixed {
  id: string,
  type: 'numberFixed',
  min: number,
  name: string,
  value: number
}
export interface Service {
  id: Uuid,
  title: string,
  ui: Array<UiInputDifference | UiInputFixed>
}

export function getAllServices() {
  return axios.post<Service[]>('/api/service/search').then(d => d.data)
}
