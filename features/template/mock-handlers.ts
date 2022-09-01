import { rest } from 'msw';
import {TemplateParams} from './api'

const STORAGE_ITEM = '_kommune_templates';
const DEFAULT_STORAGE: Storage = {
  items: [
    {id: '1', title: 'Сокольники', location: '', services: []},
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
