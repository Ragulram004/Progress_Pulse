import { useAuthContext } from "./useAuthContext"
import { useProgressesContext } from "./useProgressesContext"

export const useLogout = ()=>{
  const {dispatch} = useAuthContext()
  const {dispatch : progressDispatch} = useProgressesContext()

  const logout = ()=>{
    //remover user from local storage
    localStorage.removeItem('user')
    // dispath logout
    dispatch({type : 'LOGOUT'})
    progressDispatch({type:'SET_PROGRESSES' , payload:null})
  }
  return {logout}
}