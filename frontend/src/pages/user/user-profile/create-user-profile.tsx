import { useTranslation } from "react-i18next";
import { AkosiLanguagePicker } from "../../../_components/akosi/common/akosi-lang-picker";
import { ALVTypography } from "../../../_components/core/alv/alv-typography";
import { HTMLSection } from "../../../_components/core/html/html-section";
import { HTMLForm } from "../../../_components/core/html/html-form";
import { HTMLLabel } from "../../../_components/core/html/html-label";
import { AkosiTextBox } from "../../../_components/akosi/common/akosi-textbox";
import { AkosiButton } from "../../../_components/akosi/common/akosi-button";
import { useUserProfilesMutation } from "../../../api/queries/user-profiles-mutation";
import { useContext, useEffect } from "react";
import { UserSessionContext } from "../../../hooks/user-session.context";

export const CreateUserProfile = () => {
  const { t } = useTranslation();
  const session = useContext(UserSessionContext);
  const { data: newProfile, mutate: createProfile } = useUserProfilesMutation(session.token?.userId)

  useEffect(() => {
    if (newProfile) alert(JSON.stringify(newProfile));
  }, [newProfile])

  const handleSubmit = (formData: Record<string, string>) => {
    createProfile({ givenName: formData['firstname'], middleName: formData['middlename'], surname: formData['lastname'] })
  };

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
          <AkosiTextBox
            id="firstname"
            minLength={2}
            maxLength={150}
            isRequiredToSubmit
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
          <AkosiTextBox
            id="middlename"
            maxLength={150}
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
          <AkosiTextBox
            id="lastname"
            maxLength={150}
            texts={{
              placeholder: t("profiles.form.lastNamePlaceholder"),
              title: t("profiles.form.lastNameTooltip"),
            }}
          />
        </div>

        <AkosiButton
          type="submit"
          id="create-profile-button"
          theme="primary"
          borderRounding="full"
          className="mb-4 px-4 py-2 w-full"
        >
          {t("profiles.form.createProfileButton")}
        </AkosiButton>
      </HTMLForm>
    </HTMLSection>
  );
};
