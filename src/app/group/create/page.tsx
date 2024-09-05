import { authUser } from "@/actions/auth"
import { getAffiliate } from "@/actions/groups"
import GroupForm from "@/components/forms/group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { redirect } from "next/navigation"
import React from "react"
type props = {
    searchParams: {
        [affiliate: string]: string
    }
}
const page = async ({ searchParams }: props) => {
    const user = await authUser()
    const affiliate = await getAffiliate(searchParams.affiliate)
    if (!user || !user.id) {
        redirect("/sign-in")
    }
    return (
        <>
            <div className="px-7 flex flex-col">
                <h5 className="font-bold text-base text-themeTextWhite">
                    Payment Method
                </h5>
                <p className="text-themeTextGray leading-tight">
                    Choose your preferred payment method.
                </p>
                {affiliate.status === 200 && (
                    <div className="w-full mt-5 flex justify-center items-center gap-x-2 italic text-themeGray text-sm ">
                        You were preferred by
                        <Avatar>
                            <AvatarImage
                                src={
                                    affiliate?.affiliateUser?.Group?.User.image!
                                }
                                alt="User Avatar image"
                            />
                            <AvatarFallback>UI</AvatarFallback>
                        </Avatar>
                        {affiliate.affiliateUser?.Group?.User.firstName!}{" "}
                        {affiliate.affiliateUser?.Group?.User.lastName!}
                    </div>
                )}
            </div>
            <GroupForm
                userId={user.id}
                affiliate={affiliate.status === 200 ? true : false}
                stripeId={affiliate.affiliateUser?.Group?.User.stripeId || ""}
            />
        </>
    )
}

export default page
