import React from 'react';
import type { NextPage } from 'next'
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import useSwr from 'swr';
import {getAllServices} from '@features/services';
import {Field} from '@features/ui-form';
import {FormInput, Checkbox, ButtonPrimary, Autocomplete} from '@features/ui-kit';
import Location, {type SelectItem} from '@features/ui-kit/Location';

type Inputs = {
  title: string,
  location: string,
  services: string
};

const schema = {
  title: {
    name: 'title' as 'title',
    required: 'Укажите название'
  },
  location: {
    name: 'location' as 'location',
    validate: (value: string, items: SelectItem[]) => {
      if (!value) {
        return 'Укажите город'
      }
      if (!items.find(item => item.value === value)) {
        return 'Укажите город из списка'
      }
      return ''
    }
  },
  services: {
    name: 'services' as 'services',
    required: 'Выберите услугу'
  }
};

const CreateCalculation: NextPage = () => {
  const services = useSwr('allServices', getAllServices)
  const { register, handleSubmit, formState: { errors }, getValues, control} = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  const locations = [
    {value: 'moscow', text: 'Москва'},
    {value: 'saint-petersburg', text: 'Санкт-Петербург'},
    {value: 'samara', text: 'Самара'},
    {value: 'saratov', text: 'Саратов'},
  ]
  console.log(errors);
  console.log(getValues());
  return (
    <form method="POST" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <h3>Шаблон расчета</h3>
      <Field
        error={errors[schema.title.name]?.message}
      >
        <FormInput {...register(schema.title.name, schema.title)} label="Название" />
      </Field>
      <Field
        error={errors[schema.location.name]?.message}
      >
        <Controller
          name={schema.location.name}
          control={control}
          rules={{
            validate: (value) => schema.location.validate(value, locations)
          }}
          render={({field}) => (
            <Autocomplete
              {...field}
              label="Населенный пункт"
              suggestions={locations}
            />
          )}
        />
      </Field>
      {services.data?.map(service => (
        <Field
          key={service.id}
          error={errors[schema.services.name]?.message}
        >
          <Checkbox
            {...register(schema.services.name, schema.services)}
            value={service.id}
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
