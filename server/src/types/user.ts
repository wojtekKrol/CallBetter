import { Document } from 'mongoose';

export interface UserAuth {
  email: string;
  password: string;
  passwordCheck: string;
}

export interface UserData {
  name: string;
  gender: string;
  birthday: Date;
  about: string;
}

export interface UserProps extends Document {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
  gender: string;
  birthday: Date;
  about: string;
}

export interface UserLoginQuery {
  email: string;
  password: string;
}

export interface UserLoginResponse extends ResponseJson {
  token?: string;
  user?: { id: string; email: string; name: string };
}

export interface ResponseJson {
  msg?: string;
  error?: string;
}
