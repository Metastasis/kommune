import axios from 'axios'

interface SearchItems {
  id: string,
  title: string,
  createdAt: string,
}
interface SearchItemsNormalized {
  id: string,
  title: string,
  createdAt: Date,
}

export function search() {
  return axios.post<SearchItemsNormalized[]>('/api/calculation/search')
    .then(d => ((d.data as any) as SearchItems[]).map(item => ({
      ...item,
      createdAt: new Date(item.createdAt)
    })));
}

interface CalculationParams {

}
interface CalculationResponse {

}
export function create(calculation: CalculationParams) {
  return axios.post<CalculationResponse>('/api/calculation/create', calculation)
    .then(({data}) => data);
}
