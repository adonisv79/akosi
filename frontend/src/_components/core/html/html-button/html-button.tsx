import { MouseEvent } from 'react';
import {
  CommonElementProps,
  NavigableElementProps,
  ParentalElementProps,
  UniqueElementProps,
} from '../../common.types';
import { HTMLButtonTypes } from './html-button.types';

export type HTMLButtonParams = CommonElementProps &
  UniqueElementProps &
  ParentalElementProps &
  NavigableElementProps & {
    /** Callback function when a click event is performed */
    onClick?: (e: MouseEvent) => void;
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
  type='button',
  onClick,
}: HTMLButtonParams) => {
  return (
    <button
      id={id}
      className={className}
      onClick={onClick}
      tabIndex={tabIndex}
      type={type}
    >
      {children}
    </button>
  );
};
