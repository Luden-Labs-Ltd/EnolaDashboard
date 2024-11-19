import { useTranslations } from "next-intl";
import React, { PropsWithChildren } from "react";

interface TaskControlLayoutProps {
}

const TaskControlLayout : React.FC<PropsWithChildren<TaskControlLayoutProps>> = ({children}) => {
  const t = useTranslations();
  return (
    <div className="flex flex-1 justify-between items-center">
      <h3 className="font-grotesk text-[20px] font-medium">{t('Common.tasks')}</h3>

      <div className="flex gap-[24px] items-center">
        {children}
      </div>
    </div>
  );
};

export default TaskControlLayout;
