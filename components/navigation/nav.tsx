import React from 'react';
import Link from 'next/link';

import { IUserInToken } from '../../domain/user';
import { logout } from '../../common/auth';

interface IProps {
  user: IUserInToken
}

export const NavBar = (props: IProps) => {
  const { user } = props;

  async function handleLogout(event) {
    event.preventDefault();
    await logout();
  }

  return (
    <nav className='navbar is-dark fixed-top mynav'>
      <div className='navbar-brand'>
        <Link href='/'>
          <h2 className='is-size-2'>MyApp</h2>
        </Link>
        <div
          className='navbar-burger burger'
          data-target='navbarExampleTransparentExample'
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id='navbarExampleTransparentExample' className='navbar-menu'>
        <div className='navbar-end'>
          {user && (
            <React.Fragment>
              <a className='navbar-item' href='/account'>
                Account
              </a>
              <a className='navbar-item' href='/logout' onClick={handleLogout}>
                Logout
              </a>
            </React.Fragment>
          )}

          {!user && (
            <React.Fragment>
              <a className='navbar-item' href='/login'>
                Login
              </a>
              <a className='navbar-item' href='/signup'>
                Signup
              </a>
            </React.Fragment>
          )}

          <a className='navbar-item' href='/about'>
            About
          </a>
        </div>
      </div>
    </nav>
  )
}