import axios from "axios"

// Função para requisições na API
export const http = axios.create({
    baseURL: "https://brasilapp.vercel.app/api",
})