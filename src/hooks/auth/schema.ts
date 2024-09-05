import { z } from "zod"

export const signInSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(32, { message: "Password must be at most 32 characters long" })
        .refine(
            (val) => /^[a-zA-Z0-9_.-]+$/.test(val ?? "Invalid password"),
            "password should contain only alphabet and numbers",
        ),
})

export const signUpSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(32, { message: "Password must be at most 32 characters long" })
        .refine(
            (val) => /^[a-zA-Z0-9_.-]+$/.test(val ?? "Invalid password"),
            "password should contain only alphabet and numbers",
        ),
    firstName: z
        .string()
        .min(2, { message: "First name must be at least 2 characters long" }),
    lastName: z
        .string()
        .min(2, { message: "Last name must be at least 2 characters long" }),
})
