import { rest } from 'msw';
import {TemplateResponse, SearchParams} from './api'
import {getStorage as getServices, Service} from '@features/services';
import {getStorage as getTariffs, TariffByLocation} from '@features/tariffs';


interface ServiceWithTax extends Service {
  tax: TariffByLocation['tax']
}
const STORAGE_ITEM = '_kommune_templates';
const defaultLocation = {
  country: 'russia',
  city: 'moscow'
};
const defaultTariffs = getTariffs().items.filter(
  t => t.location.country === defaultLocation.country && t.location.city === defaultLocation.city
);
const defaultServices = getServices().items.reduce((acc, service) => {
  if (['1', '2', '3', '4', '5'].includes(service.id)) {
    const tariff = defaultTariffs.find(t => (
      t.serviceId === service.id
      && t.location.country === defaultLocation.country
      && t.location.city === defaultLocation.city
    ));
    if (!tariff) return acc;
    acc.push({...service, tax: tariff.tax});
  }
  return acc;
}, [] as ServiceWithTax[]);
const DEFAULT_STORAGE: Storage = {
  items: [
    {
      id: '1',
      title: 'sokolniki',
      location: defaultLocation,
      services: defaultServices
    },
  ]
};

interface Storage {
  items: Template[]
}
interface Template extends TemplateResponse {
  id: string,
}

export const handlers = [
  rest.post('/api/create-template', (req, res, ctx) => {
    const storage = getStorage();
    const params = req.body as TemplateResponse
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
    const tariffs = getTariffs();
    const mapServices = services.items.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {} as {[key: string]: Service})
    const results = storage.items
      .filter(item => item.title.toLowerCase().includes(params.title.toLowerCase()))
      .map(item => ({
        ...item,
        services: item.services.map(service => {
          const tariff = tariffs.items.find(t => (
            t.serviceId === service.id
            && t.location.country === item.location.country
            && t.location.city === item.location.city
          ))
          if (!tariff) return null;
          return {...mapServices[service.id], tax: tariff.tax};
        }).filter(Boolean)
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
