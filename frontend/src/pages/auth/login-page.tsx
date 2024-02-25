import { useTranslation } from "react-i18next";
import { HTMLSection } from "../../_components/core/html/html-section";
import { useSignInAccountMutation } from "../../api/queries/auth-query";
import { AkosiButton } from "../../_components/akosi/common/akosi-button";
import { AkosiLanguagePicker } from "../../_components/akosi/common/akosi-lang-picker";
import { ALVTypography } from "../../_components/core/alv/alv-typography";
import { HTMLForm } from "../../_components/core/html/html-form";
import { HTMLLabel } from "../../_components/core/html/html-label";
import { HTMLLink } from "../../_components/core/html/html-link";
import { AkosiTextBoxPassword } from "../../_components/akosi/common/akosi-textbox-password";
import { AkosiTextBoxUsername } from "../../_components/akosi/common/akosi-textbox-username";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Logger } from "../../helpers/logger";
import { UserSessionContext } from "../../hooks/user-session.context";

const COMPONENT_NAME = "LoginPage";

export const LoginPage = () => {
  const logger = new Logger(COMPONENT_NAME);
  logger.info(`Mounting ${COMPONENT_NAME}`);
  const session = useContext(UserSessionContext);

  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const signIn = useSignInAccountMutation();

  useEffect(() => {
    if (session.token) {
      logger.info(`Session exists, redirecting to home screen`);
      navigateTo("/dash");
    }
  }, [session.token]);

  const handleSubmit = async (formData: Record<string, string>) => {
    if (!session) return;
    try {
      const result = await signIn.mutateAsync({
        username: formData["username"],
        password: formData["password"],
      });
      session.setToken(result.accessToken);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <HTMLSection
      id="akosi-login-container"
      className="min-w-96 bg-white text-black p-8 rounded-md shadow-md"
    >
      <div className="text-right mb-5">
        <AkosiLanguagePicker className="text-black bg-white" />
      </div>
      <ALVTypography type="h4" className="mb-4">
        {t("loginDialog.dialogHeaderText")}
      </ALVTypography>
      <HTMLForm id="login-form" className="min-w-full" onSubmit={handleSubmit}>
        <div className="mb-4">
          <ALVTypography weight="semibold" size="sm" theme="light" type="p">
            <HTMLLabel targetElementId="login-username">
              {t("loginDialog.usernameHeaderText")}
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBoxUsername
            texts={{
              placeholder: t("loginDialog.usernamePlaceholderText"),
              title: t("loginDialog.usernameTooltipText"),
            }}
          />
        </div>
        <div>
          <ALVTypography weight="semibold" size="sm" theme="light" type="p">
            <HTMLLabel targetElementId="login-password">
              {t("loginDialog.passwordHeaderText")}
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBoxPassword
            texts={{
              btnShowPassword: { title: t("common.password.showPassword") },
              placeholder: t("common.password.passwordPlaceholderText"),
              title: t("common.password.passwordTitleText"),
            }}
          />
        </div>
        <ALVTypography
          italic
          size="sm"
          theme="light"
          className="py-2 text-right mb-2"
          type="p"
        >
          <HTMLLink
            targetUrl={"/"}
            className="text-blue-400 hover:text-blue-600"
          >
            {t("loginDialog.passwordForgotLink")}
          </HTMLLink>
        </ALVTypography>
        <AkosiButton
          type="submit"
          id="login-button"
          theme="primary"
          borderRounding="full"
          className="mb-4 px-4 py-2 w-full"
        >
          {t("loginDialog.buttonLoginText")}
        </AkosiButton>
        <div className="w-full text-center">
          <ALVTypography italic size="sm" theme="light" className="pt-5">
            {t("loginDialog.notAMemberText")}
            <HTMLLink
              targetUrl={"/auth/register"}
              className="text-blue-400 hover:text-blue-600"
            >
              {` ${t("loginDialog.registerHereText")}`}
            </HTMLLink>
          </ALVTypography>
        </div>
      </HTMLForm>
    </HTMLSection>
  );
};
