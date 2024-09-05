"use client"
import {
    createNewGroup,
    getStripeClientSecret,
    transferCommission,
} from "@/actions/payment"
import { groupSchema } from "@/components/forms/group/schema"
import ToastNotify from "@/components/global/ToastNotify"
import { zodResolver } from "@hookform/resolvers/zod"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe, StripeCardElement } from "@stripe/stripe-js"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
const useStripeElements = () => {
    const StripePromise = async () => {
        if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
            throw new Error("Missing Clerk publishable key")
        }
        return await loadStripe(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
    }

    return { StripePromise }
}

const usePayment = ({
    affiliate,
    stripeId,
    userId,
}: {
    userId: string
    affiliate: boolean
    stripeId?: string
}) => {
    const stripe = useStripe()
    const elements = useElements()
    const [category, setCategory] = useState<string | undefined>(undefined)
    const router = useRouter()
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<z.infer<typeof groupSchema>>({
        mode: "onChange",
        resolver: zodResolver(groupSchema),
        defaultValues: {
            category: "",
            name: "",
        },
    })
    useEffect(() => {
        const category = watch(({ category }) => {
            if (category) {
                setCategory(category)
            }
        })
        return () => category.unsubscribe()
    }, [watch])

    const { data: Intent, isPending: creatingIntent } = useQuery({
        queryKey: ["payment-intent"],
        queryFn: () => getStripeClientSecret(),
    })
    const { mutateAsync: createGroup, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof groupSchema>) => {
            if (!stripe || !elements || !Intent) {
                return null
            }
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                Intent.clientSecret!,
                {
                    payment_method: {
                        card: elements.getElement(
                            CardElement,
                        ) as StripeCardElement,
                    },
                },
            )
            if (error) {
                console.error("Error:", error)
                return ToastNotify({
                    title: "Oops!",
                    msg: "Something went wrong, try again later",
                })
            }
            if (paymentIntent.status === "succeeded") {
                if (affiliate) {
                    await transferCommission(stripeId!)
                }
                const created = await createNewGroup(userId, data)
                if (created && created.status === 201) {
                    ToastNotify({
                        title: "Success",
                        msg: `${created.message}`,
                    })
                    router.push(
                        `/group/${created.data?.group[0].id}/channel/${created.data?.group[0].channel[0].id}`,
                    )
                }
                if (created && created.status !== 201) {
                    reset()
                    return ToastNotify({
                        title: "Oops!",
                        msg: created.message,
                    })
                }
            }
        },
    })
    const onSubmit = handleSubmit(async (values) => {
        createGroup({ ...values })
    })
    return {
        errors,
        onSubmit,
        creatingIntent,
        category,
        isPending,
        register,
    }
}

export { useStripeElements, usePayment }
