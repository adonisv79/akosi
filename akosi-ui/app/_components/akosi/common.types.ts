export type ThemableElementProps = {
  /** The different themes we allow for the element */
  theme?: ALVThemes;
};

export type SizeableElementProps = {
  /** The different sizes we allow for the element */
  size?: ALVSizes;
};

export type ALVThemes = 'light' | 'dark' | 'primary';
export type ALVSizes = 'sm' | 'md' | 'lg';
