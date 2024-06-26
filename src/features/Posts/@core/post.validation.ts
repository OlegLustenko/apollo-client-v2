import { z } from 'zod';

export const PostValidation = z.object({
  title: z
    .string()
    .min(1, { message: 'please add at least 1 character' })
    .max(75, { message: 'you exceeded the maximum length of 75 characters' }),
  body: z
    .string()
    .min(1, { message: 'please add at least 1 character' })
    .max(300, { message: 'you exceeded the maximum length of 300 characters' }),
});

export type PostValidation = z.infer<typeof PostValidation>;
