class API {
    static baseUrl = process.env.EXPO_PUBLIC_BASE_URL //! IMPORTANT - ENV VARIABLE MUST START WITH EXPO_PUBLIC_*

    async request(endpoint, options = {}) {
        const url = `${API.baseUrl}${endpoint}`

        const config = {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        }

        try {
            const response = await fetch(url, config)
            const data = await response.json()

            if (!response.ok) {
                throw {
                    status: response.status,
                    message: data.message || "Request failed",
                    data: data,
                }
            }

            return data
        } catch (error) {
            if (!error.status) {
                throw {
                    status: 0,
                    message: "Network error",
                    data: null
                }
            }
            throw error
        }
    }

    get(endpoint, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: "GET"
        })
    }

    post(endpoint, body, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: "POST",
            body: JSON.stringify(body),
        })
    }

    put(endpoint, body, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: "PUT",
            body: JSON.stringify(body),
        })
    }

    delete(endpoint, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: "DELETE",
        })
    }
}

const api = new API()

export default api
