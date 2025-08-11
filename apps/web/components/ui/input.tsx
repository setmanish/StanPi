"use client";

import * as React from 'react';
import { cn } from '@stanpi/ui';

// Styled text input used for search fields and forms
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-9 w-full rounded-md border border-gray-300 bg-white/60 px-3 py-1 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export { Input };
export default Input;
