import { z } from 'zod';
import { phoneValidation } from './Validation';

export const lendsSchema = z
  .object({
    ld_borrower_name: z.string().trim().min(3, { message: 'Minimum 3 chanracters' }),
    ld_borrower_phoneno: z.string().regex(phoneValidation, { message: 'invalid phone' }),
    ld_borrower_address: z.string().trim().min(3, { message: 'Minimum 3 chanracters' }),
    ld_borrower_notes: z.string().trim().nullable(),
    // nominee
    ld_is_nominee: z.boolean().default(false),
    ld_nominee_name: z.string().trim(),
    ld_nominee_phoneno: z.string(),
    ld_nominee_address: z.string().nullable(),
    ld_nominee_notes: z.string().nullable(),
    // surety
    ld_is_surety: z.boolean().default(false),
    ld_surety_type: z.string().trim().optional(),
    ld_surety_notes: z.string().trim().nullable(),
    // lends details
    ld_lend_amount: z.string().refine(val => /^\d+$/.test(val) && Number(val) > 0, {
      message: 'Please enter valid enter amount',
    }),
    ld_interest_rate: z.string().nullable(),
    ld_total_weeks_or_month: z.string().refine(val => /^\d+$/.test(val) && Number(val) > 0, {
      message: 'Weeks or month must be a number',
    }),
    ld_payment_mode: z.string().min(1, { message: 'Must choose payment mode' }),
    ld_start_date: z.string(),
    // ld_payment_type: z.string().nullable(),
  })
  .superRefine((values, ctx) => {
    if (values.ld_is_nominee) {
      if (!values.ld_nominee_phoneno) {
        ctx.addIssue({
          message: 'Nominee phone no cannot be empty',
          code: z.ZodIssueCode.custom,
          path: ['ld_nominee_phoneno'],
        });
      } else if (!phoneValidation.test(values.ld_nominee_phoneno)) {
        ctx.addIssue({
          message: 'Invalid phone no',
          code: z.ZodIssueCode.custom,
          path: ['ld_nominee_phoneno'],
        });
      }
      if (!values.ld_nominee_name)
        ctx.addIssue({
          message: 'Nominee name cannot be empty',
          code: z.ZodIssueCode.custom,
          path: ['ld_nominee_name'],
        });
    }
    if (values.ld_is_surety) {
      if (!values.ld_surety_type)
        ctx.addIssue({
          message: 'Surety type cannot be empty',
          code: z.ZodIssueCode.custom,
          path: ['ld_surety_type'],
        });
    }
  });
export type lendsSchemaType = z.infer<typeof lendsSchema>;