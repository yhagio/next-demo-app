import Link from 'next/link';
import nextCookie from 'next-cookies';

import { BASE_URL, redirectsTo, getReqWithToken, handleError } from '../../common/api';
import { IUser } from '../../domain/user';

interface IProps {
  data: {
    user: IUser
  }
}

const Account = (props: IProps) => {
  const user = props?.data?.user;
  if (!user) {
    return <div>No Data</div>
  }

  return (
    <div>
      <h1>Account</h1>
      <Link href='/account/edit'>Edit</Link>
      <p>{user.id}</p>
      <p>{user.first_name}</p>
      <p>{user.last_name}</p>
      <p>{user.email}</p>
      <p>{user.admin ? 'Admin' : 'Standard'}</p>
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
    return { data };
  } catch (error) {
    handleError(error);
    return redirectsTo(ctx, '/');
  }
};

export default Account;
