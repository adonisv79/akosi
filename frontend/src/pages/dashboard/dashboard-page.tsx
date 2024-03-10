import { useTranslation } from "react-i18next";
import { AkosiButton } from "../../_components/akosi/common/akosi-button";
import { HTMLTable } from "../../_components/core/html/html-table/html-table";
import { TableConfig } from "../../_components/core/html/html-table/html-table.types";
import { useNavigate } from "react-router-dom";
import { AkosiLanguagePicker } from "../../_components/akosi/common/akosi-lang-picker";
import { ALVTypography } from "../../_components/core/alv/alv-typography";
import { UserHistoriesTable } from "./user-histories-table";
import { Logger } from "../../helpers/logger";
import { ChangeEvent, useContext, useState } from "react";
import { UserSessionContext } from "../../hooks/user-session.context";
import { useDeleteAccountMutation } from "../../api/queries/auth-query";
import { AkosiTextBoxPassword } from "../../_components/akosi/common/akosi-textbox-password";
import { UserProfilesList } from "../user/user-profile/user-profiles-list";
import { HTMLLink } from "../../_components/core/html/html-link";

const COMPONENT_NAME = 'MainDashboard'

export const DashboardPage = () => {
  const logger = new Logger(COMPONENT_NAME);
  logger.info(`Mounting ${COMPONENT_NAME}`);
  const session = useContext(UserSessionContext);
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const accountDelete = useDeleteAccountMutation();
  const [password, setPassword] = useState('');

  const handleSignOut = async () => {
    if (!session) return;
    // todo: send a delete session request to backend
    session.killSession();
  };

  const handlePassChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }

  const handleDelete = async () => {
    await accountDelete.mutateAsync({ password });
    await handleSignOut();
  }

  if (!session.token) return null;

  const minutesRemaining = Math.round(
    (session.token.exp * 1000 - Date.now()) / 60000
  );
  const secondsRemaining =
    Math.round(session.token.exp * 1000 - Date.now()) - minutesRemaining * 60000;
  const config: TableConfig = {
    header: {
      className: "border",
      rows: [{ cells: [{ children: <>field</> }, { children: <>value</> }] }],
    },
    body: {
      className: "border",
      rows: [
        {
          cells: [
            { children: <>Username: </> },
            { children: <>{session.token.username}</> },
          ],
        },
        {
          cells: [
            { children: <>User Id: </> },
            { children: <>{session.token.userId}</> },
          ],
        },
        {
          cells: [
            { children: <>Member Since: </> },
            { children: <>{session.token.memberSince}</> },
          ],
        },
        {
          cells: [
            { children: <>Session Token Issued at: </> },
            { children: <>{new Date(session.token.iat * 1000).toISOString()}</> },
          ],
        },
        {
          cells: [
            { children: <>Session Token Expires at: </> },
            { children: <>{new Date(session.token.exp * 1000).toISOString()}</> },
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
            {
              children: (
                <>
                  {minutesRemaining}:{secondsRemaining}
                </>
              ),
            },
          ],
        },
      ],
    },
  };

  return (
    <>
      <AkosiLanguagePicker
        className="text-white bg-inherit"
        classNameOption="bg-red-500"
      />
      <div>
        <ALVTypography type="h3" className="py-4">
          {" "}
          HELLO {session.token.username}
        </ALVTypography>

        <HTMLLink targetUrl="/profiles" title={t(`profiles.link.title`)}>{t(`profiles.link.text`)}</HTMLLink>

        <HTMLTable
          id="user-information"
          config={config}
          className="bg-gray-800"
          classNameCells="border px-2"
        />
        <div className="p-4 flex gap-5">
          <AkosiButton id="sign-out" onClick={handleSignOut}>
            {t("authentication.loginDialog.buttonLogoutText")}
          </AkosiButton>
          <AkosiButton id="home-button" onClick={() => navigateTo("/")}>
            🏠
          </AkosiButton>
        </div>
        <UserHistoriesTable />
      </div>
      <div>
        <AkosiTextBoxPassword onChange={handlePassChanged} value={password} texts={{title: 'ENter password', btnShowPassword: { title: 'sad'}, placeholder: 'ss'}} />
      <AkosiButton id="delete-user" onClick={handleDelete}>
            Delete
          </AkosiButton>
      </div>
    </>
  );
};
