export interface IAxiosError {
  response: {
    data: {
      error: IApiError;
    };
  };
}

export interface IApiError {
  name: string;
  code: number;
  message: string;
}

export interface IApiData {
  data: any;
}
