import { z } from 'zod';
export const validateSchema = (schema: z.ZodObject<any>) => {
  const { success, error } = schema.safeParse(schema);
  if (!success) {
    let errorMessage = '';
    error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ':' + issue.message + '. ';
    });
    console.error('Validation error:', error);
    return true;
  }
};
