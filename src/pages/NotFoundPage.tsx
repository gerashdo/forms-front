import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";


const NotFoundPage = () =>{
  const {t} = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-7xl font-bold text-primary text-neutral-950 dark:text-neutral-50">404</h1>
        <h2 className="text-2xl font-semibold text-foreground text-neutral-950 dark:text-neutral-50">
          {t('notFoundPage.title')}
        </h2>
        <p className="text-muted-foreground text-neutral-950 dark:text-neutral-50">
          {t('notFoundPage.description')}
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild variant="default">
            <Link to="/">
              {t('notFoundPage.home')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage;
