import axios from 'axios';
import Router from 'next/router';
import { IAxiosError, IApiError, IApiData } from '../domain/apiResponse';

export const BASE_URL = 'https://fastify-rest-graphql-api.herokuapp.com/api';
// export const BASE_URL = "https://go-gin-postgres-api.herokuapp.com/api"
// export const BASE_URL = "http://localhost:3001/api"

export const redirectsTo = (ctx: any, redirectPath: string) => {
  typeof window !== 'undefined'
    ? Router.push('/')
    : ctx.res.writeHead(302, { Location: redirectPath }).end();
};

export const handleError = (error: IAxiosError): IApiError => {
  const errObj: IApiError = error?.response?.data?.error;
  console.error(`${errObj.name} error; statusCode ${errObj.code}; ${errObj.message}.`);
  return errObj;
};

export const postReq = async (url: string, body: any): Promise<IApiData> => {
  const { data } = await axios.post(url, body);
  return data;
};

export const getReq = async (url: string, params?: any): Promise<IApiData> => {
  const { data } = await axios.get(url, params);
  return data;
};

export const getReqWithToken = async (url: string, token: string): Promise<IApiData> => {
  const { data } = await axios.get(url, {
    withCredentials: true,
    headers: {
      Authorization: token
    }
  });
  return data;
};

export const putReqWithToken = async (
  url: string,
  token: string,
  body: any
): Promise<IApiData> => {
  const { data } = await axios.put(url, body, {
    withCredentials: true,
    headers: {
      Authorization: token
    }
  });
  return data;
};
