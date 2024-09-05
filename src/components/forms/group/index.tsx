import { StripeElements } from "@/components/global/stripe/elements"
import React from "react"
import PaymentForm from "./payment-form"

type Props = {
    userId: string
    affiliate: boolean
    stripeId?: string
}

const GroupForm = ({ affiliate, stripeId, userId }: Props) => {
   
    return (
        <StripeElements>
            <PaymentForm
                userId={userId}
                affiliate={affiliate}
                stripeId={stripeId}
            />
        </StripeElements>
    )
}

export default GroupForm
