"use server"

import { db } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export const authUser = async () => {
    try {
        const clerk = await currentUser()
        if (!clerk) return { status: 404 }

        const user = await db.user.findUnique({
            where: {
                clerkId: clerk.id,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
            },
        })
        if (user) {
            return {
                status: 200,
                id: user.id,
                image: clerk.imageUrl,
                userName: `${user.firstName} ${user.lastName}`,
            }
        }
        return { status: 404 }
    } catch (error) {
        console.error("Error fetching user:", error)
        return { status: 500 }
    }
}

export const onSignUpUser = async (data: {
    firstName: string
    lastName: string
    image: string
    clerkId: string
}) => {
    try {
        const user = await db.user.create({
            data: {
                ...data,
            },
        })
        if (user)
            return {
                status: 201,
                id: user.id,
                image: null,
                userName: `${user.firstName} ${user.lastName}`,
            }
        return { status: 400, message: "User  not created. (Try again!)" }
    } catch (error) {
        console.error("Error creating user:", error)
        return { status: 500, message: "Something went wrong. (Try again!)" }
    }
}

export const onSignInUser = async (clerkId: string) => {
    try {
        const isLoggedInUser = await db.user.findUnique({
            where: {
                clerkId,
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
        if (isLoggedInUser) {
            if (isLoggedInUser.group.length > 0) {
                return {
                    status: 207,
                    id: isLoggedInUser.id,
                    groupId: isLoggedInUser.group[0].id,
                    channelId: isLoggedInUser.group[0].channel[0].id,
                }
            }
            return {
                status: 201,
                message: " Logged in  Successfully",
                id: isLoggedInUser.id,
            }
        }
        return {
            status: 404,
            message: "User couldn't be logged in! (Try again)!",
        }
    } catch (error) {
        console.error("Error fetching user:", error)
        return { status: 500, message: "Something went wrong. (Try again!)" }
    }
}
