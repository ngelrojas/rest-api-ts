import {object, TypeOf, z} from 'zod';


export const createUserSchema = object({
  body: object({
    name: z.string({
      required_error: 'Name is required'
    }),
    password: z.string({
      required_error: 'password is required'
    }).min(6, "password too short - should be 6 chars mininum"),
    passwordConfirmation: z.string ({
      required_error: 'password confirmation is required'
    }),
    email: z.string({
      required_error: 'email is required'
    }).email('not a valid email')
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'password do not match',
    path: ['passwordConfirmation'],
  })
});


export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation">;
