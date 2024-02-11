import { ReactNode } from "react";

/**
 * All element props should implement this
 */
export type CommonElementProps = {
  /** Class identifier for the element. */
  className?: string;
  /** The identifier (name attribute) of the element in the form */
  id?: string;
  /** Provides additional information about the element usualy supplied by browsers in the form of a tooltip */
  title?: string;
};

/** Use these props when an element is part of an html form */
export type FormElementProps = {
  /** form element configuration. */
  form?: {
    /** The identifier (name attribute) of the element in the form */
    id: string;
    /** If true, triggers the browser to block form submit is empty */
    isRequiredToSubmit?: boolean;
  };
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

/** Use these props when an element is uniquely identifiable */
export type UniqueElementProps = {
  /** Unique identifier for the element. */
  id: string;
};
