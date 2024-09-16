"use client"
import { JSONContent } from "novel"
import React from "react"
import { FieldErrors } from "react-hook-form"
import HtmlParser from "../html-parser"
import { CharacterCount, handleCommandNavigation, Placeholder } from "novel/extensions"
import {
    EditorBubble,
    EditorBubbleItem,
    EditorCommand,
    EditorCommandItem,
    EditorContent,
    EditorRoot,
} from "novel"
import { cn } from "@/lib/utils"
import { defaultExtensions } from "./extensions"
import {  slashCommand } from "./slash-command"
import { Video } from "./video"
import { Image } from "./image"
type Props = {
    errors: FieldErrors
    name: string
    min: number
    max: number
    textContent: string | undefined
    content: JSONContent | undefined
    setContent: React.Dispatch<React.SetStateAction<JSONContent | undefined>>
    setTextContent: React.Dispatch<React.SetStateAction<string | undefined>>
    onEdit?: boolean
    inline?: boolean
    disabled?: boolean
    htmlContent?: string | undefined
    setHtmlContent?: React.Dispatch<React.SetStateAction<string | undefined>>
}

const BlockTextEditor = ({
    errors,
    name,
    min,
    max,
    textContent,
    content,
    setContent,
    setTextContent,
    onEdit,
    inline,
    disabled,
    htmlContent,
    setHtmlContent,
}: Props) => {
    const [openNode, setOpenNode] = React.useState<boolean>(false)
    const [openLink, setOpenLink] = React.useState<boolean>(false)
    const [openColor, setOpenColor] = React.useState<boolean>(false)
    const [characters, setCharacters] = React.useState<number | undefined>(
        textContent?.length || undefined,
    )
    return (
        <div>
            {htmlContent && !onEdit && inline ? (
                <HtmlParser html={htmlContent} />
            ) : (
                <EditorRoot>
                    <EditorContent
                        className={cn(
                            inline
                                ? onEdit && "mb-5"
                                : "border-[1px] rounded-xl px-10 py-5 text-base border-themeGray bg-themeBlack w-full",
                        )}
                        initialContent={content}
                        onUpdate={({ editor }) => {
                            const json = editor.getJSON()
                            const text = editor.getText()

                            if (setHtmlContent) {
                                const html = editor.getHTML()
                                setHtmlContent(html)
                            }
                            setContent(json)
                            setTextContent(text)
                            setCharacters(text.length)
                        }}
                        editorProps={{
                            editable: () => !disabled as boolean,
                            handleDOMEvents: {
                                keydown: (_view, event) =>
                                    handleCommandNavigation(event),
                            },
                            attributes: {
                                class: `prose prose-lg dark:prose-invert focus:outline-none max-w-full [&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl text-themeTextGray`,
                            },
                        }}
                        extensions={[
                            ...defaultExtensions,
                            slashCommand,
                            CharacterCount.configure({
                                limit:max,
                            }),
                            Placeholder.configure({
                                placeholder:"Type / to insert element..."
                            }),
                            Video,
                            Image
                        ]}
                    >
                        <EditorCommand>
                            <EditorCommandItem />
                            <EditorCommandItem />
                            <EditorCommandItem />
                        </EditorCommand>
                        <EditorBubble>
                            <EditorBubbleItem />
                            <EditorBubbleItem />
                            <EditorBubbleItem />
                        </EditorBubble>
                    </EditorContent>
                </EditorRoot>
            )}
        </div>
    )
}

export default BlockTextEditor
