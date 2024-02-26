import { useTranslation } from "react-i18next";
import { AkosiLanguagePicker } from "../../../_components/akosi/common/akosi-lang-picker";
import { ALVTypography } from "../../../_components/core/alv/alv-typography";
import { HTMLSection } from "../../../_components/core/html/html-section";
import { HTMLForm } from "../../../_components/core/html/html-form";
import { HTMLLabel } from "../../../_components/core/html/html-label";
import { AkosiTextBoxUsername } from "../../../_components/akosi/common/akosi-textbox-username";

export const CreateUserProfile = () => {
  const { t } = useTranslation();

  const handleSubmit = () => {};

  return (
    <HTMLSection
      id="akosi-create-user-profile"
      className="min-w-96 bg-white text-black p-8 rounded-md shadow-md"
    >
      <div className="text-right mb-5">
        <AkosiLanguagePicker className="text-black bg-white" />
      </div>
      <ALVTypography type="h4" className="mb-4">
        {t("profiles.form.headerCreate")}
      </ALVTypography>

      <HTMLForm id="login-form" className="min-w-full" onSubmit={handleSubmit}>
        <div className="mb-4">
          <ALVTypography weight="semibold" size="sm" theme="light" type="p">
            <HTMLLabel targetElementId="profile-firstname">
              {t("profiles.form.firstNameLabel")}
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBoxUsername
            texts={{
              placeholder: t("profiles.form.firstNamePlaceholder"),
              title: t("profiles.form.firstNameTooltip"),
            }}
          />
        </div>

        <div className="mb-4">
          <ALVTypography weight="semibold" size="sm" theme="light" type="p">
            <HTMLLabel targetElementId="profile-middlename">
              {t("profiles.form.middleNameLabel")}
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBoxUsername
            texts={{
              placeholder: t("profiles.form.middleNamePlaceholder"),
              title: t("profiles.form.middleNameTooltip"),
            }}
          />
        </div>

        <div className="mb-4">
          <ALVTypography weight="semibold" size="sm" theme="light" type="p">
            <HTMLLabel targetElementId="profile-lastname">
              {t("profiles.form.lastNameLabel")}
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBoxUsername
            texts={{
              placeholder: t("profiles.form.lastNamePlaceholder"),
              title: t("profiles.form.lastNameTooltip"),
            }}
          />
        </div>
      </HTMLForm>
    </HTMLSection>
  );
};
