import { usePathname } from "next/navigation"
import { useState } from "react"

const useNavbar = () => {
    const pathName = usePathname()
    const [section, setSection] = useState<string>(pathName)
    const onSetSection = (currPage: string) => {
        setSection(currPage)
    }
    return { section, onSetSection }
}
export { useNavbar }
