import Cookies from 'js-cookie'
import defaultSettings from '@/settings'

const TokenKey = defaultSettings.tokenKey
const storage = defaultSettings.storage

export function getToken() {
  if (storage === 'localStorage') {
    return localStorage.getItem(TokenKey)
  } else if (storage === 'sessionStorage') {
    return sessionStorage.getItem(TokenKey)
  } else if (storage === 'cookie') {
    return Cookies.get(TokenKey)
  }
}

export function setToken(token) {
  if (storage === 'localStorage') {
    return localStorage.setItem(TokenKey, token)
  } else if (storage === 'sessionStorage') {
    return sessionStorage.setItem(TokenKey, token)
  } else if (storage === 'cookie') {
    return Cookies.set(TokenKey, token)
  }
}

export function removeToken() {
  if (storage === 'localStorage') {
    return localStorage.removeItem(TokenKey)
  } else if (storage === 'sessionStorage') {
    return sessionStorage.clear()
  } else if (storage === 'cookie') {
    return Cookies.remove(TokenKey)
  }
}

