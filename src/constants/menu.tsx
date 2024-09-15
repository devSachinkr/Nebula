import {
    AffiliateDuoToneBlack,
    CreditCard,
    Explore,
    GlobeDuoToneBlack,
    Home,
    IDuotoneBlack,
    ZapDouToneBlack,
} from "@/icons"
import { v4 } from "uuid"

export type MENU_PROPS = {
    id: number
    name: string
    icon: JSX.Element
    path: string
    section?: boolean
    integrations?: boolean
}
export const LANDING_PAGE_MENU: MENU_PROPS[] = [
    {
        id: 0,
        name: "Home",
        icon: <Home />,
        path: "/",
        section: true,
    },
    {
        id: 1,
        name: "Pricing",
        icon: <CreditCard />,
        path: "#pricing",
        section: true,
    },
    {
        id: 2,
        name: "Explore",
        icon: <Explore />,
        path: "/explore",
    },
]
type MenuProps = {
    id: string
    name: string
    path: string
    icon: JSX.Element
    section?: boolean
    integration?: boolean
}
export const SIDEBAR_SETTINGS_MENU: MenuProps[] = [
    {
        id: v4(),
        name: "General",
        path: "",
        icon: <IDuotoneBlack />,
    },
    {
        id: v4(),
        name: "Subscription",
        path: "subscription",
        icon: <CreditCard />,
    },
    {
        id: v4(),
        name: "Affiliates",
        path: "affiliates",
        icon: <AffiliateDuoToneBlack />,
    },
    {
        id: v4(),
        name: "Domain Config",
        path: "domains",
        icon: <GlobeDuoToneBlack />,
    },
    {
        id: v4(),
        name: "Integrations",
        path: "integrations",
        icon: <ZapDouToneBlack />,
    },
]

type ICON_PROPS = {
    icon: string
    id: string
}
export const ICON_LIST: ICON_PROPS[] = [
    {
        icon: "general",
        id: "0",
    },
    {
        icon: "announcement",
        id: "1",
    },
]
