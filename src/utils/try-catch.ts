import type { ApiResponse } from '@/types/api'

export async function tryCatch<T>(apicall: () => Promise<T>): Promise<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    data: undefined,
    error: undefined,
  }

  try {
    response.data = await apicall()
  } catch (e) {
    const error = e as Error
    response.error = new Error(error.message)
  }

  return response
}