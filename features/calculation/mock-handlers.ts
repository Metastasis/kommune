import { rest } from 'msw';

const CALCULATIONS_ITEM = '_kommune_calculation';
const DEFAULT_CALCULATIONS: CalculationStorage = {templates: [], items: []};
interface CalculationStorage {
  templates: CalculationTemplate[],
  items: Array<CalculationItem>
}
interface CalculationTemplate {
  id: string,
  title: string,
  services: Array<unknown>,
  createdAt: Date,
  status: 'new'
}
interface CalculationItem {
  id: string,
  title: string,
  createdAt: Date,
}
interface CreateTemplateBody {
  title: CalculationTemplate['title'],
  services: CalculationTemplate['services']
}

export const handlers = [
  rest.post('/api/calculation/search', (req, res, ctx) => {
    const calculationStorage = getCalculations();
    const items = calculationStorage.items;
    return res(
      ctx.status(200),
      ctx.json(items),
    )
  }),
  rest.post('/api/calculation/create', (req, res, ctx) => {
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
  rest.post<CreateTemplateBody>('/api/calculation/create-template', (req, res, ctx) => {
    const calculationStorage = getCalculations();
    const item: CalculationTemplate = {
      id: uuid(),
      title: req.body.title,
      services: req.body.services,
      createdAt: new Date(),
      status: 'new'
    }
    calculationStorage.templates.push(item);
    saveCalculations(calculationStorage);
    return res(
      ctx.status(200),
      ctx.json(item),
    )
  }),
  rest.post('/api/calculation/archive', (req, res, ctx) => {
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
  rest.post('/api/calculation/edit', (req, res, ctx) => {
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

function uuid() {
  return String(Math.random()).slice(2);
}

function getCalculations(): CalculationStorage {
  let calculations = DEFAULT_CALCULATIONS;
  const defaults = JSON.stringify(DEFAULT_CALCULATIONS);
  try {
    calculations = JSON.parse(sessionStorage.getItem(CALCULATIONS_ITEM) || defaults);
  } catch (err) {
    console.error(err);
  }
  return calculations;
}

function saveCalculations(calculation: CalculationStorage) {
  try {
    sessionStorage.setItem(CALCULATIONS_ITEM, JSON.stringify(calculation));
  } catch(err) {
    console.error(err);
  }
}
