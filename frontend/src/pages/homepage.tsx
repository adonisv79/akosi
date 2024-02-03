import { Trans, useTranslation } from "react-i18next";
import { AkosiLanguagePicker } from "../_components/akosi/basics/akosi-lang-picker";
import { ALVTypography } from "../_components/core/alv-typography";
import { HTMLSection } from "../_components/core/html/html-section";
import { HTMLLink } from "../_components/core/html/html-link";

export const HomePage = () => {
  const { t } = useTranslation();
  return (
    <HTMLSection id="homepage-container">
      <AkosiLanguagePicker />
      <ALVTypography type="h1">{t("homePage.welcomeHeader")}</ALVTypography>

      <ALVTypography>
        <Trans
          t={t}
          i18nKey="homePage.underConstruction"
          values={{ loginPageLink: t("homePage.loginPageLinkText") }}
          components={{ a: <HTMLLink targetUrl="/auth" /> }}
        />
      </ALVTypography>
    </HTMLSection>
  );
};
