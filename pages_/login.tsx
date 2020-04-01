import React, { useState } from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation'

import { login } from '../common/auth';
import { postReq, BASE_URL, handleError } from '../common/api';
import { FormInput } from '../components/form/form-input';

const initialState = {
  email: '',
  password: '',
  error: '',
  loading: false
};

const Login = () => {
  const { t } = useTranslation()
  const [userData, setUserData] = useState(initialState);

  async function handleSubmit(event) {
    event.preventDefault();
    setUserData(Object.assign({}, userData, { error: '', loading: true }));

    const email = userData.email;
    const password = userData.password;

    const url = `${BASE_URL}/auth/login`;

    try {
      const { data } = await postReq(url, { email, password });
      await login({ token: data.token });
    } catch (error) {
      const err = handleError(error);
      setUserData(
        Object.assign({}, userData, {
          error: err.message,
          loading: false
        })
      );
    }
  }

  return (
    <div className='w-full sm:max-w-xs m-auto'>
      <form
        onSubmit={handleSubmit}
        className='sm:w-full sm:mt-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
      >
        <div className='mb-5'>
          <h2 className='text-2xl font-semibold'>{t('login')}</h2>
        </div>

        <FormInput
          label={`*${t('email')}`}
          name='email'
          inputType='email'
          placeholder={t('email')}
          value={userData.email}
          onChange={event =>
            setUserData(Object.assign({}, userData, { email: event.target.value }))
          }
        />

        <FormInput
          label={`*${t('password')}`}
          name='password'
          inputType='password'
          placeholder={t('password')}
          value={userData.password}
          onChange={event =>
            setUserData(Object.assign({}, userData, { password: event.target.value }))
          }
        />

        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className={`mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              userData.loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {userData.loading && <div className='loading'></div>}
            <span>{t('login')}</span>
          </button>

          <Link href='/signup'>
            <a className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'>
              {t('signup')}
            </a>
          </Link>
        </div>

        {userData.error && (
          <p className='mt-3 text-red-500 text-sm italic"'>
            {t('error')}: {userData.error}
          </p>
        )}
      </form>
    </div>
  );
};

export default (Login);
