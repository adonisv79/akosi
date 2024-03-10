import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import {
  GetUserProfilesResponseDto,
  useUserProfilesQuery,
} from "../../../api/queries/user-profiles-query";
import { UserSessionContext } from "../../../hooks/user-session.context";
import { HTMLSelect } from "../../../_components/core/html/html-select/html-select";
import { HTMLOptionConfig, HTMLSelectConfig } from "../../../_components/core/html/html-select/html-select.types";
import { TableConfig } from "../../../_components/core/html/html-table/html-table.types";
import { HTMLTable } from "../../../_components/core/html/html-table/html-table";
import { useTranslation } from "react-i18next";

export const UserProfilesList = () => {
  const { t } = useTranslation();
  const session = useContext(UserSessionContext);
  const { data: userProfiles, refetch } = useUserProfilesQuery(session.token?.userId);
  const [selectedProfile, setSelectedProfile] =
    useState<GetUserProfilesResponseDto | null>(null);

  const keyedProfilesById: Record<string, GetUserProfilesResponseDto> = useMemo(
    () => userProfiles ? Object.fromEntries(userProfiles.map((p) => [p.id, p])) : {},
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
    refetch();
  }, [])

  useEffect(() => {
    if (!selectedProfile && !!selectOptions && selectOptions.options.length > 0) {
      setSelectedProfile(keyedProfilesById[(selectOptions.options[0] as HTMLOptionConfig).value])
    }
  }, [selectOptions])

  if (!userProfiles) return null;

  const handleProfileChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const productId = e.currentTarget.value;
    setSelectedProfile(keyedProfilesById[productId]);
  };

  const config: TableConfig = {
    header: {
      className: "border",
      rows: [{ cells: [{ children: <>field</> }, { children: <>value</> }] }],
    },
    body: {
      className: "border",
      rows: [
        {
          cells: [
            { children: <>{t(`profiles.form.firstNameLabel`)}</> },
            { children: <>{selectedProfile?.givenName}</> },
          ],
        },
        {
          cells: [
            { children: <>{t(`profiles.form.middleNameLabel`)}</> },
            { children: <>{selectedProfile?.middleName}</> },
          ],
        },
        {
          cells: [
            { children: <>{t(`profiles.form.lastNameLabel`)}</> },
            { children: <>{selectedProfile?.surname}</> },
          ],
        },
        {
          cells: [
            { children: <>{t(`profiles.form.patronymicNameLabel`)}</> },
            { children: <>{selectedProfile?.patronymicName}</> },
          ],
        },
        {
          cells: [
            { children: <>{t(`profiles.form.suffixNameLabel`)}</> },
            { children: <>{selectedProfile?.nameSuffix}</> },
          ],
        },
        {
          cells: [
            { children: <>{t(`profiles.form.isPrimaryProfile`)}</> },
            { children: <>{selectedProfile?.isPrimary ? t(`common.yes`): t(`common.no`)}</> },
          ],
        },
      ],
    },
  };

  return (
    <div>
      <HTMLSelect
        id="select-profile"
        name="select-profile"
        config={selectOptions}
        onChange={handleProfileChange}
      />
      <HTMLTable
        id="user-profile-information"
        config={config}
        className="bg-gray-100 "
        classNameCells="border px-2"
      />
    </div>
  );
};
