import { Card } from "@/components/ui/card"
import { truncateString } from "@/lib/utils"
import Link from "next/link"
import React from "react"

type Props = {
    id: string
    createdAt: Date
    userId: string
    category: string
    desc: string | null
    privacy: "PUBLIC" | "PRIVATE"
    thumbnail: string | null
    name: string
    previewThumbnail?: string
}

const GroupCard = ({
    id,
    createdAt,
    userId,
    category,
    desc,
    privacy,
    thumbnail,
    name,
    previewThumbnail,
}: Props) => {
    return (
        <Link href={`/about/${id}`}>
            <Card className="bg-themeBlack border-themeGray rounded-xl overflow-hidden">
                <img
                    src={
                        previewThumbnail || `https://ucarecdn.com/${thumbnail}`
                    }
                    alt="thumbnail"
                    className="w-full opacity-70 h-40"
                />
                <div className="p-6">
                    <h3 className="text-lg text-themeTextGray font-bold ">
                        {name}
                    </h3>
                    <p className="text-base text-themeTextGray">
                        {desc && truncateString(desc)}
                    </p>
                </div>
            </Card>
        </Link>
    )
}

export default GroupCard
