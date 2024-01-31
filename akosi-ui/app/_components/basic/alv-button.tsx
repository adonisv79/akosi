import { MouseEvent } from 'react';
import {
  CommonElementProps,
  NavigableElementProps,
  ParentalElementProps,
  SizeableElementProps,
  ThemableElementProps,
  UniqueElementProps,
} from './common.types';

export type ButtonTypes = 'button' | 'reset' | 'submit';

export type ALVButtonParams = CommonElementProps &
  UniqueElementProps &
  ParentalElementProps &
  NavigableElementProps & 
  ThemableElementProps & 
  SizeableElementProps & {
    /** Callback function when a click event is performed */
    onClick?: (e: MouseEvent) => void;
    /** The button type */
    type?: ButtonTypes;
  };

/**
 * The Base Button to be used on all components
 * @param param0
 * @returns
 */
export const ALVButton = ({
  id,
  children,
  className,
  theme = 'light',
  size = 'md',
  tabIndex,
  type,
  onClick,
}: ALVButtonParams) => {
  const themeClasses =
    theme === 'light'
      ? 'text-black bg-white border-black-500 hover:bg-gray-300'
      : theme === 'primary'
      ? 'text-white bg-blue-500 border-black-500 hover:bg-blue-600'
      : 'text-white bg-black border-black-500 hover:bg-gray-700';
  const sizeClasses =
    size === 'sm'
      ? 'text-sm px-2 py-1 border-sm'
      : size === 'md'
      ? 'text-base px-2.5 py-1 border-md'
      : 'text-lg px-3 py-1 border-lg';

  return (
    <button
      id={id}
      className={`rounded-md border ${themeClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
      tabIndex={tabIndex}
      type={type}
    >
      {children}
    </button>
  );
};
