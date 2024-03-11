import { GetUserProfilesResponseDto } from "../../../api/queries/user-profiles-query";
import { TableConfig } from "../../../_components/core/html/html-table/html-table.types";
import { HTMLTable } from "../../../_components/core/html/html-table/html-table";
import { useTranslation } from "react-i18next";

type UserProfilesListProps = {
  selectedProfile: GetUserProfilesResponseDto | null;
};

export const UserProfilesList = ({
  selectedProfile,
}: UserProfilesListProps) => {
  const { t } = useTranslation();

  if (!selectedProfile) return null;

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
            {
              children: (
                <>
                  {selectedProfile?.isPrimary
                    ? t(`common.yes`)
                    : t(`common.no`)}
                </>
              ),
            },
          ],
        },
      ],
    },
  };

  return (
    <div>
      <HTMLTable
        id="user-profile-information"
        config={config}
        className="bg-gray-100 "
        classNameCells="border px-2"
      />
    </div>
  );
};
