import { ChangeEvent } from "react";
import { HTMLSelect } from "../../core/html/html-select/html-select";
import { HTMLSelectConfig } from "../../core/html/html-select/html-select.types";
import { i18n } from "../../../i18n";
import { HTMLLabel } from "../../core/html/html-label";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export const AkosiLanguagePicker = () => {
  const { t } = useTranslation();

  const config: HTMLSelectConfig = {
    options: [
      { text: `🇭🇰 ${t('languageSelection.chinese')}`, value: "zh" },
      { text: `🇺🇸 ${t('languageSelection.english')}`, value: "en" },
      { text: `🇵🇭 ${t('languageSelection.filipino')}`, value: "tl" },
      { text: `🇯🇵 ${t('languageSelection.japanese')}`, value: "ja" },
      { text: `🇰🇷 ${t('languageSelection.korean')}`, value: "ko" },
      { text: `🇪🇸 ${t('languageSelection.spanish')}`, value: "es" },
      { text: `🇹🇭 ${t('languageSelection.thai')}`, value: "th" },
    ],
  };
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('lang', e.target.value || 'en');
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <HTMLLabel targetElementId="akosi-language-selector">
        {t('languageSelection.selectLanguage')}
      </HTMLLabel>
      <HTMLSelect
        id="akosi-language-selector"
        name="lang"
        config={config}
        defaultValue={i18next.language}
        onChange={handleChange}
      />
    </>
  );
};
