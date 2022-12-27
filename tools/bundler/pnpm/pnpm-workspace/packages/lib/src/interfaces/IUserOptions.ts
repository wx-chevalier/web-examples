import { IBaseOptions } from "./IBaseOptions";

export interface IUserOptions extends IBaseOptions {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password?: string;
}