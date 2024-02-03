import { CommonElementProps, ParentalElementProps } from '../common.types';

type HTMLLabelProps = CommonElementProps &
  ParentalElementProps & {
    targetElementId: string;
  };

export const HTMLLabel = ({
  children,
  className,
  targetElementId,
}: HTMLLabelProps) => {
  return (
    <label htmlFor={targetElementId} className={className}>
      {children}
    </label>
  );
};
