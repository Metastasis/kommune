import axios from 'axios'
import {TariffByLocation} from './types'

export function fetchTariffs(city: string) {
  return axios
    .post<TariffByLocation[]>('/api/tariffs', {country: 'russia', city})
    .then(d => d.data)
}
