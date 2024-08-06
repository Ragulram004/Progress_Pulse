import { useAuthContext } from "./useAuthContext"

export const useLogout = ()=>{
  const {dispatch} = useAuthContext()

  const logout = ()=>{
    //remover user from local storage
    localStorage.removeItem('user')
    // dispath logout
    dispatch({type : 'LOGOUT'})
  }
  return {logout}
}