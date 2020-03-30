import Head from 'next/head';
import nextCookie from 'next-cookies';
import jwt from 'jsonwebtoken';
import NavBar from '../components/navigation/nav';
import { IUserInToken } from '../domain/user';

import './styles.css';
import { defaultLocale } from '../translations/config';

const MyApp = props => {
  return (
    <>
      <Head>
        <title>MyApp</title>
      </Head>
      <NavBar {...props} />
      <props.Component {...props} />
    </>
  );
};

MyApp.getInitialProps = async ({ ctx, Component }) => {
  const { token, myAppLocale } = nextCookie(ctx);
  const componentProps =
    Component.getInitialProps && (await Component.getInitialProps(ctx));

  let user: IUserInToken = jwt.decode(token) as IUserInToken;
  if (user && Date.now() / 1000 > user.exp) {
    user = undefined;
  }

  return {
    ...componentProps,
    token,
    user,
    locale: myAppLocale || defaultLocale
  };
};

export default MyApp;
