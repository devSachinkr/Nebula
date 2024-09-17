'use client'
import React from "react"
import { UseFormRegister } from "react-hook-form"
import { z } from "zod"
import { groupSchema } from "./schema"
import { SwiperProps, SwiperSlide } from "swiper/react"
import Slider from "@/components/global/slider"
import { NEXUS_CONSTANTS } from "@/constants"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { GroupListItem } from "./group-list-item"
import "swiper/css/bundle"
type Props = {
    selected?: string | undefined
    register?: UseFormRegister<z.infer<typeof groupSchema> | any>
    label?: string
    overlay?: boolean
    route?: boolean
} & SwiperProps

const GroupList = ({
    label,
    register,
    selected,
    overlay,
    route,
    ...rest
}: Props) => {
    return (
        <Slider
        slidesPerView={"auto"}
        spaceBetween={10}
        loop
        freeMode
        label={label}
        overlay={overlay}
        {...rest}
        >
            {NEXUS_CONSTANTS.groupList.map((item, idx) => (
                <SwiperSlide key={idx} className="content-width-slide">
                    {!register ? (
                        route ? (
                            <Link href={`/explore/${item.path}`}>
                                <GroupListItem {...item} selected={selected} />
                            </Link>
                        ) : (
                            <GroupListItem {...item} />
                        )
                    ) : (
                        idx > 0 && (
                            <Label htmlFor={`item-${item.id}`}>
                                <span>
                                    <Input
                                        id={`item-${item.id}`}
                                        type="radio"
                                        className="hidden"
                                        value={item.path}
                                        {...register("category")}
                                    />
                                        <GroupListItem {...item} selected={selected} />
                                </span>
                            </Label>
                        )
                    )}
                </SwiperSlide>
            ))}
        </Slider>
    )
}

export default GroupList
