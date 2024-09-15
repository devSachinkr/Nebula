import React, { MutableRefObject } from "react"
import { IChannels } from "."
import DropDown from "../drop-down"
import IconRender from "../icon-renderer"
import { cn } from "@/lib/utils"
import { ICON_LIST } from "@/constants/menu"

type Props = {
    ref: MutableRefObject<HTMLButtonElement | null>
    page: string | undefined
    onSetIcon: ({ icon }: { icon: string | undefined }) => void
    channelId: string
    icon: string
    currentIcon: string | undefined
}

const IconDropdown = ({
    channelId,
    currentIcon,
    icon,
    onSetIcon,
    page,
    ref,
}: Props) => {
    return (
        <DropDown
            ref={ref}
            title="Choose Icon"
            trigger={
                <span>
                    <IconRender
                        icon={icon}
                        mode={page === channelId ? "LIGHT" : "DARK"}
                    />
                </span>
            }
        >
            <div id="icon-list" className="flex gap-x-2">
                {ICON_LIST.map(
                    (i) =>
                        i.icon !== icon && (
                            <span
                                key={i.id}
                                className={cn(
                                    currentIcon === i.icon
                                        ? "bg-themeGray"
                                        : "",
                                    "p-2 rounded-lg",
                                )}
                                onClick={() => onSetIcon({ icon: i.icon })}
                            >
                                <IconRender
                                    icon={i.icon}
                                    mode={page === channelId ? "LIGHT" : "DARK"}
                                />
                            </span>
                        ),
                )}
            </div>
        </DropDown>
    )
}

export default IconDropdown
