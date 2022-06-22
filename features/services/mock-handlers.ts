import { rest } from 'msw';

const STORAGE_ITEM = '_kommune_services';
const DEFAULT_STORAGE: Storage = {
  items: [
    {id: '1', title: 'Вода Холодная'},
    {id: '2', title: 'Вода Горячая'},
    {id: '3', title: 'Вывоз мусора (БТИ)'},
    {id: '4', title: 'Газ'},
    {id: '5', title: 'Электричество (Т1)'},
    {id: '6', title: 'Электричество (Т2)'},
    {id: '7', title: 'Электричество (Т3)'},
  ]
};

interface Storage {
  items: Service[]
}
interface Service {
  id: string,
  title: string,
}

export const handlers = [
  rest.post('/api/service/search', (req, res, ctx) => {
    const storage = getStorage();
    return res(
      ctx.status(200),
      ctx.json(storage.items),
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
