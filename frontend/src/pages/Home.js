import React from 'react'
import { useEffect } from 'react'
import ProgressDetails from '../components/ProgressDetails'
import ProgressForm from '../components/ProgressForm'
import { useProgressesContext } from '../hooks/useProgressesContext'
import {useAuthContext} from '../hooks/useAuthContext'

function Home() {

  const {progresses,dispatch} = useProgressesContext()
  const {user} = useAuthContext()

  useEffect(()=>{
    const fetchProgresses = async ()=> {
      const response = await fetch('/api/progress',{
        headers :{
          'Authorization' : `Bearer ${user.token}`
        }
      })
      try{
        const json = await response.json()
        
        if(response.ok){
          dispatch({type:'SET_PROGRESSES' ,payload:json})
        }else{
          console.error('Request failed:',response.statusText);
        }
      }catch (error){
        console.error('Fetch error:', error);
      }
    }
    if(user){
      fetchProgresses()
    }
  },[dispatch,user])
  return (
    <div className='home flex'>
      <div>
        <ProgressForm/>
      </div>
      <div className="progresses">
        {progresses && progresses.map((progress)=>(
          <ProgressDetails key={progress._id} progress={progress}/>
        ))}
      </div>
    </div>
  )
}

export default Home
