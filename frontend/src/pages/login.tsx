import { AkosiLoginDialog } from "../_components/akosi/sections/akosi-login-dialog";
import { useTranslation } from "react-i18next";
import { AkosiLanguagePicker } from "../_components/akosi/common/akosi-lang-picker";
import { HTMLSection } from "../_components/core/html/html-section";

export const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <HTMLSection id="login-page-container">
      <AkosiLanguagePicker />
      <AkosiLoginDialog
        registrationUrl="/"
        texts={{
          buttonLoginText: t("loginDialog.buttonLoginText"),
          buttonLogoutText: t("loginDialog.buttonLogoutText"),
          dialogHeaderText: t("loginDialog.dialogHeaderText"),
          passwordForgotLink: t("loginDialog.passwordForgotLink"),
          passwordHeaderText: t("loginDialog.passwordHeaderText"),
          passwordPlaceholderText: t("loginDialog.passwordPlaceholderText"),
          passwordTooltipText: t("loginDialog.passwordTooltipText"),
          usernameHeaderText: t("loginDialog.usernameHeaderText"),
          usernamePlaceholderText: t("loginDialog.usernamePlaceholderText"),
          usernameTooltipText: t("loginDialog.usernameTooltipText"),
          registerHereText: t("loginDialog.registerHereText"),
          notAMemberText: t("loginDialog.notAMemberText"),
        }}
      />
    </HTMLSection>
  );
};
