import { Link } from "@tanstack/react-router"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Template } from "@/interfaces/template"


interface TemplateCardProps {
  template: Template
}

export const TemplateCard = ({template}: TemplateCardProps) => {
  return (
    <Card>
      <CardHeader>
        <Link to={`/templates/${template.id}`}>
          <CardTitle>{template.title}</CardTitle>
        </Link>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <p className="text-sm text-muted-foreground">By {template.User.name} {template.User.lastName}</p>
      </CardFooter>
    </Card>
  )
}
