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

export default function useJewelry() {
    const [count, setCount] = useState<jewelryType[]>([])
    const [availability, setAvailability] = useState<availabilityType[]>([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const [countResponse, availabilityResponse] = await Promise.all([
                api.get("/api/v1/jewelry/count-by-type"),
                api.get("/api/v1/jewelry/availability"),
            ])
            setCount(countResponse)
            setAvailability(availabilityResponse)
        }
        
        fetchData()
    }, [])

    return { count, availability, error }
}
