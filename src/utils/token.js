export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", typeof token === "string" ? token : "");
}

export function clearToken() {
  localStorage.setItem("token", "");
}
