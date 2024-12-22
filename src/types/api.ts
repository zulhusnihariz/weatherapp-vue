export type ApiResponse<T> = {
  data: T
  error?: Error
}

export interface OpenWeatherQuery {
  id?: string
  lat?: number
  lon?: number
  q?: string
  units?: 'standard' | 'metric' | 'imperial'
  lang?: string
  cnt?: number
  mode?: 'json' | 'xml'
}
