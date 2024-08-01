import { ProgressesContext } from "../context/ProgressContext";
import { useContext } from "react";

export const useProgressesContext =()=>{
  const context = useContext(ProgressesContext)

  if(!context){
    throw Error('useProgressContext must be used inside an ProgressContextProvider')
  }

  return context
}