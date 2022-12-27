import { IUserOptions } from "./IUserOptions";

export interface IAuthResponse {
  token: string;
  user?: Partial<IUserOptions>
}