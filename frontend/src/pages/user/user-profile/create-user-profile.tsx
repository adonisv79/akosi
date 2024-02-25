import { useTranslation } from "react-i18next";
import { AkosiLanguagePicker } from "../../../_components/akosi/common/akosi-lang-picker";
import { ALVTypography } from "../../../_components/core/alv/alv-typography";
import { HTMLSection } from "../../../_components/core/html/html-section";
import { HTMLForm } from "../../../_components/core/html/html-form";
import { HTMLLabel } from "../../../_components/core/html/html-label";
import { AkosiTextBoxUsername } from "../../../_components/akosi/common/akosi-textbox-username";

export const CreateUserProfile = () => {
  const { t } = useTranslation();

  const handleSubmit = () => {

  }

  return (
    <HTMLSection
      id="akosi-create-user-profile"
      className="min-w-96 bg-white text-black p-8 rounded-md shadow-md"
    >
      <div className="text-right mb-5">
        <AkosiLanguagePicker className="text-black bg-white" />
      </div>
      <ALVTypography type="h4" className="mb-4">
        AHHHHHHHHAHAHAHHA
      </ALVTypography>
      
      <HTMLForm id="login-form" className="min-w-full" onSubmit={handleSubmit}>

        <div className="mb-4">
          <ALVTypography weight="semibold" size="sm" theme="light" type="p">
            <HTMLLabel targetElementId="login-username">
              Pangalaaannnnn
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBoxUsername
            texts={{
              placeholder: 'asdasjhd jkhkjasdhj falh',
              title: 'jkhsadkjfhkj fhkjsldahflkkj',
            }}
          />
        </div>

      </HTMLForm>
    </HTMLSection>
  );
};
