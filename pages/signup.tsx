import React, { useState } from 'react';
import Link from 'next/link';

import { login } from '../common/auth';
import { postReq, BASE_URL, handleError } from '../common/api';
import { FormInput } from '../components/form/form-input';

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  error: ''
};

const SignUp = () => {
  const [userData, setUserData] = useState(initialState);

  async function handleSubmit(event) {
    event.preventDefault();
    setUserData(Object.assign({}, userData, { error: '' }));

    const first_name = userData.first_name;
    const last_name = userData.last_name;
    const email = userData.email;
    const password = userData.password;

    const url = `${BASE_URL}/auth/signup`;

    try {
      const { data } = await postReq(url, { first_name, last_name, email, password });
      await login({ token: data.token });
    } catch (error) {
      const err = handleError(error);
      setUserData(
        Object.assign({}, userData, {
          error: err.message
        })
      );
    }
  }

  return (
    <div className='w-full sm:max-w-xs m-auto'>
      <form onSubmit={handleSubmit} className="sm:w-full sm:mt-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className='mb-5'>
          <h2 className='text-2xl font-semibold'>Signup</h2>
        </div>

        <FormInput
          label='*First Name'
          name='first_name'
          inputType='text'
          placeholder='First Name'
          value={userData.first_name}
          onChange={event =>
            setUserData(Object.assign({}, userData, { first_name: event.target.value }))
          }
        />

        <FormInput
          label='*Last Name'
          name='last_name'
          inputType='text'
          placeholder='Last Name'
          value={userData.last_name}
          onChange={event =>
            setUserData(Object.assign({}, userData, { last_name: event.target.value }))
          }
        />

        <FormInput
          label='*Email'
          name='email'
          inputType='email'
          placeholder='Your email'
          value={userData.email}
          onChange={event =>
            setUserData(Object.assign({}, userData, { email: event.target.value }))
          }
        />

        <FormInput
          label='*Password'
          name='password'
          inputType='password'
          placeholder='Your password'
          value={userData.password}
          onChange={event =>
            setUserData(Object.assign({}, userData, { password: event.target.value }))
          }
        />

        <div className="flex items-center justify-between">
          <button
            type='submit'
            className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Signup
          </button>

          <Link href='/login'>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Login</a>
          </Link>
        </div>

        {userData.error && <p className='mt-3 text-red-500 text-sm italic"'>Error: {userData.error}</p>}
      </form>

    </div>
  );
};

export default SignUp;
