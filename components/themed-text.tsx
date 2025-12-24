import { StyleSheet, Text, type TextProps } from "react-native"

export type ThemedTextProps = TextProps & {
    type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link" | "hint"
}

export default function ThemedText({ style, type = "default", ...rest }: ThemedTextProps) {
    return (
        <Text
            style={[
                // { color }
                type === "default" ? styles.default : undefined,
                type === "title" ? styles.title : undefined,
                type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
                type === "subtitle" ? styles.subtitle : undefined,
                type === "link" ? styles.link : undefined,
                type === "hint" ? styles.hint : undefined,
                style,
            ]}
            { ...rest }
        />
    )
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
    },
    defaultSemiBold: {
        fontSize: 16,
        fontWeight: "600",
    },
    title: {
        color: "#000000",
        fontSize: 32,
        fontWeight: "bold",
        lineHeight: 32,
        paddingBottom: 30,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        color: "#333333",
        fontWeight: "normal",
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        // color: ""
    },
    hint: {
        fontSize: 14,
        fontWeight: "500"
    }
})
