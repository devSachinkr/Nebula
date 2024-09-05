import {
    Chat,
    Courses,
    Document,
    Grid,
    Heart,
    MegaPhone,
    WhiteLabel,
} from "@/icons"

export type groupPlaceHolderProps = {
    id: string
    label: string
    icon: React.ReactNode
}

export const CREATE_GROUP_PLACEHOLDER: groupPlaceHolderProps[] = [
    {
        id: "0",
        label: "Highly engaging",
        icon: <MegaPhone />,
    },
    {
        id: "1",
        label: "Easy to setup",
        icon: <Heart />,
    },
    {
        id: "2",
        label: "Group chat and post",
        icon: <Chat />,
    },
    {
        id: "4",
        label: "Gamification",
        icon: <Document />,
    },
    {
        id: "3",
        label: "Students can create teams within Groups",
        icon: <Grid />,
    },
    {
        id: "6",
        label: "white-labeling options",
        icon: <WhiteLabel />,
    },
    {
        id: "7",
        label: "Host unlimited courses",
        icon: <Courses />,
    },
]
