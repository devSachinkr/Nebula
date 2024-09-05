import React from "react"
import CTA from "./_components/cta"
import DashboardSnippet from "./_components/dashboard-snippet"
import dynamic from "next/dynamic"
const Subscriptions = dynamic(
    () =>
        import("./_components/subscriptions/index").then(
            (m) => m.Subscriptions,
        ),
    { ssr: true },
)
type Props = {}

const page = (props: Props) => {
    return (
        <main className="md:px-10 py-20 flex flex-col gap-36">
            <div>
                <CTA />
                <DashboardSnippet />
            </div>
            <Subscriptions />
        </main>
    )
}

export default page
