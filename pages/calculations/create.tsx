import React from 'react';
import type { NextPage } from 'next'

const CreateCalculation: NextPage = () => {
  const {services} = useServices()
  return (
    <form method="POST" action="" noValidate autoComplete="off">
      <h3>Шаблон расчета</h3>
      <div>
        <input type="text" name="title" placeholder="Название" />
      </div>
      <div>
        <input type="text" name="location" placeholder="Населенный пункт" />
      </div>
      {services.map(service => (
        <div  key={service.id}>
          <input type="checkbox" id={service.id} value={service.id} name="services" />
          <label htmlFor={service.id}>{service.title}</label>
        </div>
      ))}
      <input type="submit" value="Создать" />
    </form>
  );
}

interface Service {
  id: string
  title: string
}

function useServices(): {services: Service[]} {
  const services: Service[] = [
    {id: '1', title: 'Вода Холодная'},
    {id: '2', title: 'Вода Горячая'},
    {id: '3', title: 'Вывоз мусора (БТИ)'},
    {id: '4', title: 'Газ'},
    {id: '5', title: 'Электричество (Т1)'},
    {id: '6', title: 'Электричество (Т2)'},
    {id: '7', title: 'Электричество (Т3)'},
  ];
  return {services}
}

export default CreateCalculation
