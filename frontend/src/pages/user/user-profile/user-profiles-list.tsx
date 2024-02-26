import { useContext } from "react";
import { useUserProfilesQuery } from "../../../api/queries/user-profiles-query"
import { UserSessionContext } from "../../../hooks/user-session.context";

export const UserProfilesList = () => {
  const session = useContext(UserSessionContext);
  const { data: userProfiles } = useUserProfilesQuery(session.token?.userId);
  return <div>
    {
     userProfiles?.map(p => (<div>
      {`${p.id} ${p.givenName}`}
     </div>)) 
    }
  </div>
}