import { useRecoilValue } from "recoil";
import { AuthState } from "@/state/auth";
import { UserProfileContent } from "@/components/auth/UserProfileContent";


const ProfilePage = () => {
  const authState = useRecoilValue(AuthState);
  const {user} = authState;
  if (!user) return null;

  return (
    <div>
      <UserProfileContent user={user} isSelf/>
    </div>
  );
}

export default ProfilePage;
