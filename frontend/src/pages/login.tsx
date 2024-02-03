import { AkosiLoginDialog } from "../_components/akosi/sections/akosi-login-dialog";
import { useTranslation } from "react-i18next";
import { AkosiButton } from "../_components/akosi/basics/akosi-button";

export const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const handleClick = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return (
    <>
      <AkosiButton id="ss" onClick={() => handleClick("en")}>
        English
      </AkosiButton>
      <AkosiButton id="ss" onClick={() => handleClick("ja")}>
        Japanese
      </AkosiButton>
      <AkosiButton id="ss" onClick={() => handleClick("es")}>
        Spanish
      </AkosiButton>
      <AkosiButton id="ss" onClick={() => handleClick("ko")}>
        Korean
      </AkosiButton>
      <AkosiButton id="ss" onClick={() => handleClick("th")}>
        Thai
      </AkosiButton>
      <AkosiButton id="ss" onClick={() => handleClick("tl")}>
        Tagalog
      </AkosiButton>
      <AkosiButton id="ss" onClick={() => handleClick("zh")}>
        Chinese
      </AkosiButton>
      <AkosiLoginDialog
        registrationUrl="/"
        texts={{
          dialogHeaderText: t("dialogHeaderText"),
          passwordForgotLink: t("passwordForgotLink"),
          passwordHeaderText: t("passwordHeaderText"),
          passwordPlaceholderText: t("passwordPlaceholderText"),
          passwordTooltipText: t("passwordTooltipText"),
          usernameHeaderText: t("usernameHeaderText"),
          usernamePlaceholderText: t("usernamePlaceholderText"),
          usernameTooltipText: t("usernameTooltipText"),
          buttonLoginText: t("buttonLoginText"),
          registerHereText: t("registerHereText"),
          notAMemberText: t("notAMemberText"),
        }}
      />
    </>
  );
};
