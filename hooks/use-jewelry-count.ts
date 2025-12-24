import { useState, useEffect } from "react"
import api from "@script/api"

type jewelryType = {
    category: string,
    total: number,
    showcase: number,
    stock: number,
}

type availabilityType = {
    category: string,
    metal: string,
    exists: boolean,
}

type price = {
    totalPrice: number,
}

export default function useJewelry() {
    const [count, setCount] = useState<jewelryType[]>([])
    const [availability, setAvailability] = useState<availabilityType[]>([])
    const [price, setPrice] = useState<price>()

    useEffect(() => {
        const fetchData = async () => {
            const [countResponse, availabilityResponse, priceResponse] = await Promise.all([
                api.get("/api/v1/jewelry/count-by-type"),
                api.get("/api/v1/jewelry/availability"),
                api.get("/api/v1/jewelry/total-price")
            ])
            setCount(countResponse)
            setAvailability(availabilityResponse)
            setPrice({ totalPrice: priceResponse.total_price })
        }
        
        fetchData()
    }, [])

    return { count, availability, price }
}
