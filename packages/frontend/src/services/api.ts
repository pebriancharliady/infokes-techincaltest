const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

interface RequestOptions extends RequestInit {
    params?: Record<string, string>
}

class ApiError extends Error {
    constructor(
        public status: number,
        public statusText: string,
        message?: string
    ) {
        super(message || `Error: ${status} ${statusText}`)
        this.name = 'ApiError'
    }
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, ...fetchOptions } = options

    let url = `${API_BASE_URL}${endpoint}`

    if (params) {
        const searchParams = new URLSearchParams(params)
        url += `?${searchParams.toString()}`
    }

    const response = await fetch(url, {
        ...fetchOptions,
        headers: {
            'Content-Type': 'application/json',
            ...fetchOptions.headers,
        },
    })

    if (!response.ok) {
        throw new ApiError(response.status, response.statusText)
    }

    return response.json()
}

export const api = {
    get: <T>(endpoint: string, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'GET' }),

    post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
        request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined
        }),

    put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
        request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined
        }),

    delete: <T>(endpoint: string, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'DELETE' }),
}

export { ApiError }
