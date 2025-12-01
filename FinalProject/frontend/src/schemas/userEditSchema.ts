import {z} from "zod";

const userEditSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, "Full Name Is required"),
  role: z.array(z.enum(['Developer', 'Business Analyst', 'Quality Analyst', 'Product Manager', 'Technical Manager', 'Admin'])).optional()
})

export default userEditSchema