import { IUserOptions } from "./IUserOptions";

export type ISignUpParams =
  Pick<Required<IUserOptions>,
    | 'email'
    | 'username'
    | 'firstname'
    | 'lastname'
    | 'password'>;
