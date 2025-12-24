import { StyleSheet, TextInput, type TextInputProps } from "react-native"

export type ThemedTextInputProps = TextInputProps & {
    type?: "default" | "search"
}

export default function ThemedTextInput({ style, type = "default", ...rest }: ThemedTextInputProps) {
    return (
        <TextInput 
            style={[
                type === "default" ? styles.default : undefined,
                type === "search" ? styles.search : undefined,
                style,
            ]}
            placeholderTextColor="#333333"
            { ...rest }
        />
    )
}


const styles = StyleSheet.create({
    default: {
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#eeeeee",
    },
    search: {

    }
})
