import { CommonElementProps, ParentalElementProps } from '../common.types';

// src: www.w3schools.com/html/html_formatting.asp
export type HTMLTextFormatTypes =
  /** The HTML <b> element defines bold text, without any extra importance.*/
  | 'bold'
  /** The HTML <i> element defines a part of text in an alternate voice or mood. The content inside is typically displayed in italic. The <i> tag is often used to indicate a technical term, a phrase from another language, a thought, a ship name, etc. */
  | 'italic'
  /**The HTML <strong> element defines text with strong importance. The content inside is typically displayed in bold. */
  | 'strong'
  /** The HTML <em> element defines emphasized text. The content inside is typically displayed in italic. A screen reader will pronounce the words in <em> with an emphasis, using verbal stress. */
  | 'emphasized'
  /** The HTML <mark> element defines text that should be marked or highlighted */
  | 'marked'
  /** The HTML <small> element defines smaller text */
  | 'small'
  /** The HTML <del> element defines text that has been deleted from a document. Browsers will usually strike a line through deleted text  */
  | 'deleted'
  /** The HTML <ins> element defines a text that has been inserted into a document. Browsers will usually underline inserted text  */
  | 'inserted'
  /** The HTML <sub> element defines subscript text. Subscript text appears half a character below the normal line, and is sometimes rendered in a smaller font. Subscript text can be used for chemical formulas, like H2O where the 2 is positioned lower */
  | 'supscript'
  /** The HTML <sup> element defines superscript text. Superscript text appears half a character above the normal line, and is sometimes rendered in a smaller font. Superscript text can be used for footnotes, like WWW */
  | 'superscript';

export type HTMLTextFormatProps = CommonElementProps &
  ParentalElementProps & {
    type: HTMLTextFormatTypes;
  };

export const HTMLTextFormat = ({ children, type }: HTMLTextFormatProps) => {
  switch (type) {
    case 'bold':
      return <b>{children}</b>;
    case 'italic':
      return <i>{children}</i>;
    case 'strong':
      return <strong>{children}</strong>;
    case 'emphasized':
      return <em>{children}</em>;
    case 'marked':
      return <mark>{children}</mark>;
    case 'small':
      return <small>{children}</small>;
    case 'deleted':
      return <del>{children}</del>;
    case 'inserted':
      return <ins>{children}</ins>;
    case 'supscript':
      return <sub>{children}</sub>;
    case 'superscript':
      return <sup>{children}</sup>;
  }
};
