let token = null
try { token = localStorage.getItem('cp_token') } catch {}

export const setToken = (t) => {
  token = t
  try { t ? localStorage.setItem('cp_token', t) : localStorage.removeItem('cp_token') } catch {}
}
export const hasToken = () => !!token

export async function api(path, { method = 'GET', body, params } = {}) {
  const qs = params ? '?' + new URLSearchParams(Object.entries(params).filter(([, v]) => v !== '' && v != null && v !== false)) : ''
  let res
  try {
    res = await fetch('/api' + path + qs, {
      method,
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new Error('No internet or server is busy. Please try again.')
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const d = data.detail
    throw new Error(typeof d === 'string' ? d : 'Something went wrong. Please try again.')
  }
  return data
}
