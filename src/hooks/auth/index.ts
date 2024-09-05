"use client"

import { useSignIn, useSignUp } from "@clerk/nextjs"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signInSchema, signUpSchema } from "./schema"
import { useRouter } from "next/navigation"
import ToastNotify from "@/components/global/ToastNotify"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { onSignUpUser } from "@/actions/auth"
import { OAuthStrategy } from "@clerk/types"
const useAuthSignIn = () => {
    const { isLoaded, setActive, signIn } = useSignIn()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<z.infer<typeof signInSchema>>({
        mode: "onChange",
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const handelSignIn = async (email: string, password: string) => {
        if (!isLoaded) {
            return ToastNotify({
                title: "Oops!",
                msg: "Something went wrong",
            })
        }
        try {
            const signInAttempt = await signIn.create({
                identifier: email,
                password,
            })
            if (signInAttempt.status === "complete") {
                reset()
                await setActive({ session: signInAttempt.createdSessionId })
                router.push("/callback/sign-in")
            }
        } catch (error: any) {
            if (error.errors[0].code === "form_password_incorrect") {
                ToastNotify({
                    title: "Oops!",
                    msg: "Invalid  input credentials",
                })
            }
        }
    }

    const { mutate: loginFlow, isPending } = useMutation({
        mutationFn: ({
            email,
            password,
        }: {
            email: string
            password: string
        }) => handelSignIn(email, password),
    })

    const onAuth = handleSubmit(
        async ({ email, password }: z.infer<typeof signInSchema>) => {
            loginFlow({ email, password })
        },
    )
    return {
        onAuth,
        register,
        errors,
        isPending,
    }
}

const useAuthSignUp = () => {
    const { isLoaded, setActive, signUp } = useSignUp()
    const [creating, setCreating] = useState<boolean>(false)
    const [verifying, setVerifying] = useState<boolean>(false)
    const [code, setCode] = useState<string>("")
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        getValues,
    } = useForm({
        mode: "onChange",
        resolver: zodResolver(signUpSchema),
    })

    const generateCode = async (email: string, password: string) => {
        if (!isLoaded) {
            return ToastNotify({
                title: "Oops!",
                msg: "Something went wrong",
            })
        }
        try {
            if (email && password) {
                const signInAttempt = await signUp.create({
                    emailAddress: email,
                    password,
                })
                await signUp.prepareEmailAddressVerification({
                    strategy: "email_code",
                })
                setVerifying(true)
            } else {
                return ToastNotify({
                    title: "Oops!",
                    msg: "Input credentials must be needed",
                })
            }
        } catch (error: any) {
            console.error(JSON.stringify(error, null, 2))
        }
    }
    const initiateUserReg = handleSubmit(async (values) => {
        if (!isLoaded) {
            return ToastNotify({
                title: "Oops!",
                msg: "Something went wrong",
            })
        }
        try {
            setCreating(true)
            const signUpUser = await signUp.attemptEmailAddressVerification({
                code,
            })
            if (signUpUser.status === "complete") {
                if (!signUp.createdUserId) return
                const user = await onSignUpUser({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    clerkId: signUp.createdUserId,
                    image: "",
                })
                if (user.status === 201) {
                    await setActive({
                        session: signUpUser.createdSessionId,
                    })
                    ToastNotify({
                        title: "Success",
                        msg: "User created successfully",
                    })
                    router.push("/group/create")
                }
                reset()
                if (user.status !== 201) {
                    setCreating(false)
                    setVerifying(false)
                    router.refresh()
                    ToastNotify({
                        title: "Oops!",
                        msg: user.message || "Something went wrong!",
                    })
                } else {
                    console.error(JSON.stringify(signUpUser, null, 2))
                }
            }
        } catch (error) {
            console.error(JSON.stringify(error, null, 2))
        }
    })

    return {
        register,
        errors,
        onAuth: initiateUserReg,
        creating,
        verifying,
        setCode,
        getValues,
        generateCode,
        code,
    }
}

const useGoogleOAuth = () => {
    const { isLoaded: isSignInLoaded, signIn } = useSignIn()
    const { isLoaded: isSignUpLoaded, signUp } = useSignUp()
    const signInWith = (provider: OAuthStrategy) => {
        if (!isSignInLoaded) return
        try {
            return signIn.authenticateWithRedirect({
                strategy: provider,
                redirectUrl: "/callback",
                redirectUrlComplete: "/callback/sign-in",
            })
        } catch (error) {
            console.log(error)
        }
    }
    const signUpWith = (provider: OAuthStrategy) => {
        if (!isSignUpLoaded) return
        try {
            return signUp.authenticateWithRedirect({
                strategy: provider,
                redirectUrl: "/callback",
                redirectUrlComplete: "/callback/complete",
            })
        } catch (error) {
            console.log(error)
        }
    }
    return { signInWith, signUpWith }
}

export { useAuthSignIn, useAuthSignUp, useGoogleOAuth }
