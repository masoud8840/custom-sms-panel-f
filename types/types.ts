enum IRole {
  User,
  Admin,
}
export interface IUser {
  _id: string;
  fullname: string;
  username: string;
  password: string;
  role: IRole;
}

export interface IUserWithToken extends IUser {
  token: string;
}
export interface IRequest<T> {
  message: {
    title: string;
    message: string;
  };
  data: T;
}

export interface ICode {
  _id: string;
  code: string;
  name: string;
  response: string;
}

export interface IMember {
  _id: string;
  fname: string;
  lname: string;
  personalCode: string;
  nationalityCode: string;
  cellphone: string;
  birthdate: number;
  gender: number;
  relationship: number;
  city: string;
  state: string;
}
export interface IMessage {
  _id: string;
  to: string;
  from: string;
  text: string;
  from_id: IMember;
  createdAt: string;
}
