import { ACCEPTED_FILES_TYPES, MAX_UPLOAD_SIZE } from "@/constants/forms"
import { z } from "zod"

export const groupSchema = z.object({
    name: z.string().min(3, {
        message: "Group name should be a at least 3 character long",
    }),
    category: z.string().min(1, {
        message: "You must select at least one category",
    }),
})

export const groupSettingSchema = z
    .object({
        name: z
            .string()
            .min(3, { message: "Name must be at least 3 characters long" })
            .optional()
            .or(z.literal("").transform(() => undefined)),
        description: z
            .string()
            .min(100, {
                message: "Description must be at least 100 characters long",
            })
            .optional()
            .or(z.literal("").transform(() => undefined)),
        icon: z.any().optional(),
        thumbnail: z.any().optional(),
        htmldescription: z
            .string()
            .optional()
            .or(z.literal("").transform(() => undefined)),
        jsondescription: z
            .string()
            .min(100, {
                message: "Description must be at least 100 characters long",
            })
            .optional()
            .or(z.literal("").transform(() => undefined)),
    })
    .refine(
        (s) => {
            if (s.icon?.length) {
                if (
                    ACCEPTED_FILES_TYPES.includes(s.icon?.[0].type!) &&
                    s.icon?.[0].size <= MAX_UPLOAD_SIZE
                ) {
                    return true
                }
            }
            if (!s.icon?.length) {
                return true
            }
        },
        {
            message:
                "The image be less then 2MB, and PNG,JPEG & JPG files are supported",
            path: ["icon"],
        },
    )
    .refine(
        (s) => {
            if (s.thumbnail?.length) {
                if (
                    ACCEPTED_FILES_TYPES.includes(s.thumbnail?.[0].type!) &&
                    s.thumbnail?.[0].size <= MAX_UPLOAD_SIZE
                ) {
                    return true
                }
            }
            if (!s.thumbnail?.length) {
                return true
            }
        },
        {
            message:
                "The image be less then 2MB, and PNG,JPEG & JPG files are supported",
            path: ["thumbnail"],
        },
    )
