import {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { HTMLButton } from "../../../_components/core/html/html-button/html-button";
import { CreateUserProfileForm } from "./create-user-profile-form";
import { UserProfilesList } from "./user-profiles-list";
import { ALVDialog } from "../../../_components/core/alv/alv-dialog/alv-dialog";
import { useTranslation } from "react-i18next";
import { HTMLSelect } from "../../../_components/core/html/html-select/html-select";
import {
  GetUserProfilesResponseDto,
  useUserProfilesQuery,
} from "../../../api/queries/user-profiles-query";
import { UserSessionContext } from "../../../hooks/user-session.context";
import {
  HTMLOptionConfig,
  HTMLSelectConfig,
} from "../../../_components/core/html/html-select/html-select.types";
import { useUserProfilesDeleteMutation } from "../../../api/queries/user-profiles-delete-mutation";

export const ProfilesPage = () => {
  const { t } = useTranslation();
  const {
    deleteProfileById,
    refetchUserProfiles,
    selectedProfile,
    selectOptions,
    setSelectedProfileByProductId,
  } = useProfilePageState();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOnCreateButtonClicked = () => {
    modalRef.current?.showModal();
  };

  const handleOnProfilecreated = () => {
    refetchUserProfiles();
    modalRef.current?.close();
  };

  const handleProfileChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const productId = e.currentTarget.value;
    setSelectedProfileByProductId(productId);
  };

  const handleDeleteProfile = async () => {
    if (selectedProfile?.id) {
      await deleteProfileById(selectedProfile.id);
      await refetchUserProfiles();
    }
  };

  return (
    <div className="bg-white text-black w-screen h-screen">
      <HTMLSelect
        id="select-profile"
        name="select-profile"
        className="bg-white border m-3"
        config={selectOptions}
        onChange={handleProfileChange}
      />
      <UserProfilesList selectedProfile={selectedProfile} />
      <HTMLButton id="create" onClick={handleOnCreateButtonClicked}>
        {t(`profiles.form.createProfileButton`)}
      </HTMLButton>
      <ALVDialog
        text={{ title: t(`profiles.form.headerCreate`) }}
        id="profile-dialog"
        modalRef={modalRef}
      >
        <CreateUserProfileForm onCreated={handleOnProfilecreated} />
      </ALVDialog>
      <HTMLButton id="delete-profile-cutton" onClick={handleDeleteProfile}>
        Delete
      </HTMLButton>
    </div>
  );
};

function useProfilePageState() {
  const session = useContext(UserSessionContext);
  const { data: userProfiles, refetch: refetchUserProfiles } =
    useUserProfilesQuery(session.token?.userId);
  const { mutateAsync: deleteProfile } = useUserProfilesDeleteMutation();
  const [selectedProfile, setSelectedProfile] =
    useState<GetUserProfilesResponseDto | null>(null);

  useEffect(() => {
    refetchUserProfiles();
  }, []);

  const keyedProfilesById: Record<string, GetUserProfilesResponseDto> = useMemo(
    () =>
      userProfiles
        ? Object.fromEntries(userProfiles.map((p) => [p.id, p]))
        : {},
    [userProfiles]
  );

  const selectOptions: HTMLSelectConfig = useMemo(
    () => ({
      options: userProfiles
        ? userProfiles.map((p) => ({
            text: p.name,
            value: p.id,
          }))
        : [],
    }),
    [userProfiles]
  );

  useEffect(() => {
    if (
      !selectedProfile &&
      !!selectOptions &&
      selectOptions.options.length > 0
    ) {
      setSelectedProfile(
        keyedProfilesById[(selectOptions.options[0] as HTMLOptionConfig).value]
      );
    }
  }, [selectOptions]);

  const setSelectedProfileByProductId = (productId: string) => {
    setSelectedProfile(keyedProfilesById[productId]);
  };

  const deleteProfileById = async (profileId: string) => {
    if (session.token?.userId)
      await deleteProfile({ profileId, userId: session.token.userId });
  };

  return {
    deleteProfileById,
    refetchUserProfiles,
    selectOptions,
    selectedProfile,
    setSelectedProfileByProductId,
  };
}
