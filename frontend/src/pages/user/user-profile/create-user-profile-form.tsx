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

export const CreateUserProfileForm = () => {
  const { t } = useTranslation();
  const session = useContext(UserSessionContext);
  const { data: newProfile, mutate: createProfile } = useUserProfilesMutation(
    session.token?.userId
  );

  useEffect(() => {
    if (newProfile) alert(JSON.stringify(newProfile));
  }, [newProfile]);

  const handleSubmit = async (formData: Record<string, string>) => {
    await createProfile({
      name: formData["name"],
      givenName: formData["firstname"],
      middleName: formData["middlename"],
      surname: formData["lastname"],
    });
  };

  return (
    <HTMLSection
      id="akosi-create-user-profile"
      className="min-w-96 bg-white text-black p-2"
    >
      <div className="text-right mb-5">
        <AkosiLanguagePicker className="text-black bg-white" />
      </div>
      <HTMLForm id="login-form" className="min-w-full" onSubmit={handleSubmit}>
        <div className="mb-4">
          <ALVTypography weight="semibold" size="sm" theme="light" type="p">
            <HTMLLabel targetElementId="profile-name">
              {t("profiles.form.profileNameLabel")}
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBox
            id="name"
            minLength={3}
            maxLength={30}
            isRequiredToSubmit
            texts={{
              placeholder: t("profiles.form.profileNamePlaceholder"),
              title: t("profiles.form.profileNameTooltip"),
            }}
          />
        </div>

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
