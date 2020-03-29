import React, { useState } from 'react';
import Link from 'next/link';

import { login } from '../common/auth';
import { postReq, BASE_URL, handleError } from '../common/api';
import { FormInput } from '../components/form/form-input';

const initialState = {
  email: '',
  password: '',
  error: ''
}

const Login = () => {
  const [userData, setUserData] = useState(initialState);

  async function handleSubmit(event) {
    event.preventDefault();
    setUserData(Object.assign({}, userData, { error: '' }));

    const email = userData.email;
    const password = userData.password;

    const url = `${BASE_URL}/auth/login`;

    try {
      const result = await postReq(url, { email, password });
      await login({ token: result.data.token });
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
    <div className='section max800'>
      <form onSubmit={handleSubmit}>
        <div className='field'>
          <h2 className='is-size-2'>Login</h2>
        </div>

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

        <button type='submit' className='button is-link'>
          Login
        </button>

        {userData.error && <p className='error'>Error: {userData.error}</p>}
      </form>

      <Link href='/forgot_password'>
        <a>Forgot password</a>
      </Link>
    </div>
  );
};

export default Login;
