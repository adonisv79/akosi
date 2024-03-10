import { useRef } from "react";
import { HTMLButton } from "../../../_components/core/html/html-button/html-button";
import { CreateUserProfileForm } from "./create-user-profile-form";
import { UserProfilesList } from "./user-profiles-list";
import { ALVDialog } from "../../../_components/core/alv/alv-dialog/alv-dialog";
import { useTranslation } from "react-i18next";

export const ProfilesPage = () => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const handleOnCreateButtonClicked = () => {
    modalRef.current?.showModal();
  };

  return (
    <div className="bg-white text-black w-screen h-screen">
      <UserProfilesList />
      <HTMLButton id="create" onClick={handleOnCreateButtonClicked}>
        {t(`profiles.form.createProfileButton`)}
      </HTMLButton>
      <ALVDialog text={{ title: t(`profiles.form.headerCreate`)}} id="profile-dialog" modalRef={modalRef}>
        <CreateUserProfileForm />
      </ALVDialog>
    </div>
  );
};
