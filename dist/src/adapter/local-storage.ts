
function setItem<T>(key: string, data: T): void {
  if (typeof data === 'object') {
    localStorage.setItem(key, JSON.stringify(data))
  } else {
    localStorage.setItem(key, `${data}`)
  }
}

function getItem<T>(key: string): T | null {
  const data = localStorage.getItem(key)

  if (data === null) {
    return null
  }

  try {
    return JSON.parse(data)
  } catch {
    return data as T
  }
}

export default {
  setItem,
  getItem,
}



