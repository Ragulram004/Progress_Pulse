import { createContext, useReducer } from "react";

export const ProgressesContext = createContext()

export const progressesReducer = (state,action)=>{
  switch(action.type){
    case 'SET_PROGRESSES':
      return{
        progresses :action.payload
      }
    case 'CREATE_PROGRESS':
      return{
        progresses:[action.payload, ...state.progresses ]
      }
    case 'DELETE_PROGRESS':
      return{
        progresses : state.progresses.filter((p)=>p._id  !== action.payload._id)
      }
    default:
      return state
  }
}

export const ProgressesContextProvider = ({children})=>{
  const[state,dispatch] = useReducer(progressesReducer,{
    progresses:null
  })

  return(
    <ProgressesContext.Provider value={{...state,dispatch}}>
      {children}
    </ProgressesContext.Provider>
  )
}