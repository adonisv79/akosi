import { CommonElementProps, ParentalElementProps } from './common.types';

type ALVLabelProps = CommonElementProps &
  ParentalElementProps & {
    targetElementId: string;
  };

export const ALVLabel = ({
  children,
  className,
  targetElementId,
}: ALVLabelProps) => {
  return (
    <label htmlFor={targetElementId} className={className}>
      {children}
    </label>
  );
};
