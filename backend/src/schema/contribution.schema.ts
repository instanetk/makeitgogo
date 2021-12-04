import { number, object, string } from 'zod';

export const contributionSchema = object({
  body: object({
    amount: number({
      required_error: 'A contribution amount is required.',
    }),
    fundraiserId: string({
      required_error: 'A valid Fundraiser document ID is required.',
    }),
  }),
});
