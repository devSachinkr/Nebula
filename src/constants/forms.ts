export type AuthFormProps = {
    id: string
    type: "email" | "text" | "password"
    inputType: "select" | "input"
    options?: { value: string; label: string; id: string }[]
    label?: string
    placeholder: string
    name: string
}
export const SIGN_UP_FORM: AuthFormProps[] = [
    {
        id: "1",
        inputType: "input",
        placeholder: "First name",
        name: "firstName",
        type: "text",
    },
    {
        id: "2",
        inputType: "input",
        placeholder: "Last name",
        name: "lastName",
        type: "text",
    },
    {
        id: "3",
        inputType: "input",
        placeholder: "Email",
        name: "email",
        type: "email",
    },
    {
        id: "4",
        inputType: "input",
        placeholder: "Password",
        name: "password",
        type: "password",
    },
]

export const SIGN_IN_FORM: AuthFormProps[] = [
    {
        id: "1",
        inputType: "input",
        placeholder: "Email",
        name: "email",
        type: "email",
    },
    {
        id: "4",
        inputType: "input",
        placeholder: "Password",
        name: "password",
        type: "password",
    },
]

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 2
export const ACCEPTED_FILES_TYPES = ["image/png", "image/jpg", "image/jpeg"]
