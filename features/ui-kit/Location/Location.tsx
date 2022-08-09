import React from 'react'
import { Controller, Control, Validate } from 'react-hook-form';
import Autocomplete, {type SelectItem as Item} from '../Autocomplete'


interface Props {
  name: string,
  label: string,
  validate?: Validate<any>
  control: Control<any>
  items: Item[]
}

const Location = (props: Props) => {
  const { label, name, control, items, validate } = props
  return (
    <Controller
      name={name}
      control={control}
      rules={{validate}}
      render={({field: {onChange, onBlur, ref}}) => (
        <Autocomplete
          ref={ref}
          name={name}
          label={label}
          items={items}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    />
  )
};

export default Location;
export type SelectItem = Item;
