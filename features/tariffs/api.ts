import axios from 'axios'
import {Tariffs} from './types'

export function fetchTariffs(city: string) {
  return axios.post<Tariffs>('/api/tariffs', {city}).then(d => d.data)
}
