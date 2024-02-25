import { useState } from 'react';
import { Logger } from '../helpers/logger';
import { UserSessionTokenType } from './user-session.context';

const COMPONENT_NAME = 'useUserSession' 


function getUserSessionToken(): UserSessionTokenType | undefined {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return undefined;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayloadString = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const jsonPayload = JSON.parse(jsonPayloadString);
    return {
      userId: jsonPayload?.sub,
      username: jsonPayload?.username,
      memberSince: jsonPayload.memberSince,
      iat: jsonPayload.iat,
      exp: jsonPayload.exp,
    };
  } catch (err) {}
}

export default function useUserSession() {
  const logger = new Logger(COMPONENT_NAME)
  const [sessionToken, setSessionToken] = useState(getUserSessionToken());

  const setToken = (accessToken: string) => {
    logger.info('Session Access token is being set');
    sessionStorage.setItem("accessToken", accessToken);
    setSessionToken(getUserSessionToken());
  }

  const killSession = () => {
    logger.warn('Session Access token is being unset');
    sessionStorage.removeItem("accessToken");
    setSessionToken(undefined);
  }

  return {
    token: sessionToken,
    setToken,
    killSession,
  }
}
