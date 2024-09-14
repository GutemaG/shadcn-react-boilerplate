import React from "react";

interface DefaultPageHeaderProps {
  title: string;
  actionButton?: React.ReactNode;
}

export const DefaultPageHeader: React.FC<DefaultPageHeaderProps> = ({
  title,
  actionButton,
}) => {
  return (
    <div className="flex items-center justify-between py-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      {actionButton && <div>{actionButton}</div>}
    </div>
  );
};
