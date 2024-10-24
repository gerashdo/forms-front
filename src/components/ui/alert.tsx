

interface AlertBoxProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  title: string;
  icon?: React.ReactNode;
}

export const AlertBox = ({
  variant,
  title,
  icon,
}: AlertBoxProps) => {
  const colors = {
    success: 'bg-green-100 border-green-200 text-green-600 dark:bg-green-800 dark:border-green-600 dark:text-green-200',
    error: 'bg-red-100 border-red-200 text-red-600 dark:bg-red-800 dark:border-red-600 dark:text-red-200',
    warning: 'bg-yellow-100 border-yellow-200 text-yellow-600 dark:bg-yellow-800 dark:border-yellow-600 dark:text-yellow-200',
    info: 'bg-blue-100 border-blue-200 text-blue-600 dark:bg-blue-800 dark:border-blue-600 dark:text-blue-200',
  };;

  return (
    <div className={`rounded-md p-4 flex items-center space-x-2 ${colors[variant]}`}>
      {icon}
      <p className="text-sm font-medium">{title}</p>
    </div>
  )
}
