import Link from 'next/link';
import nextCookie from 'next-cookies';

import { BASE_URL, redirectsTo, getReqWithToken, handleError } from '../../common/api';
import { IUser } from '../../domain/user';

interface IProps {
  data: {
    user: IUser;
  };
}

const Account = (props: IProps) => {
  const user = props?.data?.user;
  if (!user) {
    return <div>No Data</div>;
  }

  return (
    <div className="max-w-lg bg-white rounded-lg shadow-md p-6 mt-3 m-auto">
      <h1 className="text-3xl mb-3">Account</h1>
      <a href='/account/edit' className="inline-block align-baseline font-bold text-lg text-blue-500 hover:text-blue-800">Edit</a>
      <div className="mt-3">
        <p><span className="font-semibold">User ID:</span> {user.id}</p>
        <p><span className="font-semibold">First Name:</span> {user.first_name}</p>
        <p><span className="font-semibold">Last Name:</span> {user.last_name}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Type:</span> {user.admin ? 'Admin' : 'Standard'}</p>
      </div>
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
    return { data };
  } catch (error) {
    handleError(error);
    return redirectsTo(ctx, '/');
  }
};

export default Account;
