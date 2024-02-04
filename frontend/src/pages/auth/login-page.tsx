import { useTranslation } from "react-i18next";
import { HTMLSection } from "../../_components/core/html/html-section";
import { useState } from "react";
import { useSignInAccountMutation } from "../../api/queries/auth-query";
import { AkosiButton } from "../../_components/akosi/common/akosi-button";
import { AkosiLanguagePicker } from "../../_components/akosi/common/akosi-lang-picker";
import { ALVTypography } from "../../_components/core/alv/alv-typography";
import { HTMLForm } from "../../_components/core/html/html-form";
import { HTMLLabel } from "../../_components/core/html/html-label";
import { AkosiTextBox } from "../../_components/akosi/common/akosi-textbox";
import { HTMLLink } from "../../_components/core/html/html-link";
import { ALVModal } from "../../_components/core/alv/alv-modal";

function hasSessionToken() {
  let token = sessionStorage.getItem("accessToken");
  return !!token;
}

export const LoginPage = () => {
  const { t } = useTranslation();
  const [isSignedIn, setIsSignedIn] = useState(hasSessionToken());
  const signIn = useSignInAccountMutation();
  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      //assume validation passed
      const result = await signIn.mutateAsync({
        username: formData["username"],
        password: formData["password"],
      });
      console.log(result.accessToken);
      sessionStorage.setItem("accessToken", result.accessToken);
      setIsSignedIn(true);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleSignOut = async () => {
    // send a delete session request to backend
    sessionStorage.removeItem("accessToken");
    setIsSignedIn(false);
  };

  if (isSignedIn)
    return (
      <AkosiButton id="sign-out" onClick={handleSignOut}>
        {t("loginDialog.buttonLogoutText")}
      </AkosiButton>
    );

  return (
    <div>
    <HTMLSection
      id="akosi-login-container"
      className="min-w-96 bg-white p-8 rounded-md shadow-md"
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
          <AkosiTextBox
            id="login-username"
            formId="username"
            type="username"
            size="sm"
            className="mt-1 w-full"
            placeholder={t("loginDialog.usernamePlaceholderText")}
            tootTip={t("loginDialog.usernameTooltipText")}
          />
        </div>
        <div>
          <ALVTypography weight="semibold" size="sm" theme="light" type="p">
            <HTMLLabel targetElementId="login-password">
              {t("loginDialog.passwordHeaderText")}
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBox
            id="login-password"
            formId="password"
            type="password"
            size="sm"
            className="mt-1 w-full"
            placeholder={t("loginDialog.passwordPlaceholderText")}
            tootTip={t("loginDialog.passwordTooltipText")}
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
    
    <ALVModal
        className="bg-red-500 p-4 modal"
        modalId="donmodal"
        modals={[
          {
            id: "donmodal",
            children: (
              <div className="bg-green">
                <h1>daasdsadasd asdasd asd</h1>
                <div>sadasdasdasdasdsd</div>
                <p>sadsadasdsadasdsa</p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};
