import Link from 'next/link';

import { IUserInToken } from '../../domain/user';
import { logout } from '../../common/auth';
import { FC } from 'react';
import withTranslations from '../../hocs/withTranslations';
import useTranslation from '../../hooks/useTranslations';

interface IProps {
  user: IUserInToken;
}

const NavBar: FC<IProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation()

  async function handleLogout(event) {
    event.preventDefault();
    await logout();
  }

  return (
    <header className='bg-purple-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3'>
      <div className='flex items-center justify-between px-4 py-3 sm:p-0'>
        <Link href='/'>
          <h2 className='text-lg font-semibold text-white cursor-pointer'>{t('myapp')}</h2>
        </Link>
        <div className='sm:hidden'>
          <button
            type='button'
            className='block text-gray-500 hover:text-white focus:text-white focus:outline-none'
          >
            Menu
          </button>
        </div>
      </div>

      <nav className='block px-2 pt-2 pb-4 sm:flex sm:p-0'>
        {user && (
          <>
            <a
              className='mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-'
              href='/account'
            >
              {t('account')}
            </a>
            <a
              className='mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-'
              href='/logout'
              onClick={handleLogout}
            >
              {t('logout')}
            </a>
          </>
        )}

        {!user && (
          <>
            <a
              className='mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-'
              href='/login'
            >
              {t('login')}
            </a>
            <a
              className='mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-'
              href='/signup'
            >
              {t('signup')}
            </a>
          </>
        )}

        <a
          className='mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-'
          href='/about'
        >
          {t('about')}
        </a>
      </nav>
    </header>
  );
};

export default withTranslations('nav')(NavBar);