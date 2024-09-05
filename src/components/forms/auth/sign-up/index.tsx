"use client"
import { FormGenerator } from "@/components/global/form-generator"
import { Loader } from "@/components/loader"
import { Button } from "@/components/ui/button"
import { NEXUS_CONSTANTS } from "@/constants"
import { useAuthSignUp } from "@/hooks/auth"
import dynamic from "next/dynamic"
import React from "react"

const OTPInput = dynamic(
    () =>
        import("@/components/forms/auth/sign-up/otp-form").then(
            (c) => c.default,
        ),
    { ssr: false },
)

const SignUpForm = () => {
    const {
        register,
        code,
        creating,
        errors,
        generateCode,
        getValues,
        onAuth,
        setCode,
        verifying,
    } = useAuthSignUp()

    return (
        <form onSubmit={onAuth} className="flex flex-col gap-3 mt-10">
            {verifying ? (
                <div className="flex justify-center mb-5">
                    <OTPInput otp={code} setOtp={setCode} />
                </div>
            ) : (
                NEXUS_CONSTANTS.signUpForm.map((field) => (
                    <FormGenerator
                        key={field.id}
                        {...field}
                        register={register}
                        errors={errors}
                    />
                ))
            )}
            {verifying ? (
                <Button type="submit" className="rounded-2xl">
                    <Loader loading={creating}>Sign Up With Email</Loader>
                </Button>
            ) : (
                <Button
                    type="button"
                    className="rounded-2xl"
                    onClick={() => {
                        generateCode(getValues("email"), getValues("password"))
                    }}
                >
                    <Loader loading={false}>Generate Code</Loader>
                </Button>
            )}
        </form>
    )
}

export default SignUpForm
