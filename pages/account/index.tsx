import nextCookie from 'next-cookies';
import { WithTranslation } from 'next-i18next';

import { BASE_URL, redirectsTo, getReqWithToken, handleError } from '../../common/api';
import { IUser } from '../../domain/user';
import { withTranslation } from '../../i18n';

interface IProps extends WithTranslation {
  data: {
    user: IUser;
  };
}

const Account = (props: IProps) => {
  const t = props.t;
  const user = props?.data?.user;
  if (!user) {
    return <div>No Data</div>;
  }

  return (
    <div className='max-w-lg bg-white rounded-lg shadow-md p-6 mt-3 m-auto'>
      <h1 className='text-3xl mb-3'>{t('account')}</h1>
      <a
        href='/account/edit'
        className='inline-block align-baseline font-bold text-lg text-blue-500 hover:text-blue-800'
      >
        {t('edit')}
      </a>
      <div className='mt-3'>
        <p>
          <span className='font-semibold'>{t('userID')}:</span> {user.id}
        </p>
        <p>
          <span className='font-semibold'>{t('firstName')}:</span> {user.first_name}
        </p>
        <p>
          <span className='font-semibold'>{t('lastName')}:</span> {user.last_name}
        </p>
        <p>
          <span className='font-semibold'>{t('email')}:</span> {user.email}
        </p>
        <p>
          <span className='font-semibold'>{t('userType')}:</span>{' '}
          {user.admin ? 'Admin' : 'Standard'}
        </p>
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
    return { data, namespacesRequired: ['account', 'nav'] };
  } catch (error) {
    handleError(error);
    return redirectsTo(ctx, '/');
  }
};

export default withTranslation('account')(Account);
