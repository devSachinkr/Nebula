"use server"

import { db } from "@/lib/prisma"
import { authUser } from "../auth"

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

export const getGroupInfo = async (groupId: string) => {
    if (!groupId) {
        return {
            status: 404,
            message: "Group ID must be needed",
        }
    }
    const user = await authUser()
    if (!user) {
        return {
            status: 401,
            message: "User not authenticated",
        }
    }
    try {
        const res = await db.group.findUnique({
            where: {
                id: groupId,
            },
        })
        if (res) {
            return {
                status: 200,
                groupInfo: res,
                isGroupOwner: user.id === res.userId,
            }
        }
        return {
            status: 404,
            message: "Group not found",
        }
    } catch (error) {
        console.error("Error fetching group:", error)
        return {
            status: 500,
            message: "Error fetching group data",
        }
    }
}

export const getUserGroups = async (userId: string) => {
    if (!userId) {
        return {
            status: 404,
            message: "User ID must be needed",
        }
    }
    try {
        const res = await db.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                group: {
                    select: {
                        id: true,
                        name: true,
                        icon: true,
                        channel: {
                            where: {
                                name: "general",
                            },
                            select: {
                                id: true,
                            },
                        },
                    },
                },
                membership: {
                    select: {
                        Group: {
                            select: {
                                id: true,
                                icon: true,
                                name: true,
                                channel: {
                                    where: {
                                        name: "general",
                                    },
                                    select: {
                                        id: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })
        if (res && (res.group.length > 0 || res.membership.length > 0)) {
            return {
                status: 200,
                groups: res.group,
                members: res.membership,
            }
        }
        return {
            status: 404,
        }
    } catch (error) {
        console.error("Error fetching user groups:", error)
        return {
            status: 500,
            message: "Error fetching user groups data",
        }
    }
}

export const getGroupChannels = async (groupId: string) => {
    if (!groupId) {
        return {
            status: 404,
            message: "Group ID must be needed",
        }
    }
    try {
        const res = await db.channel.findMany({
            where: {
                groupId,
            },
            orderBy: {
                createdAt: "asc",
            },
        })
        if (res) {
            return { status: 200, data: res }
        }
    } catch (error) {
        console.error("Error fetching group channels:", error)
        return {
            status: 500,
            message: "Error fetching group channels data",
        }
    }
}

export const getGroupSubscriptions = async (groupId: string) => {
    if (!groupId) {
        return {
            status: 404,
            message: "Group ID must be needed",
        }
    }
    try {
        const res = await db.subscription.findMany({
            where: {
                groupId,
            },
            orderBy: {
                createdAt: "asc",
            },
        })
        const count = await db.members.count({
            where: {
                groupId,
            },
        })

        if (res) {
            return { status: 200, subscription: res, count }
        }
        return {
            status: 404,
        }
    } catch (error) {
        console.error("Error fetching group subscriptions:", error)
        return {
            status: 500,
            message: "Error fetching group subscriptions data",
        }
    }
}
export const getAllGroupMembers = async (groupId: string) => {
    if (!groupId) {
        return {
            status: 404,
            message: "Group ID must be needed",
        }
    }

    const user = await authUser()
    if (!user) {
        return {
            status: 401,
            message: "User not authenticated",
        }
    }
    try {
        const res = await db.members.findMany({
            where: {
                groupId,
                NOT: {
                    userId: user.id,
                },
            },
            include: {
                User: true,
            },
        })
        if(res && res.length>0){
            return {status:200,members:res}
        }
        return {
            status: 404,
        }
    } catch (error) {
        console.error("Error fetching all group members:", error)
        return {
            status: 500,
            message: "Error fetching group members data",
        }
    }
}
