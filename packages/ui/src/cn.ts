import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combines class names using clsx and resolves Tailwind conflicts with tailwind-merge
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
