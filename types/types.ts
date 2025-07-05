enum IRole {
  User,
  Admin,
}
export interface IUser {
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
