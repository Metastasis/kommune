import { rest } from 'msw';
import {TariffByLocation} from './types'

const STORAGE_ITEM = '_kommune_tarrifs';
const DEFAULT_STORAGE: {items: TariffByLocation[]} = {
  items: [
    {
      id: '11',
      serviceId: '1',
      title: 'Вода Холодная',
      location: {
        country: 'russia',
        city: 'moscow',
      },
      tax: {
        value: 1.01,
        type: 'differenceBetweenCurrentAndPrevious'
      }
    },
    {
      id: '22',
      serviceId: '2',
      title: 'Вода Горячая',
      location: {
        country: 'russia',
        city: 'moscow',
      },
      tax: {
        value: 1.51,
        type: 'differenceBetweenCurrentAndPrevious'
      }
    },
    {
      id: '33',
      serviceId: '3',
      title: 'Вывоз мусора (БТИ)',
      location: {
        country: 'russia',
        city: 'moscow',
      },
      tax: {
        price: 150,
        type: 'fixedValue'
      }
    },
    {
      id: '44',
      serviceId: '4',
      title: 'Газ',
      location: {
        country: 'russia',
        city: 'moscow',
      },
      tax: {
        value: 1.05,
        type: 'differenceBetweenCurrentAndPrevious'
      }
    },
    {
      id: '55',
      serviceId: '5',
      title: 'Электричество (Т1)',
      location: {
        country: 'russia',
        city: 'moscow',
      },
      tax: {
        value: 1.31,
        type: 'differenceBetweenCurrentAndPrevious'
      }
    },
    {
      id: '66',
      serviceId: '6',
      title: 'Электричество (Т2)',
      location: {
        country: 'russia',
        city: 'moscow',
      },
      tax: {
        value: 1.21,
        type: 'differenceBetweenCurrentAndPrevious'
      }
    },
    {
      id: '77',
      serviceId: '7',
      title: 'Электричество (Т3)',
      location: {
        country: 'russia',
        city: 'moscow',
      },
      tax: {
        value: 1.01,
        type: 'differenceBetweenCurrentAndPrevious'
      }
    },
  ]
};

interface Storage {
  items: TariffByLocation[]
}

export const handlers = [
  rest.post('/api/tariffs', (req, res, ctx) => {
    const params = req.body;
    if (!params || typeof params !== 'object') return res(ctx.status(500));
    if (!params.country || !params.city) return res(ctx.status(400));
    const storage = getStorage();
    const tariffs = storage.items.filter(i => i.location.country === params.country && i.location.city === params.city);
    return res(
      ctx.status(200),
      ctx.json(tariffs),
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
