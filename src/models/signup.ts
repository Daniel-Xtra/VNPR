/* eslint-disable @typescript-eslint/naming-convention */
import { User } from './user';

export interface Signup {
  user: User;
  token: string;
  refreshToken: string;
}

export interface SignupModel {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  gender: string;

  phone_number: string;
}

export interface adminSignupModel {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  gender: string;
  password: string;
  phone_number: string;
}
