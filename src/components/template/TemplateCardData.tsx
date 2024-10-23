import { Template } from "@/interfaces/template";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlobeIcon, LockIcon } from "lucide-react";
import { UsersSimpleList } from "../auth/UsersSimpleList";
import { getCloudinaryUrl } from "@/helpers/images";
import { useTranslation } from "react-i18next";


interface TemplateCardDataProps {
  template: Template
}

export const TemplateCardData = ({template}: TemplateCardDataProps) => {
  const {t} = useTranslation();
  const imageParams = {
    w: 400,
    f: 'auto',
    q: 'auto',
  }

  return (
    <CardContent className="grid grid-cols-2 gap-x-6 gap-y-8">
      <div className="space-y-1">
        <h3 className="text-sm font-medium">
          {t("components.templateCardData.title")}
        </h3>
        <p className="text-sm text-muted-foreground">{template.title}</p>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium">
          {t("components.templateCardData.topic")}
        </h3>
        <p className="text-sm text-muted-foreground">{template.Topic.name}</p>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium">
          {t("components.templateCardData.description")}
        </h3>
        <p className="text-sm text-muted-foreground">{template.description}</p>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium">
          {t("components.templateCardData.image")}
        </h3>
        {template.image ? (
          <img src={getCloudinaryUrl(template.image, imageParams)} alt={template.title} className="w-1/4 h-auto object-cover rounded-md" />
        ) : (
          <p className="text-sm text-muted-foreground">{t("components.templateCardData.noImage")}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">
            {t("components.templateCardData.tags")}
          </h3>
          {template.Tags.map((tag) => (
            <Badge key={tag.id} variant="secondary">{tag.name}</Badge>
          ))}
        </div>
      </div>
      {template.isPublic ? (
        <div className="bg-green-100 border border-green-200 rounded-md p-4 flex items-center space-x-2">
          <GlobeIcon className="h-5 w-5 text-green-600" />
          <p className="text-sm text-green-600 font-medium">
            {t("components.templateCardData.isPublic.yes")}
          </p>
        </div>
      ) : (
        <div className="bg-yellow-100 border border-yellow-200 rounded-md p-4 flex items-center space-x-2">
          <LockIcon className="h-5 w-5 text-yellow-600" />
          <p className="text-sm text-yellow-600 font-medium">
            {t("components.templateCardData.isPublic.no")}
          </p>
        </div>
      )}
      {!template.isPublic && (
        <div className="space-y-2 col-span-2">
          <UsersSimpleList
            title={t("components.templateCardData.usersWithAccess")}
          />
        </div>
      )}
    </CardContent>
  )
}
