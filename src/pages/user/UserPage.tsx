import { UserProfileContent } from "@/components/auth/UserProfileContent";
import { getUserByIdQuery } from "@/queries/auth";
import { AuthState } from "@/state/auth";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { useRecoilValue } from "recoil";


const route = getRouteApi('/_layout/users/$userId');

export const UserPage = () => {
  const {userId} = route.useParams();
  const {token} = useRecoilValue(AuthState);
  const userQuery = useSuspenseQuery(getUserByIdQuery(token || '', Number(userId)));
  const user = userQuery.data.data;
  return (
    <div>
      <UserProfileContent user={user} />
    </div>
  );
}
