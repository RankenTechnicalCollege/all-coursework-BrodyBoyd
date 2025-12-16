import { createAuthClient } from "better-auth/react"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/"
// https://issuetracker-service-627308096057.us-central1.run.app/
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: API_BASE_URL,
    redirect: true,

    
})

export const { signIn, signOut, useSession } = authClient;
