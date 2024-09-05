import { z } from "zod"

export const groupSchema = z.object({
    name: z.string().min(3, {
        message: "Group name should be a at least 3 character long",
    }),
    category: z.string().min(1, {
        message: "You must select at least one category",
    }),
})
