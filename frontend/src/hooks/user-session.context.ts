import { createContext } from "react";

export type UserSessionTokenType = {
  userId: string;
  username: string;
  memberSince: string;
  iat: number;
  exp: number;
};

export type UserSessionContextType = {
  token: UserSessionTokenType | undefined;
  setToken: (accessToken: string) => void;
  killSession: () => void;
};

export const UserSessionContext = createContext<
  UserSessionContextType
>({ setToken: () => {}, killSession: () => {}, token: undefined });
