import { CheckSquare, Code, Heading1, Heading2, Heading3, ListOrdered, LucideIcon, TextIcon, TextQuote } from "lucide-react"
import { useEditor } from "novel"

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

export type SelectorItem = {
    name: string
    icon: LucideIcon
    command: (editor: ReturnType<typeof useEditor>["editor"]) => void
    isActive: (editor: ReturnType<typeof useEditor>["editor"]) => boolean
  }
export const items: SelectorItem[] = [
    {
      name: "Text",
      icon: TextIcon,
      command: (editor: any) =>
        editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
     
      isActive: (editor: any) =>
        editor.isActive("paragraph") &&
        !editor.isActive("bulletList") &&
        !editor.isActive("orderedList"),
    },
    {
      name: "Heading 1",
      icon: Heading1,
      command: (editor: any) =>
        editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: (editor: any) => editor.isActive("heading", { level: 1 }),
    },
    {
      name: "Heading 2",
      icon: Heading2,
      command: (editor: any) =>
        editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: (editor: any) => editor.isActive("heading", { level: 2 }),
    },
    {
      name: "Heading 3",
      icon: Heading3,
      command: (editor: any) =>
        editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: (editor: any) => editor.isActive("heading", { level: 3 }),
    },
    {
      name: "To-do List",
      icon: CheckSquare,
      command: (editor: any) => editor.chain().focus().toggleTaskList().run(),
      isActive: (editor: any) => editor.isActive("taskItem"),
    },
    {
      name: "Bullet List",
      icon: ListOrdered,
      command: (editor: any) => editor.chain().focus().toggleBulletList().run(),
      isActive: (editor: any) => editor.isActive("bulletList"),
    },
    {
      name: "Numbered List",
      icon: ListOrdered,
      command: (editor: any) => editor.chain().focus().toggleOrderedList().run(),
      isActive: (editor: any) => editor.isActive("orderedList"),
    },
    {
      name: "Quote",
      icon: TextQuote,
      command: (editor: any) =>
        editor
          .chain()
          .focus()
          .toggleNode("paragraph", "paragraph")
         // @ts-ignore
          .toggleBlockquote()
          .run(),
      isActive: (editor: any) => editor.isActive("blockquote"),
    },
    {
      name: "Code",
      icon: Code,
      command: (editor: any) => editor.chain().focus().toggleCodeBlock().run(),
      isActive: (editor: any) => editor.isActive("codeBlock"),
    },
  ]