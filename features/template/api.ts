import axios from 'axios'
import {Service} from '@features/services';

type ServiceId = Service['id']
export type TemplateParams = {
  title: string
  location: string
  services: ServiceId[]
}
export type TemplateResponse = {
  title: TemplateParams['title'],
  location: TemplateParams['location'],
  services: Service[]
  id: string
}
export function create(template: TemplateParams) {
  return axios.post<TemplateResponse>('/api/create-template', template).then(d => d.data)
}

export type SearchParams = {
  title: string
}
export function search(template: SearchParams) {
  return axios.post<TemplateResponse[]>('/api/search-template', template).then(d => d.data)
}
