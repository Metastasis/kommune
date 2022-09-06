import { rest } from 'msw';
import {TemplateParams, SearchParams} from './api'
import {getStorage as getServices, Service} from '@features/services';


const STORAGE_ITEM = '_kommune_templates';
const defaultServices = getServices().items.reduce((acc, service) => {
  if (['1', '2', '3', '4', '5'].includes(service.id)) {
    acc.push(service);
  }
  return acc;
}, [] as Service[]);
const DEFAULT_STORAGE: Storage = {
  items: [
    {
      id: '1',
      title: 'sokolniki',
      location: 'moscow',
      services: defaultServices
    },
  ]
};

interface Storage {
  items: Template[]
}
interface Template extends TemplateParams {
  id: string,
}

export const handlers = [
  rest.post('/api/create-template', (req, res, ctx) => {
    const storage = getStorage();
    const params = req.body as TemplateParams
    const template = {...params, id: String(Math.random())}
    storage.items.push(template)
    saveStorage(storage)
    return res(
      ctx.status(200),
      ctx.json(template)
    )
  }),
  rest.post('/api/search-template', (req, res, ctx) => {
    const storage = getStorage();
    const params = req.body as SearchParams
    const services = getServices();
    const mapServices = services.items.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {} as {[key: string]: Service})
    const results = storage.items
      .filter(item => item.title.toLowerCase().includes(params.title.toLowerCase()))
      .map(item => ({
        ...item,
        services: item.services.map(service => mapServices[service.id])
      }))
    return res(
      ctx.status(200),
      ctx.json(results)
    )
  })
];

export default handlers;


function getStorage(): Storage {
  let services = DEFAULT_STORAGE;
  const defaults = JSON.stringify(DEFAULT_STORAGE);
  try {
    services = JSON.parse(sessionStorage.getItem(STORAGE_ITEM) || defaults);
  } catch (err) {
    console.error(err);
  }
  return services;
}

function saveStorage(services: Storage) {
  try {
    sessionStorage.setItem(STORAGE_ITEM, JSON.stringify(services));
  } catch(err) {
    console.error(err);
  }
}
