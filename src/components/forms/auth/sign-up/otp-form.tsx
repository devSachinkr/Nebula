import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp"
import React from "react"

type Props = {
    otp: string
    setOtp: React.Dispatch<React.SetStateAction<string>>
}

const OTPInput = ({ otp, setOtp }: Props) => {
    return (
        <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
            <div className="flex gap-3">
                <div>
                    <InputOTPSlot index={0}></InputOTPSlot>
                </div>
                <div>
                    <InputOTPSlot index={1}></InputOTPSlot>
                </div>
                <div>
                    <InputOTPSlot index={2}></InputOTPSlot>
                </div>
                <div>
                    <InputOTPSlot index={3}></InputOTPSlot>
                </div>
                <div>
                    <InputOTPSlot index={4}></InputOTPSlot>
                </div>
                <div>
                    <InputOTPSlot index={5}></InputOTPSlot>
                </div>
            </div>
        </InputOTP>
    )
}

export default OTPInput
