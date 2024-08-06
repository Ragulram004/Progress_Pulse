import { useAuthContext } from "./useAuthContext"
import { useState } from "react"

export const useLogin = ()=>{

  const [error,setError] = useState('')
  const [isLoading, setIsLoading] = useState('')

  const {dispatch} = useAuthContext()

  const login = async(email,password) =>{
    setError(null)
    setIsLoading(true)
    
    const response = await fetch('/api/user/login',{
      method: 'POST',
      headers: {'Content-Type' : 'application/json'} ,
      body: JSON.stringify({email,password})
    })

    const json = await response.json()
    
    if(!response.ok){
      setIsLoading(false)
      setError(json.error)
    }
    if(response.ok){
      localStorage.setItem('user',JSON.stringify(json))
      dispatch({type:'LOGIN' , payload:json})
      setIsLoading(false)

    }
  }
  return{login,isLoading,error}
}