import SignInForm from "@/components/forms/auth/sign-in"
import GoogleOAuth from "@/components/global/google-OAuth"
import { Separator } from "@/components/ui/separator"
import React from "react"

const page = () => {
    return (
        <>
          <h5 className="font-bold text-base text-themeTextWhite">Login</h5>
          <p className="text-themeTextGray leading-tight">
            Network with people from around the world, join groups, create your own,
            watch courses and become the best version of yourself.
          </p>
          <SignInForm />
          <div className="my-10 w-full relative">
            <div className="bg-black p-3 absolute text-themeTextGray text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              OR CONTINUE WITH
            </div>
            <Separator orientation="horizontal" className="bg-themeGray" />
          </div>
          <GoogleOAuth method="sign-in" />
        </>
      )
}

export default page
