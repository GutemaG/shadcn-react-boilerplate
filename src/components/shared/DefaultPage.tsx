import React from "react";
import { DefaultPageHeader } from "./DefaultPageHeader";

interface DefaultPageProps {
  headerTitle: string;
  headerActionButton?: React.ReactNode;
  children: React.ReactNode;
}

export const DefaultPage: React.FC<DefaultPageProps> = ({
  headerTitle,
  headerActionButton,
  children,
}) => {
  return (
    <div className="">
      <DefaultPageHeader
        title={headerTitle}
        actionButton={headerActionButton}
      />
      <div className="mt-2 bg-white dark:bg-primary-foreground p-4 rounded-md">
        {children}
      </div>
    </div>
  );
};
