import React from 'react'
import { useProgressesContext } from '../hooks/useProgressesContext'
import { useAuthContext } from '../hooks/useAuthContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ProgressDetails = ({progress})=>{
  const {dispatch} = useProgressesContext()
  const {user} = useAuthContext() 

  const handleClick = async ()=>{

    if(!user){
      return
    }

    const response = await fetch('/api/progress/'+ progress._id,{
      method : 'DELETE',
      headers : {
        'Authorization' : `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if(response.ok){
      dispatch({type:'DELETE_PROGRESS',payload:json})
    }
  }

  return (
    <div className='progress-details'>
      <h4>{progress.title}</h4>
      <p><strong>Minutes: </strong>{progress.hrs}</p>
      <p><strong>Discription: </strong>{progress.discription}</p>
      <p>{formatDistanceToNow(new Date(progress.createdAt),{addSuffix:true})}</p>
      <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
  )
}


export default ProgressDetails