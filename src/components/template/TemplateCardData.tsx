import { Template } from "@/interfaces/template";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertBox } from "@/components/ui/alert";
import { UsersSimpleList } from "@/components/auth/UsersSimpleList";
import { getCloudinaryUrl } from "@/helpers/images";
import { GlobeIcon, LockIcon } from "lucide-react";
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
        <AlertBox
          variant="success"
          title={t("components.templateCardData.isPublic.yes")}
          icon={<GlobeIcon className="h-5 w-5" />}
        />
      ) : (
        <AlertBox
          variant="warning"
          title={t("components.templateCardData.isPublic.no")}
          icon={<LockIcon className="h-5 w-5" />}
        />
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
