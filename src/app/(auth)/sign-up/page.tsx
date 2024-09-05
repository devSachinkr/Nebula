import SignUpForm from "@/components/forms/auth/sign-up"
import GoogleOAuth from "@/components/global/google-OAuth"
import { Separator } from "@/components/ui/separator"
import { useAuthSignUp } from "@/hooks/auth"
import React from "react"

const page = () => {
    return (
        <>
            <h5 className="font-bold text-base text-themeTextWhite leading-tight">
                Sign Up
            </h5>
            <p className="text-themeTextGray leading-tight">
                Network with people from around the world, join groups, create
                your own, watch courses and become the best version of yourself.
            </p>
            <SignUpForm />
            <div className="my-10 w-full relative">
                <div className="bg-black p-3 absolute text-themeTextWhite text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    OR CONTINUE WITH
                </div>
                <Separator orientation="horizontal" className="bg-themeBlack" />
            </div>
            <GoogleOAuth method="sign-up" />
        </>
    )
}

export default page
