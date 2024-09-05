import { CreditCard, Explore, Home } from "@/icons"

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
