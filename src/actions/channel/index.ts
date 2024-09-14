"use server"

import { db } from "@/lib/prisma"
import { authUser } from "../auth"
import { IChannels } from "@/components/global/sidebar"
import { v4 } from "uuid"

export const getChannelIfo = async (channelId: string) => {
    if (!channelId)
        return {
            status: 400,
            message: "Channel ID must be provided",
        }
    const user = await authUser()
    if (!user) {
        return {
            status: 404,
            message: "User not found",
        }
    }
    try {
        const channel = await db.channel.findUnique({
            where: { id: channelId },
            include: {
                posts: {
                    take: 3,
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        channel: {
                            select: {
                                name: true,
                            },
                        },
                        author: {
                            select: {
                                firstName: true,
                                lastName: true,
                                image: true,
                            },
                        },
                        _count: {
                            select: {
                                comments: true,
                                likes: true,
                            },
                        },
                        likes: {
                            where: {
                                userId: user.id,
                            },
                            select: {
                                userId: true,
                                id: true,
                            },
                        },
                    },
                },
            },
        })
        if (!channel) {
            return { status: 404, message: "Channel not found" }
        }
        return { status: 200, data: channel }
    } catch (error) {
        return { status: 500, message: "Internal Server Error" }
    }
}

export const createNewChannel = async (groupId: string, payload:{id:string,name:string,icon:string}) => {
    if (!groupId) {
        return {
            status: 404,
            message: "Group ID must be provided",
        }
    }

    try {
        const res = await db.group.update({
            where: {
                id: groupId,
            },
            data: {
                channel: {
                    create: { ...payload },
                },
            },
            select: {
                channel: true,
            },
        })
        if (res) {
            return { status: 201, messages: "Channel Created", data: res }
        }

        return { status: 400, message: "Failed to create channel" }
    } catch (error) {
        console.error("Error creating channel:", error)
        return {
            status: 500,
            message: "Failed to create channel. Please try again.",
        }
    }
}







export const updateChannelInfo=async(channelId:string,name?:string,icon?:string)=>{
     if(!channelId){
        return {
            status:404,
            message:"Channel ID must be provided.",
        }
     }
     
     try {
            if(name){
                const res=await db.channel.update({
                    where:{id:channelId},
                    data:{
                        name:name,
                    }
                })
                if(res){
                    return {
                        status:204,
                        message:"Credentials Reflected Successfully"
                    }
                }
                
                return {
                    status:400,
                    message:"Failed to update channel details."
                }
            }
            if( icon){
                const res=await db.channel.update({
                    where:{id:channelId},
                    data:{
                        icon:icon,
                    }
                })
                if(res){
                    return {
                        status:204,
                        message:"Credentials Reflected Successfully"
                    }
                }
                
                return {
                    status:400,
                    message:"Failed to update channel details."
                }
            }  
            if(name && icon ){
                const res=await db.channel.update({
                    where:{id:channelId},
                    data:{
                        name:name,
                        icon:icon,
                    }
                })
                if(res){
                    return {
                        status:204,
                        message:"Credentials Reflected Successfully"
                    }
                }
                
                return {
                    status:400,
                    message:"Failed to update channel details."
                }
            }



     } catch (error) {
         
         console.error("Error updating channel details:", error)
         return {
             status:500,
             message:"Failed to update channel details. Please try again later."
         }
     }
}


export const deleteChannel=async(channelId:string)=>{
    if(!channelId){
        return {
            status:400,
            message:"Channel ID must be provided."
        }
    }
    try {
        const res=await db.channel.delete({
            where:{id:channelId}
        })
        if(res){
            return {
                status:204,
                message:"Channel deleted successfully"
            }
        }
        
        return {
            status:404,
            message:"Channel not found"
        }
    } catch (error) {
         console.error("Error deleting channel:", error)
         return {
             status:500,
             message:"Failed to delete channel. Please try again later."
         }
    }
}