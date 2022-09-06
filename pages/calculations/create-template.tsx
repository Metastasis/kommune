import React from 'react';
import type { NextPage } from 'next'
import {useForm, Controller} from 'react-hook-form';
import useSwr from 'swr';
import {getAllServices} from '@features/services';
import {Field} from '@features/ui-form';
import {create as createTemplate} from '@features/template';
import {FormInput, Checkbox, ButtonPrimary, Autocomplete} from '@features/ui-kit';
import {type SelectItem} from '@features/ui-kit/Location';

type Inputs = {
  title: string,
  location: string,
  services: string
};
type Inputs2 = {
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
    validate: (value: string, items: SelectItem[]) => {
      if (!value) {
        return 'Укажите город'
      }
      if (!items.find(item => item.value === value)) {
        return 'Укажите город из списка'
      }
    }
  },
  services: {
    name: 'services' as 'services',
    required: 'Выберите услугу'
  }
};

const CreateCalculation: NextPage = () => {
  const [status, setStatus] = React.useState<null | 'loading' | 'success' | 'error'>(null)
  const services = useSwr('allServices', getAllServices)
  const { register, handleSubmit, formState: { errors }, control} = useForm<Inputs>();
  const onSubmit = async (data: Inputs) => {
    setStatus('loading')
    try {
      const result = await createTemplate((data as any) as Inputs2)
    } catch (err) {
      setStatus('error')
      throw err
    }
    setStatus('success')
  }
  const locations = [
    {value: 'moscow', text: 'Москва'},
    {value: 'saint-petersburg', text: 'Санкт-Петербург'},
    {value: 'samara', text: 'Самара'},
    {value: 'saratov', text: 'Саратов'},
  ]
  return (
    <form method="POST" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <h3>Шаблон расчета</h3>
      <Field error={errors[schema.title.name]?.message}>
        <FormInput
          {...register(schema.title.name, schema.title)}
          label="Название"
          disabled={status === 'loading'}
        />
      </Field>
      <Field error={errors[schema.location.name]?.message}>
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
              disabled={status === 'loading'}
            />
          )}
        />
      </Field>
      <Field error={errors[schema.services.name]?.message}>
        {services.data?.map(service => (
          <Checkbox
            key={service.id}
            {...register(schema.services.name, schema.services)}
            value={service.id}
            label={service.title}
            id={service.id}
            disabled={status === 'loading'}
          />
        ))}
      </Field>
      <ButtonPrimary type="submit" disabled={status === 'loading'}>
        Создать
      </ButtonPrimary>
      {status === 'error' ? <div>Не удалось создать. Попробуйте позже</div> : null}
    </form>
  );
}

export default CreateCalculation
