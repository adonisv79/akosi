import { useTranslation } from "react-i18next";
import { AkosiButton } from "../../_components/akosi/common/akosi-button";
import { AkosiLanguagePicker } from "../../_components/akosi/common/akosi-lang-picker";
import { ALVTypography } from "../../_components/core/alv/alv-typography";
import { HTMLForm } from "../../_components/core/html/html-form";
import { HTMLLabel } from "../../_components/core/html/html-label";
import { HTMLLink } from "../../_components/core/html/html-link";
import { HTMLSection } from "../../_components/core/html/html-section";
import { AkosiTextBoxPassword } from "../../_components/akosi/common/akosi-textbox-password";
import { AkosiTextBoxPasswordConfirm } from "../../_components/akosi/common/akosi-textbox-password-confirm";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AkosiTextBoxUsername } from "../../_components/akosi/common/akosi-textbox-username";
import { useCreateAccountMutation } from "../../api/queries/auth-query";
import { useNavigate } from "react-router-dom";
import { Logger } from "../../helpers/logger";
import { UserSessionContext } from "../../hooks/user-session.context";

const COMPONENT_NAME = "RegistrationPage";

export const RegistrationPage = () => {
  const logger = new Logger(COMPONENT_NAME);
  logger.info(`Mounting ${COMPONENT_NAME}`);
  const session = useContext(UserSessionContext);

  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const {
    mutate: createUser,
    data,
    isError,
    error: createAccountErrror,
  } = useCreateAccountMutation();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (session.token) {
      logger.info(`Session exists, redirecting to home screen`);
      navigateTo("/dash");
    }
  }, [session.token]);

  useEffect(() => {
    if (data) {
      session.setToken(data.accessToken);
    }
  }, [data]);

  const handleNewUsernameChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.currentTarget.value);
  };

  const handleNewPasswordChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.currentTarget.value);
  };

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      if (formData["password"] !== formData["password-confirm"])
        throw new Error('Passwords do not match')
      createUser({
        username: formData["username"],
        password: formData["password"],
      });
    } catch (err) {
      if (err instanceof Error) logger.error(err.message, err);
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
        {t("registrationDialog.dialogHeaderText")}
      </ALVTypography>
      {isError && (
        <ALVTypography
          id="registration-error"
          type="span"
          size="xs"
          className="mb-4 text-red-500"
        >
          {createAccountErrror.response?.status === 409
            ? t(`registrationDialog.apiErrors.response409`, {
                preferredUsername: newUsername,
              })
            : t(`registrationDialog.apiErrors.response500`)}
        </ALVTypography>
      )}
      <HTMLForm id="login-form" className="min-w-90" onSubmit={handleSubmit}>
        <div className="my-2">
          <ALVTypography weight="semibold" size="sm" theme="light" type="p">
            <HTMLLabel targetElementId="login-username">
              {t("registrationDialog.usernameHeaderText")}
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBoxUsername
            texts={{
              placeholder: t("registrationDialog.usernamePlaceholderText"),
              title: t("registrationDialog.usernameTooltipText"),
            }}
            onChange={handleNewUsernameChanged}
            value={newUsername}
          />
        </div>
        <div className="my-2">
          <ALVTypography weight="semibold" size="sm" theme="light" type="p">
            <HTMLLabel targetElementId="login-password">
              {t("registrationDialog.passwordHeaderText")}
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBoxPassword
            texts={{
              btnShowPassword: { title: t("common.password.showPassword") },
              placeholder: t("common.password.passwordPlaceholderText"),
              title: t("common.password.passwordTitleText"),
            }}
            value={newPassword}
            onChange={handleNewPasswordChanged}
          />
        </div>
        <div className="my-2">
          <ALVTypography weight="semibold" size="sm" theme="light" type="p">
            <HTMLLabel targetElementId="login-password-confirm">
              {t("registrationDialog.passwordConfirmHeaderText")}
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBoxPasswordConfirm
            currentPassword={newPassword}
            texts={{
              placeholder: t(`common.password.passwordConfirmPlaceholderText`),
              title: t(`common.password.passwordConfirmTitleText`),
              isEmpty: t(`common.password.confirmIsEmpty`),
              isMatching: t(`common.password.confirmIsMatch`),
              isNotMatching: t(`common.password.confirmIsNotMatch`),
            }}
          />
        </div>
        <AkosiButton
          type="submit"
          id="register-button"
          theme="primary"
          borderRounding="full"
          className="m-2 px-4 py-2 w-full"
        >
          {t("registrationDialog.buttonRegisterText")}
        </AkosiButton>
        <div className="w-full text-center">
          <ALVTypography italic size="sm" theme="light" className="pt-5">
            {t("registrationDialog.alreadyAMemberText")}
            <HTMLLink
              targetUrl={"/auth"}
              className="text-blue-400 hover:text-blue-600"
            >
              {` ${t("registrationDialog.loginHereText")}`}
            </HTMLLink>
          </ALVTypography>
        </div>
      </HTMLForm>
    </HTMLSection>
  );
};
