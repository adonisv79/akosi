import React from 'react';
import {
  CommonElementProps,
  ParentalElementProps,
} from './common.types';
import { ALVSizes, ThemableElementProps } from '../akosi/common.types';

export type ALVTypographyProps = CommonElementProps &
  ParentalElementProps &
  ThemableElementProps & {
    weight?: 'bold' | 'semibold';
    italic?: boolean;
    size?: ALVSizes;
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  };

export const ALVTypography = ({
  className,
  size = 'base',
  italic,
  weight,
  theme,
  type = 'p',
  children,
}: ALVTypographyProps) => {
  let classSize = '';
  switch (type) {
    case 'h1': classSize = 'text-5xl'; break;
    case 'h2': classSize = 'text-4xl'; break;
    case 'h3': classSize = 'text-3xl'; break;
    case 'h4': classSize = 'text-2xl'; break;
    case 'h5': classSize = 'text-xl'; break;
    case 'h6': classSize = 'text-lg'; break;
    default:
      classSize = `text-${size}`;
  }

  let classItalicized = '';
  if (italic) classItalicized += 'italic';

  let classBoldened = '';
  if (type && ['h1', 'h2', 'h3'].includes(type)) {
    classBoldened = 'font-bold';
  } else if (type && ['h4', 'h5', 'h6'].includes(type)) {
    classBoldened = 'font-semibold';
  } else if (weight) classBoldened = weight === 'bold' ? 'font-bold' : 'font-semibold';

  const classTheme =
    theme === 'dark'
      ? ' text-gray-100'
      : theme === 'primary'
      ? ' text-white'
      : ' text-gray-900';

  const consolidatedClasses = `${classSize} ${classBoldened} ${classItalicized} ${classTheme} ${className}`;
  if (type === 'p') return <p className={consolidatedClasses}>{children}</p>;
  else if (type === 'h1')
    return <h1 className={`${consolidatedClasses}`}>{children}</h1>;
  else if (type === 'h2')
    return <h2 className={`${consolidatedClasses}`}>{children}</h2>;
  else if (type === 'h3')
    return <h3 className={`${consolidatedClasses}`}>{children}</h3>;
  else if (type === 'h4')
    return <h4 className={`${consolidatedClasses}`}>{children}</h4>;
  else if (type === 'h5')
    return <h5 className={`${consolidatedClasses}`}>{children}</h5>;
  else if (type === 'h6')
    return <h6 className={`${consolidatedClasses}`}>{children}</h6>;
};
