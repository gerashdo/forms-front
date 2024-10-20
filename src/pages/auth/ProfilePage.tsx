import { useRecoilValue } from "recoil";
import { Navigate } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthState } from "@/state/auth";


const ProfilePage = () => {
  const authState = useRecoilValue(AuthState);
  const {user} = authState;
  if (!user) return <Navigate to="/auth" />;

  return (
    <div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <h2 className="text-2xl font-bold">{user.lastName} {user.name}</h2>
            <p className="text-neutral-500 dark:text-neutral-400">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="templates">
        <TabsList>
          <TabsTrigger value="templates">My Templates</TabsTrigger>
          <TabsTrigger value="forms">My Filled Forms</TabsTrigger>
        </TabsList>
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>My Templates</CardTitle>
              <CardDescription>Manage your created templates here</CardDescription>
            </CardHeader>
            <CardContent>
              <div>Templates</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="forms">
          <Card>
            <CardHeader>
              <CardTitle>Filled Forms</CardTitle>
              <CardDescription>View your filled forms here</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProfilePage;
