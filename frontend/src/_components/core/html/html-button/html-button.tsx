import { FocusEvent, MouseEvent } from "react";
import {
  CommonElementProps,
  NavigableElementProps,
  ParentalElementProps,
  UniqueElementProps,
} from "../../common.types";
import { HTMLButtonTypes } from "./html-button.types";

export type HTMLButtonParams = CommonElementProps &
  UniqueElementProps &
  ParentalElementProps &
  NavigableElementProps & {
    /** Callback function when a click event is performed */
    onClick?: (e: MouseEvent) => void;
    onFocus?: (e: FocusEvent<HTMLButtonElement>) => void;
    onMouseUp?: (e: MouseEvent) => void;
    onMouseDown?: (e: MouseEvent) => void;
    onMouseLeave?: (e: MouseEvent) => void;
    /** The button type */
    type?: HTMLButtonTypes;
  };

/**
 * The Base Button to be used on all components
 * @param param0
 * @returns
 */
export const HTMLButton = ({
  id,
  children,
  className,
  tabIndex,
  title,
  type = "button",
  onClick,
  onFocus,
  onMouseUp,
  onMouseDown,
  onMouseLeave,
}: HTMLButtonParams) => {
  return (
    <button
      id={id}
      className={`justify-center items-center select-none ${className}`}
      onClick={onClick}
      onFocus={onFocus}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      title={title}
      tabIndex={tabIndex}
      type={type}
    >
      {children}
    </button>
  );
};
