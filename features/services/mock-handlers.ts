import { rest } from 'msw';
import {Service} from './api'

const STORAGE_ITEM = '_kommune_services';
const DEFAULT_STORAGE: Storage = {
  items: [
    {
      id: '1',
      title: 'Вода Холодная',
      ui: [
        {id: 'ui1', type: 'numberDiff', previous: {name: 'previous', min: 0}, current: {name: 'current', min: 0}},
      ]
    },
    {
      id: '2',
      title: 'Вода Горячая',
      ui: [
        {id: 'ui2', type: 'numberDiff', previous: {name: 'previous', min: 0}, current: {name: 'current', min: 0}},
      ]
    },
    {
      id: '3',
      title: 'Вывоз мусора (БТИ)',
      ui: [
        {id: 'ui3', type: 'numberFixed', min: 0, name: 'value', value: 120}
      ]
    },
    {
      id: '4',
      title: 'Газ',
      ui: [
        {id: 'ui4', type: 'numberDiff', previous: {name: 'previous', min: 0}, current: {name: 'current', min: 0}}
      ]
    },
    {
      id: '5',
      title: 'Электричество (Т1)',
      ui: [
        {id: 'ui5', type: 'numberDiff', previous: {name: 'previous', min: 0}, current: {name: 'current', min: 0}}
      ]
    },
    {
      id: '6',
      title: 'Электричество (Т2)',
      ui: [
        {id: 'ui6', type: 'numberDiff', previous: {name: 'previous', min: 0}, current: {name: 'current', min: 0}}
      ]
    },
    {
      id: '7',
      title: 'Электричество (Т3)',
      ui: [
        {id: 'ui7', type: 'numberDiff', previous: {name: 'previous', min: 0}, current: {name: 'current', min: 0}}
      ]
    },
  ]
};

interface Storage {
  items: Service[]
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


export function getStorage(): Storage {
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
