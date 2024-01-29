export type HorizontalALignments = 'left' | 'centered' | 'right';
export type VerticalALignments = 'top' | 'centered' | 'bottom';
export type DisplayTypes = 'flex' | 'grid';
export type ALVSectionProps = {
  id: string;
  children: any;
  className: string;
  displayType?: DisplayTypes;
  hAlign?: HorizontalALignments;
  vAlign?: VerticalALignments;
};

export const ALVSection = ({
  id,
  children,
  className,
  displayType = 'flex',
  hAlign = 'centered',
  vAlign = 'centered',
}: ALVSectionProps) => {
  const VerticalLignment =
    vAlign === 'centered'
      ? 'items-center'
      : vAlign === 'bottom'
      ? 'items-end'
      : 'items-start';
  const HorizontalALignment =
    hAlign === 'centered'
      ? 'justify-center'
      : hAlign === 'right'
      ? 'justify-end'
      : 'justify-start';

  const classes = [
    displayType,
    VerticalLignment,
    HorizontalALignment,
    className,
  ].join(' ');

  return (
    <section id={id} className={classes}>
      {children}
    </section>
  );
};
