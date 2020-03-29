import { useState } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';

import {
  BASE_URL,
  redirectsTo,
  getReqWithToken,
  putReqWithToken,
  handleError
} from '../../common/api';
import { IUser } from '../../domain/user';
import { FormInput } from '../../components/form/form-input';

interface IProps {
  data: {
    user: IUser;
  };
  token: string;
}

const Account = (props: IProps) => {
  const user = props?.data?.user;
  if (!user) {
    return <div>No Data</div>;
  }

  const [userData, setUserData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    error: ''
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setUserData(Object.assign({}, userData, { error: '' }));

    const { error, ...rest } = userData;

    const url = `${BASE_URL}/account`;

    try {
      await putReqWithToken(url, props.token, rest);
      Router.push('/account');
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
      <form
        onSubmit={handleSubmit}
        className='sm:w-full sm:mt-2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
      >
        <div className='mb-5'>
          <h2 className='text-2xl font-semibold'>Edit Account</h2>
        </div>

        <p>
          <span className='font-semibold'>User ID:</span> {user.id}
        </p>
        <p>
          <span className='font-semibold'>Type:</span> {user.admin ? 'Admin' : 'Standard'}
        </p>

        <div className='mb-5'></div>

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

        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className='mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Update
          </button>
        </div>

        {userData.error && (
          <p className='mt-3 text-red-500 text-sm italic"'>Error: {userData.error}</p>
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
    return { data, token };
  } catch (error) {
    handleError(error);
    return redirectsTo(ctx, '/');
  }
};

export default Account;
