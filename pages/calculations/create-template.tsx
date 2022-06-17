import React from 'react';
import type { NextPage } from 'next'
import {useForm, SubmitHandler} from 'react-hook-form';
import {Field} from '@features/ui-form';
import {Input, CheckboxGroup, Location} from '@features/ui-kit';

type Inputs = {
  title: string,
  location: string,
  services: string[]
};

const schema = {
  title: {
    name: 'title' as 'title',
    required: 'Укажите название'
  },
  location: {
    name: 'location' as 'location',
    required: 'Укажите населенный пункт'
  },
  services: {
    name: 'services' as 'services'
  }
};

const CreateCalculation: NextPage = () => {
  const {services} = useServices()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  return (
    <form method="POST" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <h3>Шаблон расчета</h3>
      <Field
        error={errors[schema.title.name]?.message}
      >
        <Input {...register(schema.title.name, schema.title)} label="Название" />
      </Field>
      {/*<div>*/}
      {/*  <input {...register(schema.title.name, schema.title)} placeholder="Название" />*/}
      {/*  {errors.title && <p>{errors.title?.message}</p>}*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <input  {...register(schema.location.name, schema.location)} placeholder="Населенный пункт" />*/}
      {/*  {errors.location && <p>{errors.location?.message}</p>}*/}
      {/*</div>*/}
      {/*{services.map(service => (*/}
      {/*  <div key={service.id}>*/}
      {/*    <input type="checkbox" id={service.id} {...register(schema.services.name)} />*/}
      {/*    <label htmlFor={service.id}>{service.title}</label>*/}
      {/*  </div>*/}
      {/*))}*/}
      {/*{errors.services && <p>{errors.services?.at(0)?.message}</p>}*/}
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
