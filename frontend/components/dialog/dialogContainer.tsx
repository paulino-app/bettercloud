import { cn } from "@/app/utils/cn";
import React, { Fragment, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

interface DialogContainerProps {
  children: React.ReactNode;
  handleClose: () => void;
  size?: "sm" | "lg" | "xl";
}

export function DialogContainer({
  children,
  handleClose,
  size = "lg",
}: DialogContainerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when the dialog is open

    return () => {
      setMounted(false);
      document.body.style.overflow = ""; // Renable scrolling when the dialog is closed
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <Fragment>
      <div className="fixed inset-0 bg-black opacity-15"></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          className={cn(
            "relative h-3/4 max-h-[512px] w-3/4 max-w-screen-md rounded-[14px] bg-white p-8 shadow-lg md:max-h-96",
            {
              "max-h-[300px] md:max-h-[292px]": size === "sm",
            },
          )}
        >
          {/* Close button */}
          <button
            className="absolute right-4 top-4 text-3xl text-main-gray"
            onClick={handleClose}
          >
            <IoClose />
          </button>
          {children}
        </div>
      </div>
    </Fragment>,
    document.body,
  );
}
