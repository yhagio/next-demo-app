export interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  admin: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserSignup extends IUserLogin {
  first_name: string;
  last_name: string;
}

export interface IUserInToken {
  id: string;
  first_name: string;
  email: string;
  admin: boolean;
  exp: number;
  iat: number;
}