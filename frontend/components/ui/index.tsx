import { cn } from "@/app/utils/cn";
import React, { Fragment, ReactNode, MouseEventHandler } from "react";

interface ContainerProps {
  children: ReactNode;
}

interface TitleProps {
  name: string;
  center?: boolean;
}

interface SubTitleProps {
  name: string;
  center?: boolean;
}

interface ButtonProps {
  name: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  fill?: boolean;
  attach?: boolean;
}

interface GridContainerProps {
  children: ReactNode;
}

/**
 * Container component
 * @param {ReactNode} children - The children elements
 * @returns {JSX.Element} The Container component
 */
export function Container({ children }: ContainerProps): JSX.Element {
  return (
    <div className="font-noto m-auto min-h-screen w-full max-w-screen-lg px-8 lg:px-0">
      {children}
    </div>
  );
}

/**
 * Title component for displaying a title
 * @param {string} name - The title text
 * @param {boolean} [center=false] - Whether to center the title
 * @returns {JSX.Element} The Title component
 */
export function Title({ name, center = false }: TitleProps): JSX.Element {
  return (
    <Fragment>
      <h1
        className={cn("mt-8 font-varela text-3xl text-main-gray md:text-4xl", {
          "text-center": center,
        })}
      >
        {name}
      </h1>
    </Fragment>
  );
}

/**
 * SubTitle component
 * @param {string} name - The subtitle text
 * @param {boolean} [center=false] - Whether to center the subtitle
 * @returns {JSX.Element} The SubTitle component
 */
export function SubTitle({ name, center = false }: SubTitleProps): JSX.Element {
  return (
    <Fragment>
      <h1
        className={cn("font-varela text-xl text-main-gray md:text-2xl", {
          "text-center": center,
        })}
      >
        {name}
      </h1>
    </Fragment>
  );
}

/**
 * Line component for displaying a horizontal line.
 * @returns {JSX.Element} The Line component.
 */
export function Line(): JSX.Element {
  return <div className="mb-7 mt-4 h-px w-full bg-main-gray-light" />;
}

/**
 * Button component for displaying a button.
 * @param {string} name - The button text.
 * @param {MouseEventHandler<HTMLButtonElement>} handleClick - The click handler.
 * @param {boolean} [fill=false] - Whether the button should fill its container.
 * @returns {JSX.Element} The Button component.
 */
export function Button({
  name,
  handleClick,
  fill = false,
  attach = false,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={cn(
        "rounded-[14px] bg-main-blue px-6 py-2 font-varela text-2xl text-white",
        {
          "w-full": fill,
          "h-[82px]": attach,
        },
      )}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}

/**
 * GridContainer component for displaying a grid of items.
 * @param {ReactNode} children - The children elements.
 * @returns {JSX.Element} The GridContainer component.
 */
export function GridContainer({ children }: GridContainerProps): JSX.Element {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{children}</div>
  );
}
