/**
 * Central export for the app's data provider.
 * Swap the mock provider for a real one when available.
 */
import { createMockProvider } from '@stanpi/data';

export const provider = createMockProvider(42);
