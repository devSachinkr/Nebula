"use client"
import { useStripeElements } from "@/hooks/payment"
import {Elements} from "@stripe/react-stripe-js"
type props = {
    children: React.ReactNode
}

export const StripeElements = ({ children }: props) => {
    const { StripePromise } = useStripeElements()
    const promise = StripePromise()
    return promise && <Elements stripe={promise}>{children}</Elements>
}
