import BackdropGradient from "@/components/global/backdrop-gradient"
import GlassCard from "@/components/global/glass-card"
import GradientText from "@/components/global/gradient-text"
import { NEXUS_CONSTANTS } from "@/constants"
import React from "react"

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <div className="container h-screen grid grid-cols-1 lg:grid-cols-2 content-center">
            <div className="flex items-center">
                <BackdropGradient className="w-8/12 h-2/6 opacity-60">
                    <h5 className="text-2xl font-bold text-themeTextWhite">
                        Nebula Nexus.
                    </h5>
                    <GradientText
                        element="H2"
                        className="text-4xl font-semibold py-1"
                    >
                        Create Your Group.
                    </GradientText>
                    <p className="text-themeTextGray">
                        Free for 14 days, then $99/month. Cancel anytime. All
                        features. Unlimited everything. No hidden fees.
                    </p>
                    <div className="flex flex-col gap-3 mt-16 pl-5">
                        {NEXUS_CONSTANTS.createGroupPlaceHolder.map((p) => (
                            <div className="flex items-center gap-3" key={p.id}>
                                {p.icon}
                                <p className="text-themeTextGray">{p.label}</p>
                            </div>
                        ))}
                    </div>
                </BackdropGradient>
            </div>
            <div>
                <BackdropGradient
                    className="w-6/12 h-3/6 opacity-40
                 "
                    container="lg:items-center"
                >
                    <GlassCard className="xs:w-full lg:w-10/12 xl:w-8/12 mt-16 py-7">
                        {children}
                    </GlassCard>
                </BackdropGradient>
            </div>
        </div>
    )
}

export default layout
