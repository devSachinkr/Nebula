"use server"

import { groupSchema } from "@/components/forms/group/schema"
import { db } from "@/lib/prisma"
import { stripe } from "@/lib/stripe/stripe-server-client"
import { z } from "zod"
import { v4 } from "uuid"
export const getStripeClientSecret = async () => {
    try {
        const payment = await stripe.paymentIntents.create({
            currency: "usd",
            amount: 9900,
            automatic_payment_methods: {
                enabled: true,
            },
        })
        if (payment) {
            return {
                clientSecret: payment.client_secret,
            }
        }
    } catch (error) {
        console.error("Error creating payment intent:", error)
        return {
            status: 401,
            message: "Failed to create payment intent. Please try again.",
        }
    }
}

export const transferCommission = async (dest: string) => {
    try {
        const transfer = await stripe.transfers.create({
            amount: 3960,
            currency: "usd",
            destination: dest,
        })
        if (transfer) {
            return { status: 200 }
        }
    } catch (error) {
        console.error("Error transferring commission:", error)
        return {
            status: 401,
            message: "Failed to transfer commission. Please try again.",
        }
    }
}

export const createNewGroup = async (
    userId: string,
    data: z.infer<typeof groupSchema>,
) => {
    try {
        if (!userId) {
            return { status: 404, message: "User ID must be provided!" }
        }
        const res = await db.user.update({
            where: {
                id: userId,
            },
            data: {
                group: {
                    create: {
                        ...data,
                        affiliate: {
                            create: {},
                        },
                        member: {
                            create: {
                                userId,
                            },
                        },
                        channel: {
                            create: [
                                {
                                    id: v4(),
                                    name: "general",
                                    icon: "general",
                                },
                                {
                                    id: v4(),
                                    name: "announcements",
                                    icon: "announcements",
                                },
                            ],
                        },
                    },
                },
            },
            select: {
                id: true,
                group: {
                    select: {
                        id: true,
                        channel: {
                            select: {
                                id: true,
                            },
                            take: 1,
                            orderBy: {
                                createdAt: "asc",
                            },
                        },
                    },
                },
            },
        })
        if (res) {
            return {
                status: 201,
                data: res,
                message: "Group created successfully",
            }
        }
        return {
            status: 400,
            message: "Failed to create group. Please try again.",
        }
    } catch (error) {
        console.error("Error creating group:", error)
        return {
            status: 500,
            message: "Failed to create group. Please try again.",
        }
    }
}
