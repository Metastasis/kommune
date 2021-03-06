import { UseFormRegister } from 'react-hook-form';

interface Props {
  label: string,
  register: UseFormRegister<{[key: string]: unknown}>,
  required: boolean
}

const Location = ({ label, register, required }: Props) => {
  return (
    <div>
      <label>{label}</label>
      <input {...register(label, { required })} />
    </div>
  )
};

export default Location;
