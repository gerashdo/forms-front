import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SignUpForm from '@/components/auth/SignUpForm'
import LoginForm from "@/components/auth/LoginForm"
import { useTranslation } from "react-i18next"


const AuthPage = () => {
  const {t} = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('login');
  const navigate = useNavigate();

  const handleSingUpSuccess = () => {
    setActiveTab('login');
  }

  const handleLoginSuccess = () => {
    navigate({to: '/', replace: true});
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>
            {t('authPage.title')}
          </CardTitle>
          <CardDescription>
            {t('authPage.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">
                {t('authPage.login')}
              </TabsTrigger>
              <TabsTrigger value="signup">
                {t('authPage.signup')}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm onSuccess={handleLoginSuccess} />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm onSuccess={handleSingUpSuccess}/>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthPage
