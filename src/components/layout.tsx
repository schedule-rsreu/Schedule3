import React from "react";
import cn from "classnames";
import { Footer } from "./footer";
import { useStore } from "../store/store";

interface IProps {
  className?: string;
}

export const Layout: React.FC<React.PropsWithChildren<IProps>> = ({
  className,
  children,
}) => {
  const isLoadingInit = useStore((state) => state.isLoadingInit);
  const isLoadingFaculties = useStore((state) => state.isLoadingFaculties);
  const isLoadingToday = useStore((state) => state.isLoadingToday);

  return (
    <div
      className={cn(
        "mx-auto w-[39rem] h-screen overflow-auto text-textPrimary pt-[1.5rem] px-[1.5rem]",
        className
      )}
    >
      {isLoadingInit || isLoadingFaculties || isLoadingToday ? (
        <div className="fixed inset-0 flex items-center justify-center bg-[var(--background)]">
          <div className="preloader" />
        </div>
      ) : (
        children
      )}
      {!isLoadingInit && !isLoadingFaculties && !isLoadingToday && <Footer />}
    </div>
  );
};
