import * as React from 'react';
import { cn } from '@stanpi/ui';

// Simple card container with pastel background and border
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-white/70 p-2 shadow-sm backdrop-blur',
        className
      )}
      {...props}
    />
  );
}

export default Card;
