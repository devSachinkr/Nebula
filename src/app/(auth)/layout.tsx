import { authUser } from "@/actions/auth"
import BackdropGradient from "@/components/global/backdrop-gradient"
import GlassCard from "@/components/global/glass-card"
import { redirect } from "next/navigation"
import React from "react"

type Props = {
    children: React.ReactNode
}

const layout = async ({ children }: Props) => {
    const user = await authUser()
    if (user.status === 200) {
        redirect("/callback/sign-in")
    }
    return (
        <div className="container h-screen flex justify-center items-center">
          <div className="flex flex-col w-full items-center py-24">
            <h2 className="text-4xl font-bold text-themeTextWhite">Nebula Nexus.</h2>
            <BackdropGradient
              className="w-4/12 h-2/6 opacity-100 md:opacity-60"
              container="flex flex-col items-center"
            >
              <GlassCard className="xs:w-full md:w-7/12 lg:w-5/12 xl:w-4/12 p-7 mt-16">
                {children}
              </GlassCard>
            </BackdropGradient>
          </div>
        </div>
      )
}

export default layout
