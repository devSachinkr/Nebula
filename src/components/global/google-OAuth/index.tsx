"use client"

import { Loader } from "@/components/loader"
import { Button } from "@/components/ui/button"
import {FcGoogle} from "react-icons/fc"
import React from "react"
import { useGoogleOAuth } from "@/hooks/auth"

type Props = {
    method: "sign-in" | "sign-up"
}

const GoogleOAuth = ({ method }: Props) => {
    const {signInWith,signUpWith}=useGoogleOAuth()
    return (
        <Button
            {...(method === "sign-in"
                ? {
                      onClick: () => signInWith("oauth_google"),
                  }
                : {
                      onClick: () => signUpWith("oauth_google"),
                  })}
            className="w-full rounded-2xl flex gap-3 bg-themeBlack border-themeGray"
            variant={"outline"}
        >
            <Loader loading={false}>
                <FcGoogle  size={25}/>
                Google
            </Loader>
        </Button>
    )
}

export default GoogleOAuth
