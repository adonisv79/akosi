import { useTranslation } from "react-i18next";
import { AkosiButton } from "../../_components/akosi/common/akosi-button";
import { HTMLTable } from "../../_components/core/html/html-table/html-table";
import { TableConfig } from "../../_components/core/html/html-table/html-table.types";
import { getUserSession } from "../../helpers/get-user-session";
import { useNavigate } from "react-router-dom";

export const DashboardPage = () => {
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const handleSignOut = async () => {
    // send a delete session request to backend
    sessionStorage.removeItem("accessToken");
    navigateTo('/');
  };

  const session = getUserSession();
  if (!session) return null;
  const minutesRemaining = Math.round(((session.exp * 1000) - Date.now()) / 60000);
  const secondsRemaining = Math.round((session.exp * 1000) - Date.now()) - (minutesRemaining * 60000);
  const config: TableConfig = {
    body: {
      rows: [
        {
          cells: [
            { children: <>Username: </> },
            { children: <>{session.username}</> },
          ],
        },
        {
          cells: [
            { children: <>User Id: </> },
            { children: <>{session.userId}</> },
          ],
        },
        {
          cells: [
            { children: <>Member Since: </> },
            { children: <>{session.memberSince}</> },
          ],
        },
        {
          cells: [
            { children: <>Session Token Issued at: </> },
            { children: <>{new Date(session.iat * 1000).toISOString()}</> },
          ],
        },
        {
          cells: [
            { children: <>Session Token Expires at: </> },
            { children: <>{new Date(session.exp * 1000).toISOString()}</> },
          ],
        },
        {
          cells: [
            { children: <>Current at: </> },
            { children: <>{new Date().toISOString()}</> },
          ],
        },
        {
          cells: [
            { children: <>Session Token Expires in: </> },
            { children: <>{minutesRemaining}:{secondsRemaining}</> },
          ],
        },
      ],
    },
  };
  return (
    <>
      HELLO {session?.username}
      <HTMLTable id="user-information" config={config} data={[]} />
      
      <AkosiButton id="sign-out" onClick={handleSignOut}>
        {t("loginDialog.buttonLogoutText")}
      </AkosiButton>
    </>
  );
};
