import { useTranslation } from "react-i18next";
import { AkosiButton } from "../../_components/akosi/common/akosi-button";
import { AkosiLanguagePicker } from "../../_components/akosi/common/akosi-lang-picker";
import { AkosiTextBox } from "../../_components/akosi/common/akosi-textbox";
import { ALVTypography } from "../../_components/core/alv/alv-typography";
import { HTMLForm } from "../../_components/core/html/html-form";
import { HTMLLabel } from "../../_components/core/html/html-label";
import { HTMLLink } from "../../_components/core/html/html-link";
import { HTMLSection } from "../../_components/core/html/html-section";
import { AkosiTextBoxPassword } from "../../_components/akosi/common/akosi-textbox-password";

export const RegistrationPage = () => {
  const { t } = useTranslation();

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      console.dir(formData);
      //assume validation passed
      // const result = await signIn.mutateAsync({
      //   username: formData["username"],
      //   password: formData["password"],
      // });
      // console.log(result.accessToken);
      // sessionStorage.setItem("accessToken", result.accessToken);
      // setIsSignedIn(true);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <HTMLSection
      id="akosi-login-container"
      className="min-w-96 bg-white p-8 rounded-md shadow-md"
    >
      <dialog className="open">sadasdf asdfsadfdsaf sdff dsfs</dialog>
      <div className="text-right mb-5">
        <AkosiLanguagePicker className="text-black bg-white" />
      </div>
      <ALVTypography type="h4" className="mb-4">
        {t("registrationDialog.dialogHeaderText")}
      </ALVTypography>
      <HTMLForm id="login-form" className="min-w-90" onSubmit={handleSubmit}>
        <div className="my-2">
          <ALVTypography weight="semibold" size="sm" theme="light" type="p">
            <HTMLLabel targetElementId="login-username">
              {t("registrationDialog.usernameHeaderText")}
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBox
            id="login-username"
            formId="username"
            type="username"
            size="sm"
            className="mt-1 w-full"
            placeholder={t("registrationDialog.usernamePlaceholderText")}
            tootTip={t("registrationDialog.usernameTooltipText")}
          />
        </div>
        <div className="my-2">
          <ALVTypography weight="semibold" size="sm" theme="light" type="p">
            <HTMLLabel targetElementId="login-password">
              {t("registrationDialog.passwordHeaderText")}
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBoxPassword/>
        </div>
        <div className="my-2">
          <ALVTypography weight="semibold" size="sm" theme="light" type="p">
            <HTMLLabel targetElementId="login-password-confirm">
              {t("registrationDialog.passwordConfirmHeaderText")}
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBox
            id="login-password-confirm"
            formId="password-confirm"
            type="password"
            size="sm"
            className="mt-1 w-full"
            placeholder={t("registrationDialog.passwordConfirmPlaceholderText")}
            tootTip={t("registrationDialog.passwordConfirmTooltipText")}
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
