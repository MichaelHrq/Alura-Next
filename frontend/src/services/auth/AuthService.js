import { HttpClient } from "../infra/HttpClient/HttpClient"
import { TokenService } from "./TokenService"

const url = process.env.NEXT_PUBLIC_BACKEND_URL

export const authService = {
  async login({ username, password }) {
    HttpClient(url + "/login", {
      method: "POST",
      body: { username, password },
    }).then(async (response) => {
      if (!response.ok) throw new Error("Usuário ou senha inválidos!")
      const body = response.body
      TokenService.set(body.data.access_token)
    })
  },

  async getSession(ctx = null) {
    const token = TokenService.get(ctx)
    return HttpClient(url + "/session", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      if (!response.ok) throw new Error("Não Autorizado")
      return response.body.data
    })
  },
  
}
