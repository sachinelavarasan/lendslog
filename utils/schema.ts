import { z } from 'zod';

export const lendsSchema = z
  .object({
    ld_borrower_name: z.string().min(3, { message: 'Minimum 3 chanracters' }),
    ld_borrower_phoneno: z.string().min(8, { message: 'Minimum 8 characters' }),
    ld_borrower_address: z.string().min(3, { message: 'Minimum 3 chanracters' }),
    ld_borrower_notes: z.string().nullable(),
    // nominee
    ld_is_nominee: z.boolean().default(false),
    ld_nominee_name: z.string().nullable(),
    ld_nominee_phoneno: z.string().nullable(),
    ld_nominee_address: z.string().nullable(),
    ld_nominee_notes: z.string().nullable(),
    // surety
    ld_is_surety: z.boolean().default(false),
    ld_surety_type: z.string().optional(),
    ld_surety_notes: z.string().nullable(),
    // lends details
    ld_lend_amount: z.string(),
    ld_interest_rate: z.string().nullable(),
    ld_total_weeks_or_month: z.string(),
    ld_payment_mode: z.string(),
    ld_start_date: z.string(),
    ld_payment_type: z.string().nullable(),
  });
export type lendsSchemaType = z.infer<typeof lendsSchema>;
