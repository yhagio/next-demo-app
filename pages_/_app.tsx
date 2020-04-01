import Head from 'next/head';
// import App from 'next/app';
import nextCookie from 'next-cookies';
import jwt from 'jsonwebtoken';
import appWithI18n from 'next-translate/appWithI18n'
import i18nConfig from '../i18n.json'
import NavBar from '../components/navigation/nav';
import { IUserInToken } from '../domain/user';

import './styles.css';

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

MyApp.getInitialProps = async appContext => {
  const { ctx, Component } = appContext;
  const { token } = nextCookie(ctx);

  // const appProps = await App.getInitialProps(appContext);

  const componentProps =
    Component.getInitialProps && (await Component.getInitialProps(ctx));

  let user: IUserInToken = jwt.decode(token) as IUserInToken;
  if (user && Date.now() / 1000 > user.exp) {
    user = undefined;
  }
  return {
    // ...appProps,
    ...componentProps,
    token,
    user
  };
};

export default appWithI18n(MyApp, i18nConfig);
