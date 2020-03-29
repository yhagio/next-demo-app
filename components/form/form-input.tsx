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
    <div className='field'>
      <label className='label'>{label}</label>
      <div className='control'>
        <input
          className='input'
          type={inputType}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
