import { MouseEvent } from 'react';

export type ButtonThemes = 'light' | 'dark';
export type ButtonSizes = 'sm' | 'md' | 'lg';

export type ALVButtonParams = {
  /** Unique identifier for the button. */
  id: string;
  /** Contents for the button element */
  children: any;
  /** The different themes we allow for the button */
  theme?: ButtonThemes;
  /** Available size variations for the button */
  size?: ButtonSizes;
  /** Callback function when a click event is performed */
  onClick?: (e: MouseEvent) => void;
};

/**
 * The Base Button to be used on all components
 * @param param0
 * @returns
 */
export const ALVButton = ({
  id,
  children,
  theme = 'light',
  size = 'md',
  onClick,
}: ALVButtonParams) => {
  const themeClasses =
    theme === 'light'
      ? 'bg-white text-black border-black-500 hover:bg-gray-300'
      : 'bg-black text-white border-black-500 hover:bg-gray-700';
  const sizeClasses =
    size === 'sm'
      ? 'text-sm px-2 py-1 border-sm'
      : size === 'md'
      ? 'text-base px-2.5 py-1 border-md'
      : 'text-lg px-3 py-1 border-lg';

  return (
    <button
      id={id}
      className={`rounded-full border ${themeClasses} ${sizeClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
