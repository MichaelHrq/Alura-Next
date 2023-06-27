import nookies from "nookies"

export const TokenService = {
  set(accessToken, ctx = null) {
    nookies.set(ctx, "ACCESS_TOKEN_KEY", accessToken, {
      maxAge: 60 * 60 * 24,
      path: "/",
    })
  },

  get(ctx = null) {
    const cookie = nookies.get(ctx)
    return cookie["ACCESS_TOKEN_KEY" || ""]
  },

  remove() {
    nookies.destroy(ctx, "ACCESS_TOKEN_KEY")
  },
}
