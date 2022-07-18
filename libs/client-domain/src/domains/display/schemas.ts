import { enumType } from 'vcc-schema';

export const themeSchema = enumType(['light', 'dark']).default('dark');
