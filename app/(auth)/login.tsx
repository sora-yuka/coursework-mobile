import { useRouter } from "expo-router"
import * as SecureStore from "expo-secure-store"
import React, { useState } from "react"
import { KeyboardAvoidingView, StyleSheet, View } from "react-native"
import ThemedText from "@/components/themed-text"
import ThemedButton from "@/components/ui/button"
import ThemedTextInput from "@components/themed-text-input"
import { showToast } from "@components/toast"
import api from "@script/api"

export default function LoginScreen() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        if (!email || !password) {
            showToast.error("Missing fields", "Please enter both email and password")
            return
        }

        setLoading(true)
        try {
            const data = await api.post("/api/v1/users/login/", { email, password })
            if (rememberMe) {
                await SecureStore.setItemAsync("userEmail", email)
                await SecureStore.setItemAsync("userPassword", password)
                await SecureStore.setItemAsync("rememberMe", "true")
            } else {
                await SecureStore.deleteItemAsync("userEmail")
                await SecureStore.deleteItemAsync("userPassword")
                await SecureStore.deleteItemAsync("rememberMe")
            }
            showToast.success("Login success", "You are good now")
            router.replace("/(views)")
        } catch(error: any) {
            if (error.status === 401) {
                showToast.error("Loding failed", "Invalid email or password")
                return
            }
            showToast.error("Login failed", "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView
            style={ styles.container }
        >
            <View style={ styles.content }>
                <ThemedText type="title">Welcome Back</ThemedText>

                <View style={ styles.fieldContainer}>
                    <ThemedText type="hint">Email Address</ThemedText>
                    <ThemedTextInput 
                        placeholder="diveysh.b@gmail.com"
                        value={ email }
                        onChangeText={ setEmail }
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={ styles.fieldContainer }>
                    <ThemedText type="hint">Password</ThemedText>
                    <ThemedTextInput 
                        placeholder="******"
                        value={ password }
                        onChangeText={ setPassword }
                        secureTextEntry
                        autoCapitalize="none"
                    />
                </View>

                <ThemedButton 
                    title={ loading ? "Signing in..." : "Sign In" }
                    onPress={ handleLogin }
                    disabled={ loading }
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    fieldContainer: {
        rowGap: 8,
    },
})
