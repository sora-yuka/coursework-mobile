import { SuccessToast, ErrorToast } from "react-native-toast-message"
import Toast from "react-native-toast-message"

const commonTextStyle = {
    text1Style: { fontSize: 16 },
    text2Style: { fontSize: 13, fontWeight: "400" },
}

export const toastConfig = {
    success: (props: any) => <SuccessToast { ...props } { ...commonTextStyle } />,
    error: (props: any) => <ErrorToast { ...props } { ...commonTextStyle } />,
}

export const showToast = {
    success: (title: string, message: string) => {
        Toast.show({
            type: "success",
            text1: title,
            text2: message,
        })
    },
    error: (title: string, message: string) => {
        Toast.show({
            type: "error",
            text1: title,
            text2: message,
        })
    }
}
