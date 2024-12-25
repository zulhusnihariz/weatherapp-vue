import parsePhoneNumberFromString from 'libphonenumber-js';
import * as z from 'zod';

export const profileValidationSchema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Must be a valid email' }),
  phoneNumber: z.string().transform((arg, ctx) => {
    const phone = parsePhoneNumberFromString(arg, {
      defaultCountry: 'MY',
      extract: false,
    });

    if (phone && phone.isValid()) {
      return phone.number;
    }

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid phone number',
    });
    return z.NEVER;
  })
})
