import { Stack } from "expo-router"
import Toast from "react-native-toast-message"
import { toastConfig } from '../components/toast'

export default function RootLayout() {
    return (
        <>
            <Stack screenOptions={{ headerShown: false }} />
            <Toast config={toastConfig} />
        </>
    )
}
