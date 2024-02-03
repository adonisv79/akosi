import { CommonElementProps } from '../common.types';

type HTMLImageProps = CommonElementProps & {
  alternativeText: string;
  sourceUrl: string;
};

export const HTMLImage = ({
  className,
  alternativeText,
  sourceUrl,
}: HTMLImageProps) => {
  return <img className={className} alt={alternativeText} src={sourceUrl} />;
};
