import { IUserOptions } from "../interfaces";

export const getFullName = (user: Partial<IUserOptions>) => `${user.firstname}${user.lastname ? ` ${user.lastname}` : ''}`;

export const getProfileStr = (user: Partial<IUserOptions>) => {
  return `Hello ${getFullName(user)}\n${user.username ? `${user.username} - ` : ''}${user.email}`;
}

export const getFullProfileStr = (user: IUserOptions) => {
  return `User: [${user.id}] ${user.username} - ${user.email}
Personal Data: ${user.firstname} ${user.lastname}
Created: ${user.createdAt.toLocaleDateString()}
Updated: ${user.updatedAt.toLocaleDateString()}`;
}