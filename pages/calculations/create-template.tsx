import React from 'react';
import type { NextPage } from 'next'
import {useForm, SubmitHandler} from 'react-hook-form';
import useSwr from 'swr';
import {getAllServices} from '@features/services';
import {Field} from '@features/ui-form';
import {Input, Checkbox, ButtonPrimary} from '@features/ui-kit';

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
    name: 'services' as 'services',
    required: 'Выберите услугу'
  }
};

const CreateCalculation: NextPage = () => {
  const services = useSwr('allServices', getAllServices)
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  return (
    <form method="POST" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <h3>Шаблон расчета</h3>
      <Field
        error={errors[schema.title.name]?.message}
      >
        <Input {...register(schema.title.name, schema.title)} label="Название" />
      </Field>
      <Field
        error={errors[schema.location.name]?.message}
      >
        <Input {...register(schema.location.name, schema.location)} label="Населенный пункт" />
      </Field>
      {services.data?.map(service => (
        <Field
          key={service.id}
          error={errors[schema.services.name]?.at(0)?.message}
        >
          <Checkbox
            {...register(schema.services.name, schema.services)}
            label={service.title}
            id={service.id}
          />
        </Field>
      ))}
      <ButtonPrimary type="submit">Создать</ButtonPrimary>
    </form>
  );
}

export default CreateCalculation
