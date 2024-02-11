import { Trans, useTranslation } from "react-i18next";
import { AkosiLanguagePicker } from "../_components/akosi/common/akosi-lang-picker";
import { ALVTypography } from "../_components/core/alv/alv-typography";
import { HTMLSection } from "../_components/core/html/html-section";
import { HTMLLink } from "../_components/core/html/html-link";

export const HomePage = () => {
  const { t } = useTranslation();
  return (
    <HTMLSection id="homepage-container" className="text-white">
      <AkosiLanguagePicker classNameOption="bg-red-500" />
      <ALVTypography type="h1" className="my-6 p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">{t("homePage.welcomeHeader")}</ALVTypography>
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
