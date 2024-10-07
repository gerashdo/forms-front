

export const getEnvVariables = (): {
  VITE_API_BACKEND_URL: string;
} => {
  return {
    VITE_API_BACKEND_URL: import.meta.env.VITE_API_BACKEND_URL
  }
}
