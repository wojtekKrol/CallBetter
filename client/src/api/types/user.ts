export interface UserProps {
  readonly id?: string;
  email?: string;
  password?: string;
  passwordCheck?: string;
  name?: string;
  gender?: string;
  birthday?: Date;
  about?: string;
}

export interface State {
  token?: string;
  userData?: UserProps;
  logged?: boolean;
}
