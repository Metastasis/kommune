import axios from 'axios'

export type TemplateParams = {
  title: string
  location: string
  services: string[]
}
type TemplateResponse = {

}
export function create(template: TemplateParams) {
  return axios.post<TemplateResponse>('/api/create-template', template).then(d => d.data)
}
