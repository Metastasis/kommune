import { rest } from 'msw';

export const handlers = [
  rest.post('/calculation/search', (req, res, ctx) => {
    const items = [
      {
        id: '1',
        title: 'Зябликово',
        services: [],
        createdAt: new Date('04-20-2022'),
        status: 'new'
      },
      {
        id: '2',
        title: 'Зябликово',
        services: [],
        createdAt: new Date('04-19-2022'),
        status: 'new'
      },
      {
        id: '3',
        title: 'Зябликово',
        services: [],
        createdAt: new Date('04-18-2022'),
        status: 'new'
      },
      {
        id: '4',
        title: 'Зябликово',
        services: [],
        createdAt: new Date('04-17-2022'),
        status: 'new'
      }
    ]
    return res(
      ctx.status(200),
      ctx.json(items),
    )
  }),
  rest.post('/calculation/create', (req, res, ctx) => {
    const item = {
      id: '5',
      title: 'Тверская',
      services: [],
      createdAt: new Date(),
      status: 'new'
    }
    return res(
      ctx.status(200),
      ctx.json(item),
    )
  }),
  rest.post('/calculation/archive', (req, res, ctx) => {
    const item = {
      id: '5',
      title: 'Тверская',
      services: [],
      createdAt: new Date(),
      status: 'archived'
    }
    return res(
      ctx.status(200),
      ctx.json(item),
    )
  }),
  rest.post('/calculation/edit', (req, res, ctx) => {
    const item = {
      id: '5',
      title: 'Тверская',
      services: [],
      createdAt: new Date(),
      status: 'archived'
    }
    return res(
      ctx.status(200),
      ctx.json(item),
    )
  }),
];

export default handlers;
