import { useContext, useMemo } from "react"
import { UserSessionContext } from "../../hooks/user-session.context"
import axios from "axios";

export const useAPI = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const session = useContext(UserSessionContext);
  let preferedLanguageCode = localStorage.getItem("lang");
  if (preferedLanguageCode !== "en") preferedLanguageCode += ", en";

  const api = useMemo(() => {
    return axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        Authorization: session ? `Bearer ${sessionStorage.getItem("accessToken")}` : undefined,
        "Accept-Language": preferedLanguageCode,
        // Add other headers if needed
      },
    });
  }, [session.token]);

  return api;
}