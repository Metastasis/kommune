import React from 'react';
import type { NextPage } from 'next'
import {useForm} from 'react-hook-form';
import get from 'lodash.get';
import {
  search,
  TemplateResponse
} from '@features/template';
import {create as createCalculation} from '@features/calculation';
import {FormInput, AutocompleteControlled, ButtonPrimary} from '@features/ui-kit';
import {Field} from '@features/ui-form';
import {type SelectItem} from '@features/ui-kit/Location';


const CreateCalculation: NextPage = () => {
  const [suggestions, setSuggestions] = React.useState<SelectItem<TemplateResponse>[]>([])
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selected, setSelected] = React.useState<SelectItem<TemplateResponse> | null>(null)
  const handleSearch = React.useCallback((value: string) => {
    setSelected(null)
    setSearchTerm(value)
  }, [])
  const handleSelect = React.useCallback((item: SelectItem<TemplateResponse> | '') => {
    setSelected(item || null)
    setSearchTerm(item && item.text)
  }, [])
  React.useEffect(() => {
    if (!searchTerm) return
    search({title: searchTerm})
      .then(results => results.map(res => ({text: res.title, value: res.id, data: res})))
      .then(results => setSuggestions(results))
      .catch(() => setSuggestions([]))
  }, [searchTerm])
  return (
    <div>
      <h3>Расчет</h3>
      <AutocompleteControlled
        name="templateId"
        label="Шаблон"
        suggestions={suggestions}
        value={searchTerm}
        onChange={handleSearch}
        onSelect={handleSelect}
      />
      {selected?.data?.services && (
        <GeneratedForm
          services={selected.data.services}
          flatSquare={selected.data.flat.square}
        />
      )}
    </div>
  );
}

export default CreateCalculation

type Inputs = any;

interface GeneratedFormProps {
  services: TemplateResponse['services'],
  flatSquare: number
}
function GeneratedForm(props: GeneratedFormProps) {
  const {services, flatSquare} = props;
  const [status, setStatus] = React.useState<null | 'loading' | 'success' | 'error'>(null)
  const {register, handleSubmit, formState: { errors }, getValues} = useForm({
    defaultValues: collectDefaultValues(services, flatSquare)
  })
  const onSubmit = async (data: Inputs) => {
    setStatus('loading')
    try {
      await createCalculation((data as any))
    } catch (err) {
      setStatus('error')
      throw err
    }
    setStatus('success')
  }
  return (
    <form method="POST" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      {services.map(s => s.ui.map(ui => {
        if (ui.type === 'numberDiff') {
          const name = `${s.title}.${ui.previous.name}`;
          const error = get(errors, `${name}.message`);
          const nextName = `${s.title}.${ui.current.name}`;
          const nextError = get(errors, `${nextName}.message`);
          return (
            <div key={ui.id}>
              <label>{s.title}</label>
              <Field error={error}>
                <FormInput
                  {...register(name, {required: 'Укажите значение', min: ui.previous.min})}
                  label="Пред"
                  disabled={status === 'loading'}
                />
              </Field>
              <Field error={nextError}>
                <FormInput
                  {...register(nextName, {required: 'Укажите значение', min: ui.current.min})}
                  label="След"
                  disabled={status === 'loading'}
                />
              </Field>
            </div>
          )
        }
        if (ui.type === 'numberFixed') {
          const name = `${s.title}.${ui.name}`;
          const error = get(errors, `${name}.message`);
          return (
            <div key={ui.id}>
              <Field error={error}>
                <FormInput
                  {...register(name, {required: 'Укажите значение', min: ui.min})}
                  label={s.title}
                  min={ui.min}
                  disabled={status === 'loading'}
                />
              </Field>
            </div>
          )
        }
        if (ui.type === 'valueDependsOnFlatSquare') {
          const name = `${s.title}.${ui.taxValue.name}`;
          const error = get(errors, `${name}.message`);
          const nameFlatSquare = `${s.title}.${ui.flatSquare.name}`;
          const errorFlatSquare = get(errors, `${nameFlatSquare}.message`);
          return (
            <div key={ui.id}>
              <label>{s.title}</label>
              <Field error={error}>
                <FormInput
                  {...register(name, {required: 'Укажите значение'})}
                  label={'Тариф'}
                  disabled={status === 'loading'}
                />
              </Field>
              <Field error={errorFlatSquare}>
                <FormInput
                  {...register(nameFlatSquare, {required: 'Укажите значение'})}
                  label={'Площадь квартиры'}
                  disabled={status === 'loading'}
                />
              </Field>
            </div>
          )
        }
        return null;
      }))}
      <div>
        <span>Итого: </span>
        <span>{calculate(getValues())}</span>
      </div>
      <ButtonPrimary type="submit">Посчитать</ButtonPrimary>
    </form>
  )
}

function collectDefaultValues(
  services: TemplateResponse['services'],
  flatSquare: GeneratedFormProps['flatSquare']
) {
  const result = {} as any;
  services.forEach(s => s.ui.forEach(ui => {
    if (ui.type === 'numberFixed') {
      result[s.title] = {
        [ui.name]: ui.value
      };
    }
    if (ui.type === 'numberDiff') {
      result[s.title] = {
        ['taxValue']: (s as any).tax.value
      };
    }
    if (ui.type === 'valueDependsOnFlatSquare') {
      result[s.title] = {
        [ui.taxValue.name]: ui.taxValue.value,
        [ui.flatSquare.name]: flatSquare
      };
    }
  }, {} as any))
  return result;
}

function calculate(values: Object) {
  return Object.values(values).reduce((acc, service) => {
    if (service.current && service.previous && service.taxValue) {
      return acc + ((service.current && service.previous) * service.taxValue);
    }
    if (service.flatSquare && service.taxValue) {
      return acc + (service.flatSquare * service.taxValue);
    }
    return acc;
  }, 0);
}
