import { useState } from 'react'
import Router from 'next/router';
import nextCookie from 'next-cookies';

import { BASE_URL, redirectsTo, getReqWithToken, putReqWithToken, handleError } from '../../common/api';
import { IUser } from '../../domain/user';
import { FormInput } from '../../components/form/form-input';

interface IProps {
  data: {
    user: IUser
  };
  token: string;
}

const Account = (props: IProps) => {
  const user = props?.data?.user;
  if (!user) {
    return <div>No Data</div>
  }

  const [userData, setUserData] = useState(
    {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      error: ''
    }
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setUserData(Object.assign({}, userData, { error: '' }));

    const { error, ...rest } = userData

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
    <div>
      <h1>Edit Account</h1>
      <p>User ID: {user.id}</p>
      <p>Type: {user.admin ? 'Admin' : 'Standard'}</p>

      <form onSubmit={handleSubmit}>
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

        <button type='submit' className='button is-link'>
          Update
        </button>

        {userData.error && <p className='error'>Error: {userData.error}</p>}
      </form>
    </div>
  )
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
