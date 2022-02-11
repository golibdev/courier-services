export const isAuthentification = (token) => {
   if (!token) {
      return false
   }
}

export const logout = () => {
   localStorage.clear()
}