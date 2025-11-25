import {z} from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.enum(['Developer', 'Business Analyst', 'Quality Analyst', 'Product Manager', 'Technical Manager']).default('Developer'),
});

export default UserSchema