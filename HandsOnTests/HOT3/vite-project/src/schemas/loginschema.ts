import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const registerSchema = z.object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.array(z.enum(['customer', 'product manager'])).min(1, 'Please select at least one role'),

});

export const userEditSchema = z.object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export const productEditSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    category: z.string().min(1, "Category is required"),
    price: z.number().min(1, "Price is required").refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: "Price must be a non-negative number",
    }),
    description: z.string().min(1, "Description is required"),
});

export const productCreateSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    category: z.string().min(1, "Category is required"),
    price: z.number().min(1, "Price is required").refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: "Price must be a non-negative number",
    }),
    description: z.string().min(1, "Description is required"),
});
