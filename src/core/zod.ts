import { zodI18nMap } from 'zod-i18n-map';
import { z, ZodError } from 'zod';

z.setErrorMap(zodI18nMap);

export type Validators<T> = {
    [K in keyof T]: (v: T[K]) => string | null;
};

export function validate<T>(schema: z.ZodType<T, any>, value: T) {
    try {
        schema.parse(value);
        return null;
    } catch (error) {
        const isZodError = error instanceof ZodError;
        if (!isZodError) throw error;
        return error.errors[0].message;
    }
}

export { z } from 'zod';
