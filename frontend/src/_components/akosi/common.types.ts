export type ThemableElementProps = {
  /** The different themes we allow for the element */
  theme?: ALVThemes;
};

export type SizeableElementProps = {
  /** The different sizes we allow for the element */
  size?: ALVSizes;
};

export type ALVThemes = 'light' | 'dark' | 'primary';
export type ALVSizes = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
