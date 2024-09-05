"use client"
import { FormGenerator } from "@/components/global/form-generator"
import { Loader } from "@/components/loader"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { NEXUS_CONSTANTS } from "@/constants"
import { useAuthSignIn } from "@/hooks/auth"
import React from "react"

const SignInForm = () => {
    const { isPending, onAuth, errors, register } = useAuthSignIn()
    return (
        <form className="flex flex-col gap-3 mt-10" onSubmit={onAuth}>
            {NEXUS_CONSTANTS.signInForm.map((field) => (
                <FormGenerator
                    {...field}
                    key={field.id}
                    register={register}
                    errors={errors}
                />
            ))}
            <Button className="rounded-2xl" type="submit">
                <Loader loading={isPending}>Sign In With Email</Loader>
            </Button>
        </form>
    )
}

export default SignInForm
