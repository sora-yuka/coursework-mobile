import {
    Pressable,
    StyleSheet,
    Text,
    type PressableProps
} from "react-native"

export type ThemedButtonProps = PressableProps & {
    title: string,
    type?: "primary" | "secondary" | "toggle"
}

export default function ThemedButton({ 
    title, type = "primary", ...rest 
}: ThemedButtonProps) {
    return (
        <Pressable
            style={[
                type === "primary" ? styles.primary : undefined,
                type === "secondary" ? styles.secondary : undefined,
            ]}
            { ...rest }
        >
            <Text style={[ 
                type === "primary" ? styles.textPrimary : undefined,
                type === "secondary" ? styles.textSecondary : undefined,
            ]}>
                { title }
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    primary: {
        padding: 16,
        marginTop: 8,
        backgroundColor: "#202020",
        borderRadius: 12,
        alignItems: "center",
    },
    secondary: {
    },
    textPrimary: {
        color: "#fff",
        fontWeight: "500",
    },
    textSecondary: {
    },
})
