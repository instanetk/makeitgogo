import { number, object, string } from 'zod';

export const createFundraiserSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    })
      .min(10, 'Title must have at least 10 characters')
      .max(255, 'Title cannot exceed 255 characters'),
    story: string({
      required_error: 'Story is required',
    })
      .min(100, 'Story must have at least 100 characters')
      .max(9999, 'Story must not exceed 9999 characters'),
    image_url: string({
      required_error: 'Image URL is required',
    }),
    category: string({
      required_error: 'Category is required',
    }),
    goal_amount: number({
      required_error: 'Goal amount is required',
      invalid_type_error: 'goal_amount must be a number',
    }),
    owner: string({
      required_error: 'Owner is required',
    }),
    email: string({
      required_error: 'Email is required',
    }),
  }),
});
