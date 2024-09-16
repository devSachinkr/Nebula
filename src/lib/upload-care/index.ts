import { UploadClient } from "@uploadcare/upload-client"

export const createUploadClient = async (): Promise<UploadClient> => {
    if (!process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY) {
        throw new Error("NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY is not defined")
    }
    return new UploadClient({ publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY })
}
