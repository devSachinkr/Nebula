"use client"
import { EditorCommandEmpty, JSONContent } from "novel"
import React from "react"
import { FieldErrors } from "react-hook-form"
import HtmlParser from "../html-parser"
import { CharacterCount, handleCommandNavigation } from "novel/extensions"
import { Placeholder } from "@tiptap/extension-placeholder"
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
import { slashCommand, suggestionItems } from "./slash-command"
import { Video } from "./video"
import { Image } from "./image"
import NodeSelector from "./node-selector"
import { LinkSelector } from "./link-selector"
import { ColorSelector } from "./color-selector"
import { ErrorMessage } from "@hookform/error-message"
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
                                limit: max,
                            }),
                            Placeholder.configure({
                                placeholder: "Type / to insert element...",
                            }),
                            Video,
                            Image,
                        ]}
                    >
                        <EditorCommand className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
                            <EditorCommandEmpty className="px-2 text-muted-foreground">
                                No results
                            </EditorCommandEmpty>
                            {suggestionItems.map((i: any) => (
                                <EditorCommandItem
                                    key={i.title}
                                    value={i.title}
                                    onCommand={(val) => i.command(val)}
                                    className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                                        {i.icon}
                                    </div>
                                    <div>
                                        <p className="font-medium">{i.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {i.description}
                                        </p>
                                    </div>
                                </EditorCommandItem>
                            ))}
                            <EditorBubble
                                tippyOptions={{
                                    placement: "top",
                                }}
                                className="flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-themeBlack text-themeTextGray shadow-xl"
                            >
                                <NodeSelector
                                    open={openNode}
                                    onOpenChange={setOpenNode}
                                />
                                <LinkSelector
                                    open={openLink}
                                    onOpenChange={setOpenLink}
                                />
                                <ColorSelector
                                    open={openColor}
                                    onOpenChange={setOpenColor}
                                />
                            </EditorBubble>
                        </EditorCommand>
                    </EditorContent>
                    {inline ? (
                        onEdit && (
                            <div className="flex justify-between py-2">
                                <p
                                    className={cn(
                                        "text-xs",
                                        characters &&
                                            (characters < min ||
                                                characters > max) &&
                                            "text-red-500",
                                    )}
                                >
                                    {characters || 0} / {max}
                                </p>
                                <ErrorMessage
                                    errors={errors}
                                    name={name}
                                    render={({ message }) => (
                                        <p className="text-red-400 mt-2">
                                            {message === "Required"
                                                ? ""
                                                : message}
                                        </p>
                                    )}
                                />
                            </div>
                        )
                    ) : (
                        <div className="flex justify-between py-2">
                            <p
                                className={cn(
                                    "text-xs",
                                    characters &&
                                        (characters < min ||
                                            characters > max) &&
                                        "text-red-500",
                                )}
                            >
                                {characters || 0} / {max}
                            </p>
                            <ErrorMessage
                                errors={errors}
                                name={name}
                                render={({ message }) => (
                                    <p className="text-red-400 mt-2">
                                        {message === "Required" ? "" : message}
                                    </p>
                                )}
                            />
                        </div>
                    )}
                </EditorRoot>
            )}
        </div>
    )
}

export default BlockTextEditor
