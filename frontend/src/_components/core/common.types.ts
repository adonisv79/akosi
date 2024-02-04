import { ReactNode } from "react";

/**
 * All element props should implement this
 */
export type CommonElementProps = {
  /** Class identifier for the element. */
  className?: string;
};

export type UniqueElementProps = {
  /** Unique identifier for the element. */
  id: string;
};

/**
 * Use this prop when an element can be navigated
 */
export type NavigableElementProps = {
  /** Tab navigation sequence order for the element. */
  tabIndex?: number;
};

/**
 * Use this props when an element can contain child elements
 */
export type ParentalElementProps = {
  /** Contents or child elements for this element */
  children?: ReactNode;
};