import { z } from 'zod';
import { User } from './models/UserModel';

export const CreateUserSchema = z.object({
    name: z.string(),
    phone1: z.string(),
    phone2: z.string().optional(),
    address: z.object({
        country: z.string(),
        city: z.string(),
        street: z.string(),
        zip: z.string(),
    }),
});

type userInput = z.infer<typeof CreateUserSchema>;

export class UserService {
    async createUser(data: userInput) {
        return await User.create(data);
    }
}