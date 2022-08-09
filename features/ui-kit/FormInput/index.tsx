import React, {FocusEventHandler} from 'react';
import { UseFormRegister } from 'react-hook-form';
import Input from '../Input'


type Props = {
  label: string,
  onFocus?: FocusEventHandler<HTMLInputElement>
} & ReturnType<UseFormRegister<{[key: string]: unknown}>>;

type Changer = (value: string, event: Pick<InputEvent, 'target' | 'type'>) => void
export default React.forwardRef<HTMLInputElement, Props>(function FormInput(props, ref) {
  const {onChange, ...restProps} = props
  const handleChange: Changer = React.useCallback((_, event) => {
    onChange(event)
  }, [onChange])
  return <Input {...restProps} onChange={handleChange} ref={ref} />
});
