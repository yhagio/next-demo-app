import { Fragment } from 'react';

export interface IFormInpuArgs {
  label: string;
  name: string;
  value: string | number;
  inputType: string;
  placeholder: string;
  onChange: any;
}

export const FormInput = ({
  label,
  name,
  value,
  inputType,
  placeholder,
  onChange
}: IFormInpuArgs) => (
  <Fragment>
    <label className='block text-gray-700 text-sm font-semibold mt-3' htmlFor={name}>
      {label}
    </label>
    <input
      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      type={inputType}
      name={name}
      id={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  </Fragment>
);
