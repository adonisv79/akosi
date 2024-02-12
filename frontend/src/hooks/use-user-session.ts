import { useState } from 'react';

function getUserSession() {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return null;
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
  const [value] = useState(getUserSession());

  return value;
}
