"use server"

import { db } from "@/lib/prisma"

export const getAffiliate = async (affiliateId: string) => {
    try {
        if (!affiliateId) {
            return {
                status: 404,
                message: "Affiliate ID must be needed",
            }
        }
        const affiliateData = await db.affiliate.findUnique({
            where: {
                id: affiliateId,
            },
            select: {
                Group: {
                    select: {
                        User: {
                            select: {
                                firstName: true,
                                lastName: true,
                                image: true,
                                id: true,
                                stripeId: true,
                            },
                        },
                    },
                },
            },
        })
        if (!affiliateData) {
            return {
                status: 404,
                message: "Affiliate Data not found",
            }
        }
        return {
            status: 200,
            affiliateUser: affiliateData,
        }
    } catch (error) {
        console.error("Error fetching affiliate:", error)
        return {
            status: 500,
            message: "Error fetching affiliate data",
        }
    }
}
