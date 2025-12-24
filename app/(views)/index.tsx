import { ScrollView, View, Pressable, Image, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
import ThemedText from "@/components/themed-text"
import useJewelry from "@/hooks/use-jewelry-count"

const jewelryTypes = [
    { key: "ring", label: "Кольца" },
    { key: "earring", label: "Серьги" },
    { key: "necklace", label: "Ожерелья" },
    { key: "bracelet", label: "Браслеты" },
]

const metal: Record<string, string> = {
  platinum: 'Платина',
  palladium: 'Палладий',
  'white gold': 'Белое золото',
  'yellow gold': 'Желтое золото',
  'rose gold': 'Розовое золото',
  'sterling silver': 'Серебро',
  'stainless steel': 'Нержавеющая сталь'
}

export default function HomeScreen() {
    const { count, availability, error } = useJewelry()
    const [jewelryType, setJewelryType] = useState("ring")
    const totalQuantity = count.find(item => item.category === jewelryType)?.total || 0
    const stockQuantity = count.find(item => item.category === jewelryType)?.stock || 0
    const showcaseQuantity = count.find(item => item.category === jewelryType)?.showcase || 0
    const category = Object.fromEntries(jewelryTypes.map(item => [item.key, item.label]))

    return (
        <SafeAreaView style={ styles.container }>
            <ScrollView showsVerticalScrollIndicator={ false }>
                <View style={ styles.productQuantityContainer }>
                    <ThemedText type="title" style={ styles.titleText }>Количество изделий</ThemedText>

                    <View style={ styles.toggleButonContainer }>
                        { jewelryTypes.map((item) => (
                            <Pressable 
                                key={ item.key }
                                style={[
                                    styles.toggleButton,
                                    jewelryType === item.key ? styles.toggleActive : undefined
                                ]}
                                onPress={ () => setJewelryType(item.key) }
                            >
                                <ThemedText style={ jewelryType === item.key ? styles.toggleActiveText : undefined }>
                                    { item.label }
                                </ThemedText>
                            </Pressable>
                        ))}
                    </View>

                    <View style={ styles.productQuantityContent }>
                        <View style={ styles.card }>
                            <Image source={ require("../../assets/images/box.png") } />
                            <ThemedText style={ styles.quantityText }>Всего: { totalQuantity }</ThemedText>
                        </View>
                        <View style={ styles.card }>
                            <Image source={ require("../../assets/images/shopping-bag.png") } />
                            <ThemedText style={ styles.quantityText }>На ветрине: { stockQuantity  }</ThemedText>
                        </View>
                        <View style={ styles.card }>
                            <Image source={ require("../../assets/images/warehouse.png") } />
                            <ThemedText style={ styles.quantityText }>На складе: { showcaseQuantity }</ThemedText>
                        </View>
                    </View>
                </View>

                <View style={ styles.numberOfProduct }>
                    <ThemedText type="title" style={ styles.titleText }>Количество наименований</ThemedText>

                        <View style={ styles.numberOfProductLine }>
                            <ThemedText style={ styles.lineText }>Категория</ThemedText>

                            <View style={ styles.lineGroup }>
                                <ThemedText style={ styles.lineText }>Метал</ThemedText>
                                <ThemedText style={ styles.lineText }>В наличии</ThemedText>
                            </View>
                        </View>
                        <View style={ styles.numberOfProductWrapper }>
                            { availability.map((item, index) => {
                                const isFirstInCategory = index === 0 || availability[index - 1].category !== item.category

                                return (
                                    <View key={`${item.category}-${item.metal}`} style={ styles.numberOfProductLine }>
                                        { isFirstInCategory ? (
                                            <ThemedText style={ styles.categoryColumn }>{ category[item.category] }</ThemedText>
                                        ) : (
                                            <ThemedText></ThemedText>
                                        ) }
                                    <View style={ styles.lineGroupValue }>
                                        <ThemedText>{ metal[item.metal] }</ThemedText>
                                        <ThemedText>{ item.exists ? "Да" : "Нет" }</ThemedText>
                                    </View>
                                </View>
                            )
                        }) }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E3E1E6",
        padding: 20,
    },
    productQuantityContainer: {
        marginBottom: 30,
    },
    titleText: {
        textAlign: "left"
    },
    toggleButonContainer: {
        paddingBottom: 10,
        display: "flex",
        flexDirection: "row",
    },
    toggleButton: {
        padding: 10,
        alignSelf: "flex-start",
        borderRadius: 8,
    },
    toggleActive: {
        backgroundColor: "#000",
    },
    toggleActiveText: {
        color: "#fff"
    },
    productQuantityContent: {
        padding: 15,
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: "#fff",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#444444",
        rowGap: 15,
    },
    quantityText: {
        fontSize: 24,
        fontWeight: "400",
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    numberOfProduct:{
    },
    numberOfProductWrapper: {
        marginTop: 10,
    },
    numberOfProductLine: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    lineGroup: {
        flexDirection: "row",
        gap: 60,
    },
    lineText: {
        fontWeight: "600"
    },
    categoryColumn: {
    },
    lineGroupValue: {
        flexDirection: "row",
        gap: 60,
    }
})
