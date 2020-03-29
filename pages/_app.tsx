import { Fragment } from 'react';
import Head from 'next/head';
import nextCookie from 'next-cookies';
import jwt from 'jsonwebtoken'

import { NavBar } from '../components/navigation/nav';
import { IUserInToken } from '../domain/user';


const MyApp = (props) => {
  return (
    <Fragment>
      <Head>
        <meta charSet='utf-8' />
        <title>MyApp</title>
        <link
          href='https://fonts.googleapis.com/css?family=Heebo|Alfa+Slab+One&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <NavBar {...props} />

      <div className='container'>
        <props.Component {...props} />
      </div>
    </Fragment>
  )
}

MyApp.getInitialProps = async ({ ctx, Component }) => {
  const { token } = nextCookie(ctx);

  const componentProps =
    Component.getInitialProps && (await Component.getInitialProps(ctx));

  let user: IUserInToken = jwt.decode(token) as IUserInToken;
  if (user && Date.now() / 1000 > user.exp) {
    user = undefined;
  }
  return {
    ...componentProps,
    token,
    user
  };
}

export default MyApp
