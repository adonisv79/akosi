import { CommonElementProps, ParentalElementProps } from '../common.types';

export type HTMLLinkProps = CommonElementProps &
  ParentalElementProps & {
    targetEmail?: string;
    targetUrl?: string;
    toolTip?: string;
  };

export const HTMLLink = ({
  children,
  className,
  targetEmail,
  targetUrl,
  toolTip,
}: HTMLLinkProps) => {
  if (!targetEmail && !targetUrl)
    throw new Error('Must have at least a targetUrl or targetEmail');
  if (targetEmail && targetUrl)
    throw new Error('Must only have either a targetUrl or targetEmail');
  return (
    <a
      className={className}
      title={toolTip}
      href={targetUrl ?? `mailto:${targetEmail}`}
    >
      {children}
    </a>
  );
};
