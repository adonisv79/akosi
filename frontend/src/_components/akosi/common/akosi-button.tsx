import { MouseEvent } from 'react';
import {
  CommonElementProps,
  ParentalElementProps,
} from '../../core/common.types';
import { HTMLButton } from '../../core/html/html-button/html-button';
import { HTMLButtonTypes } from '../../core/html/html-button/html-button.types';
import { SizeableElementProps, ThemableElementProps } from '../common.types';
type AkosiButtonProps = CommonElementProps &
  ParentalElementProps &
  SizeableElementProps &
  ThemableElementProps & {
    id: string;
    borderRounding?: 'md' | 'lg' | 'full';
    onClick?: (e: MouseEvent) => void;
    type?: HTMLButtonTypes;
  };

export const AkosiButton = ({
  id,
  borderRounding = 'md',
  children,
  className,
  onClick,
  theme = 'light',
  size = 'base',
  type,
}: AkosiButtonProps) => {
  const borderRoundingClass =
    borderRounding === 'full'
      ? 'rounded-full'
      : borderRounding === 'lg'
      ? 'rounded-lg'
      : 'rounded-md';

  const themeClasses =
    theme === 'light'
      ? 'text-black bg-white border-black-500 hover:bg-gray-300'
      : theme === 'primary'
      ? 'text-white bg-blue-500 border-black-500 hover:bg-blue-600'
      : 'text-white bg-black border-black-500 hover:bg-gray-700';
  const sizeClasses =
    size === 'sm'
      ? 'text-sm px-2 py-1 border-sm'
      : size === 'base'
      ? 'text-base px-2.5 py-1 border-md'
      : 'text-lg px-3 py-1 border-lg';

  const classConsolidated = `border px-4 py-2 w-full ${borderRoundingClass} ${themeClasses} ${sizeClasses} ${className}`;
  console.log(classConsolidated)
  return (
    <HTMLButton type={type} id={id} className={classConsolidated} onClick={onClick}>
      {children}
    </HTMLButton>
  );
};
