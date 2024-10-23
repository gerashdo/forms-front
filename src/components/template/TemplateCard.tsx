import { Link } from "@tanstack/react-router"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Template } from "@/interfaces/template"
import { useTranslation } from "react-i18next"


interface TemplateCardProps {
  template: Template
}

export const TemplateCard = ({template}: TemplateCardProps) => {
  const {t} = useTranslation();

  return (
    <Card>
      <CardHeader>
        <Link to={`/templates/${template.id}`}>
          <CardTitle>{template.title}</CardTitle>
        </Link>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          {t("components.templateCard.by")} {template.User.name} {template.User.lastName}
        </p>
      </CardFooter>
    </Card>
  )
}
