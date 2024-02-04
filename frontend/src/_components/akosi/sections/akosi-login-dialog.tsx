import { HTMLForm } from "../../core/html/html-form";
import { HTMLLabel } from "../../core/html/html-label";
import { HTMLSection } from "../../core/html/html-section";
import { ALVTypography } from "../../core/alv-typography";
import { AkosiTextBox } from "../common/akosi-textbox";
import { AkosiButton } from "../common/akosi-button";
import { HTMLLink } from "../../core/html/html-link";
import { useSignInAccountMutation } from "../../../api/queries/auth-query";
import { HTMLButton } from "../../core/html/html-button/html-button";
import { useState } from "react";

type AkosiLoginDialogProps = {
  texts: {
    buttonLoginText: string;
    buttonLogoutText: string;
    dialogHeaderText: string;
    notAMemberText: string;
    passwordHeaderText: string;
    passwordPlaceholderText?: string;
    passwordTooltipText?: string;
    passwordForgotLink: string;
    registerHereText: string;
    usernameHeaderText: string;
    usernamePlaceholderText?: string;
    usernameTooltipText?: string;
  };
  registrationUrl: string;
  disabled?: boolean;
};

function hasSessionToken() {
  let token = sessionStorage.getItem("accessToken");
  return !!token;
}

export const AkosiLoginDialog = ({
  texts,
  registrationUrl = "/",
  disabled,
}: AkosiLoginDialogProps) => {
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
      <HTMLButton id="sign-out" onClick={handleSignOut}>
        {texts.buttonLogoutText}
      </HTMLButton>
    );

  return (
    <HTMLSection
      id="akosi-login-container"
      className="min-w-96 bg-white p-8 rounded-md shadow-md"
      displayType="grid"
    >
      <ALVTypography type="h4" className="mb-4">
        {texts.dialogHeaderText}
      </ALVTypography>
      <HTMLForm id="login-form" className="min-w-full" onSubmit={handleSubmit}>
        <div className="mb-4">
          <ALVTypography weight="semibold" size="sm" theme="light">
            <HTMLLabel targetElementId="login-username">
              {texts.usernameHeaderText}
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBox
            id="login-username"
            formId="username"
            type="username"
            size="sm"
            className="mt-1 w-full"
            placeholder={texts.usernamePlaceholderText}
            tootTip={texts.usernameTooltipText}
          />
        </div>
        <div className="mb-4">
          <ALVTypography weight="semibold" size="sm" theme="light">
            <HTMLLabel targetElementId="login-password">
              {texts.passwordHeaderText}
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBox
            id="login-password"
            formId="password"
            type="password"
            size="sm"
            className="mt-1 w-80"
            placeholder={texts.passwordPlaceholderText}
            tootTip={texts.passwordTooltipText}
          />
          <ALVTypography
            italic
            size="sm"
            theme="light"
            className="py-2 text-right"
          >
            <HTMLLink
              targetUrl={registrationUrl}
              className="text-blue-400 hover:text-blue-600"
            >
              {texts.passwordForgotLink}
            </HTMLLink>
          </ALVTypography>
        </div>
        <AkosiButton
          type="submit"
          id="login-button"
          theme="primary"
          borderRounding="full"
          className="px-4 py-2 w-full"
        >
          {texts.buttonLoginText}
        </AkosiButton>
        <ALVTypography italic size="sm" theme="light" className="pt-5">
          {texts.notAMemberText}
          <HTMLLink
            targetUrl={registrationUrl}
            className="text-blue-400 hover:text-blue-600"
          >
            {texts.registerHereText}
          </HTMLLink>
        </ALVTypography>
      </HTMLForm>
    </HTMLSection>
  );
};
