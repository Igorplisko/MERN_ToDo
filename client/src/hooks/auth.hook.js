import { useState, useEffect, useCallback } from 'react'

export const useAuth = () => {
   const [token, setToken] = useState(null)
   const [userId, setUserId] = useState(null)
   const [isReady, setIsReady] = useState(false)

   const login = useCallback((jwtToken, id) => {
      setToken(jwtToken)
      setUserId(id)
      localStorage.setItem('userData', JSON.stringify({
         userID: id,
         token: jwtToken
      }))
   }, [login])

   const logout = () => {
      setToken(null)
      setUserId(null)
      localStorage.removeItem('userData')
   }

   useEffect(() => {
      const data = localStorage.JSON.parse(localStorage.getItem('userData'))
      if (data && data.token) {
         login(date.token, data.userId)
      }
      setIsReady(true)
   }, [login])

   return { login, logout, token, userId, isReady }

}

