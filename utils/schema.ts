import { z } from 'zod';

import { phoneValidation, pincodeValidation } from './Validation';
import { IinstallmentTimelines } from './types/lends';

export const lendsSchema = z
  .object({
    ld_borrower_name: z.string().trim().min(3, { message: 'Name should be minimum 3 characters' }),
    ld_borrower_phoneno: z.string().regex(phoneValidation, { message: 'Invalid phone number' }),
    ld_borrower_address: z
      .string()
      .trim()
      .min(3, { message: 'Address should be minimum 3 characters' }),
    ld_borrower_notes: z.string().trim().nullable(),
    // nominee
    ld_is_nominee: z.boolean().default(false),
    ld_nominee_name: z.string().trim(),
    ld_nominee_phoneno: z.string(),
    ld_nominee_address: z.string().nullable(),
    ld_nominee_notes: z.string().nullable(),
    // surety
    ld_is_surety: z.boolean().default(false),
    ld_surety_type: z.number().optional(),
    ld_surety_notes: z.string().trim().nullable(),
    // lends details
    ld_lend_amount: z.string().refine(val => /^\d+$/.test(val) && Number(val) > 0, {
      message: 'Please enter the valid amount',
    }),
    ld_interest_rate: z.number().min(1, { message: 'Please choose interest rate' }),
    ld_total_weeks_or_month: z.string().refine(val => /^\d+$/.test(val) && Number(val) > 0, {
      message: 'Please enter the number of weeks or months',
    }),
    ld_payment_term: z.number().min(1, { message: 'Please choose payment term' }),
    // ld_payment_type: z.string().min(1, { message: 'Please choose payment type' }),
    ld_start_date: z.string().min(3, { message: 'Please select start date' }),
  })
  .superRefine((values, ctx) => {
    if (values.ld_is_nominee) {
      if (!values.ld_nominee_phoneno) {
        ctx.addIssue({
          message: 'Nominee phone number cannot be empty',
          code: z.ZodIssueCode.custom,
          path: ['ld_nominee_phoneno'],
        });
      } else if (!phoneValidation.test(values.ld_nominee_phoneno)) {
        ctx.addIssue({
          message: 'Invalid phone number',
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
          message: 'Please select surety type',
          code: z.ZodIssueCode.custom,
          path: ['ld_surety_type'],
        });
    }
  });
export type lendsSchemaType = z.infer<typeof lendsSchema>;

export const EditLendsSchema = z
  .object({
    ld_borrower_name: z.string().trim().min(3, { message: 'Name should be minimum 3 characters' }),
    ld_borrower_phoneno: z.string().regex(phoneValidation, { message: 'Invalid phone number' }),
    ld_borrower_address: z
      .string()
      .trim()
      .min(3, { message: 'Address should be minimum 3 characters' }),
    ld_borrower_notes: z.string().trim().nullable().optional(),
    // nominee
    ld_is_nominee: z.boolean().default(false),
    ld_nominee_name: z.string().trim().nullable(),
    ld_nominee_phoneno: z.string().nullable(),
    ld_nominee_address: z.string().nullable(),
    ld_nominee_notes: z.string().nullable().optional(),
    // surety
    ld_is_surety: z.boolean().default(false),
    ld_surety_type: z.number().optional(),
    ld_surety_notes: z.string().trim().nullable(),
  })
  .superRefine((values, ctx) => {
    if (values.ld_is_nominee) {
      if (!values.ld_nominee_phoneno) {
        ctx.addIssue({
          message: 'Nominee phone number cannot be empty',
          code: z.ZodIssueCode.custom,
          path: ['ld_nominee_phoneno'],
        });
      } else if (!phoneValidation.test(values.ld_nominee_phoneno)) {
        ctx.addIssue({
          message: 'Invalid phone number',
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
          message: 'Please select surety type',
          code: z.ZodIssueCode.custom,
          path: ['ld_surety_type'],
        });
    }
  });
export type lendsSchemaType = z.infer<typeof lendsSchema> & {
  ld_id?: number;
  installmentTimelines?: IinstallmentTimelines[];
};
export type EditLendsSchemaType = z.infer<typeof EditLendsSchema> & {
  ld_id?: number;
  installmentTimelines?: IinstallmentTimelines[];
};


// User
export const userSchema = z.object({
  us_name: z.string().trim().min(3, { message: 'Name should be minimum 3 characters' }),
  us_username: z.string().trim().min(3, { message: 'Username should be minimum 3 characters' }),
  us_phone_no: z.string().regex(phoneValidation, { message: 'Invalid phone number' }),
  us_email: z.string().email({ message: 'Invalid Email' }).optional(),
  us_address: z.string().trim(),
  us_gender: z.number().optional(),
  us_state: z.string().trim(),
  us_district: z
    .string()
    .trim().optional(),
  us_pincode: z.string().regex(pincodeValidation, { message: 'Invalid pincode number' }).optional(),
});
export type userSchemaType = z.infer<typeof userSchema>;