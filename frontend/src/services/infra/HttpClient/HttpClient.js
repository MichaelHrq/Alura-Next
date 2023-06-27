export const HttpClient = async (url, config) => {
  return fetch(url, {
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    body: config.body ? JSON.stringify(config.body) : null,
  }).then(async (response) => {
    return {
      ok: response.ok,
      body: await response.json(),
    }
  })
}
