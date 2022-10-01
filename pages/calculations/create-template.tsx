import React from 'react';
import type { NextPage } from 'next'
import {useForm, Controller} from 'react-hook-form';
import useSwr from 'swr';
import {useRouter} from 'next/router'
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

const schema = {
  title: {
    name: 'title' as 'title',
    required: 'Укажите название'
  },
  location: {
    name: 'location' as 'location',
    validate: (value: string, items: SelectItem<any>[]) => {
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

const locations = [
  {value: 'moscow', data: {country: 'russia', city: 'moscow'}, text: 'Москва'},
  {value: 'saint-petersburg', data: {country: 'russia', city: 'saint-petersburg'}, text: 'Санкт-Петербург'},
  {value: 'samara', data: {country: 'russia', city: 'samara'}, text: 'Самара'},
  {value: 'saratov', data: {country: 'russia', city: 'saratov'}, text: 'Саратов'},
]
const CreateCalculation: NextPage = () => {
  const [status, setStatus] = React.useState<null | 'loading' | 'success' | 'error'>(null)
  const router = useRouter();
  const services = useSwr('allServices', getAllServices)
  const { register, handleSubmit, formState: { errors }, control} = useForm<Inputs>();
  const onSubmit = async (data: Inputs) => {
    const location = locations.find(l => l.value === data.location);
    if (!location) {
      setStatus('error')
      throw new Error('Location not found');
    }
    setStatus('loading')
    try {
      await createTemplate({
        ...data,
        location: location.data,
        services: data.services as any
      })
    } catch (err) {
      setStatus('error')
      throw err
    }
    setStatus('success')
    router.push('/calculations')
  }
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
