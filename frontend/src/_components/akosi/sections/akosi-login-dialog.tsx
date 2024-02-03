import { FormEvent } from 'react';
import { HTMLForm } from '../../core/html/html-form';
import { HTMLLabel } from '../../core/html/html-label';
import { HTMLSection } from '../../core/html/html-section';
import { ALVTypography } from '../../core/alv-typography';
import { AkosiTextBox } from '../basics/akosi-textbox';
import { AkosiButton } from '../basics/akosi-button';
import { HTMLLink } from '../../core/html/html-link';

type AkosiLoginDialogProps = {
  texts: {
    dialogHeaderText: string;
    buttonLoginText: string;
    notAMemberText: string;
    passwordHeaderText: string;
    passwordPlaceholderText?: string;
    passwordTooltipText?: string;
    passwordForgotLink: string;
    registerHereText: string;
    usernameHeaderText: string;
    usernamePlaceholderText?: string;
    usernameTooltipText?: string;
  };
  registrationUrl: string;
  disabled?: boolean;
  onSubmit?: () => {};
};

export const AkosiLoginDialog = ({
  texts,
  registrationUrl = '/',
  disabled,
  onSubmit,
}: AkosiLoginDialogProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit && onSubmit();
  };

  return (
    <HTMLSection
      id="akosi-login-container"
      className="min-w-96 bg-white p-8 rounded-md shadow-md"
      displayType="grid"
    >
      <ALVTypography type="h4" className="mb-4">
        {texts.dialogHeaderText}
      </ALVTypography>
      <HTMLForm id="login-form" className='min-w-full'>
        <div className="mb-4">
          <ALVTypography weight="semibold" size="sm" theme="light">
            <HTMLLabel targetElementId="login-username">
              {texts.usernameHeaderText}
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBox
            id="login-username"
            type="username"
            size='sm'
            className="mt-1 w-full"
            placeholder={texts.usernamePlaceholderText}
            tootTip={texts.usernameTooltipText}
          />
        </div>
        <div className="mb-4">
          <ALVTypography weight="semibold" size="sm" theme="light">
            <HTMLLabel targetElementId="login-password">
              {texts.passwordHeaderText}
            </HTMLLabel>
          </ALVTypography>
          <AkosiTextBox
            id="login-password"
            type="password"
            size='sm'
            className="mt-1 w-80"
            placeholder={texts.passwordPlaceholderText}
            tootTip={texts.passwordTooltipText}
          />
          <ALVTypography italic size="sm" theme="light" className="py-2 text-right">
            <HTMLLink
              targetUrl={registrationUrl}
              className="text-blue-400 hover:text-blue-600"
            >
              {texts.passwordForgotLink}
            </HTMLLink>
          </ALVTypography>
        </div>
        <AkosiButton
          type="submit"
          id="login-button"
          theme="primary"
          borderRounding="full"
          className="px-4 py-2 w-full"
        >
          {texts.buttonLoginText}
        </AkosiButton>
        <ALVTypography italic size="sm" theme="light" className="pt-5">
          {texts.notAMemberText}
          <HTMLLink
            targetUrl={registrationUrl}
            className="text-blue-400 hover:text-blue-600"
          >
            {texts.registerHereText}
          </HTMLLink>
        </ALVTypography>
      </HTMLForm>
    </HTMLSection>
  );
};
