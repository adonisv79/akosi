import { FormEvent, useEffect } from 'react';
import {
  CommonElementProps,
  ParentalElementProps,
  UniqueElementProps,
} from '../common.types';

export type HTMLFormProps = CommonElementProps &
  UniqueElementProps &
  ParentalElementProps & {
    onSubmit?: (e: FormEvent | null) => void;
  };

export const HTMLForm = ({ id, children, onSubmit }: HTMLFormProps) => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  useEffect(() => {
    handleClick();
  
    // Attach event listener or perform other side effects
  
    return () => {
      // Cleanup, remove event listeners, etc.
    };
  }, []);

  return (
    <form
      id={id}
      onSubmit={handleClick}
    >
      {children}
    </form>
  );
};
