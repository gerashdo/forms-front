import { Template } from "@/interfaces/template";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { useTranslation } from "react-i18next";


interface SimpleTemplatesTableProps {
  templates: Partial<Template>[];
  title: string;
  description: string;
  onItemClicked?: (id: number) => void;
}

export const SimpleTemplateTables = ({
  templates,
  title,
  description,
  onItemClicked,
}: SimpleTemplatesTableProps) => {
  const {t} = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("components.simpleTemplatesTable.title")}</TableHead>
              <TableHead>{t("components.simpleTemplatesTable.topic")}</TableHead>
              <TableHead>{t("components.simpleTemplatesTable.submissions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell
                  onClick={() => onItemClicked ? onItemClicked(template.id!) : null}
                >
                  <span className="hover:border-b-2 border-neutral-800 dark:border-neutral-200 cursor-pointer">
                    {template.title}
                  </span>
                </TableCell>
                <TableCell>{template.Topic?.name}</TableCell>
                <TableCell>{template.submissions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
