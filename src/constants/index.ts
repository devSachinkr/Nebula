import { AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from "./forms"
import { LANDING_PAGE_MENU, MENU_PROPS } from "./menu"
import { CREATE_GROUP_PLACEHOLDER, groupPlaceHolderProps } from "./placeholder"
import { GROUP_LIST, GroupListProps } from "./slider"

type NexusConstants = {
    landingPageMenu: MENU_PROPS[]
    signInForm: AuthFormProps[]
    signUpForm: AuthFormProps[]
    createGroupPlaceHolder:groupPlaceHolderProps[]
    groupList:GroupListProps[]
}
export const NEXUS_CONSTANTS: NexusConstants = {
    landingPageMenu: LANDING_PAGE_MENU,
    signUpForm: SIGN_UP_FORM,
    signInForm: SIGN_IN_FORM,
    createGroupPlaceHolder: CREATE_GROUP_PLACEHOLDER,
    groupList: GROUP_LIST,
}
