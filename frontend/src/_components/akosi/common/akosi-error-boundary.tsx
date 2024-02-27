import { AxiosError } from "axios";
import React, { useState, useEffect, ReactNode } from "react";
import { HTMLLink } from "../../core/html/html-link";

type ErrorTypes = 'none' | 'unauthorized' | 'unhandled' 

interface ErrorBoundaryProps {
  children: ReactNode;
}

export const AkosiErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [error, setError] = useState<ErrorTypes>('none');

  useEffect(() => {
    const handleCatch = (error: ErrorEvent) => {
      if (error.error instanceof AxiosError) {
        if (error.error.response?.status === 401) {
          setError('unauthorized')
        }
      } else setError('unhandled');
      // You can log the error or send it to a server for analysis
      console.error(error.error);
    };

    // Assign the error handler
    window.addEventListener("error", handleCatch);

    // Clean up the event listener
    return () => {
      window.removeEventListener("error", handleCatch);
    };
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  if (error === 'unauthorized') {
    return <div>Your session is not active or may have expired! please go back to <HTMLLink targetUrl="/">home</HTMLLink></div>;
  } else if (error === 'unhandled') {
    return <div>Ooops! Something went wrong</div>;
  }

  return <>{children}</>;
};
