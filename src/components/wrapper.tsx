import React from "react";
import cn from "classnames";

interface IProps {
  className?: string;
}

export const Wrapper: React.FC<React.PropsWithChildren<IProps>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("min-h-[calc(100vh-11rem)]", className)}>{children}</div>
  );
};
