import { getAccessToken } from 'zmp-sdk'

type RequestOptions = RequestInit & {
  withAuth?: boolean
  baseUrl?: string
}

const API_URL = import.meta.env.VITE_API_URL || ''

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { withAuth = false, baseUrl = API_URL, headers, ...restOptions } = options
  const url = `${baseUrl}${path}`

  const requestHeaders = new Headers(headers)
  if (withAuth) {
    requestHeaders.set('Authorization', `Bearer ${await getAccessToken()}`)
  }

  const response = await fetch(url, {
    ...restOptions,
    headers: requestHeaders,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}
