import { useState } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import { WithTranslation } from 'next-i18next';

import {
  BASE_URL,
  redirectsTo,
  getReqWithToken,
  putReqWithToken,
  handleError
} from '../../common/api';
import { IUser } from '../../domain/user';
import { FormInput } from '../../components/form/form-input';
import { withTranslation } from '../../i18n';

interface IProps extends WithTranslation {
  data: {
    user: IUser;
  };
  token: string;
}

const Account = (props: IProps) => {
  const t = props.t;
  const user = props?.data?.user;
  if (!user) {
    return <div>No Data</div>;
  }

  const [userData, setUserData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    error: '',
    loading: false
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setUserData(Object.assign({}, userData, { error: '', loading: true }));

    const { error, loading, ...rest } = userData;

    const url = `${BASE_URL}/account`;

    try {
      await putReqWithToken(url, props.token, rest);
      Router.push('/account');
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
          <h2 className='text-2xl font-semibold'>
            {t('edit')} {t('account')}
          </h2>
        </div>

        <p>
          <span className='font-semibold'>{t('userID')}:</span> {user.id}
        </p>
        <p>
          <span className='font-semibold'>{t('userType')}:</span>{' '}
          {user.admin ? t('admin') : t('standard')}
        </p>

        <div className='mb-5'></div>

        <FormInput
          label={`*${t('firstName')}`}
          name='first_name'
          inputType='text'
          placeholder={t('firstName')}
          value={userData.first_name}
          onChange={event =>
            setUserData(Object.assign({}, userData, { first_name: event.target.value }))
          }
        />

        <FormInput
          label={`*${t('lastName')}`}
          name='last_name'
          inputType='text'
          placeholder={t('lastName')}
          value={userData.last_name}
          onChange={event =>
            setUserData(Object.assign({}, userData, { last_name: event.target.value }))
          }
        />

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
        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className={`mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              userData.loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {userData.loading && <div className='loading'></div>}
            {t('update')}
          </button>
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

Account.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);
  const apiUrl = `${BASE_URL}/account`;

  try {
    const { data } = await getReqWithToken(apiUrl, token);
    if (!data) {
      return redirectsTo(ctx, '/');
    }
    return { data, token, namespacesRequired: ['account', 'nav'] };
  } catch (error) {
    handleError(error);
    return redirectsTo(ctx, '/');
  }
};

export default withTranslation('account')(Account);
