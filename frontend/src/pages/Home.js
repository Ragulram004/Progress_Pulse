import React from 'react'
import { useEffect } from 'react'
import ProgressDetails from '../components/ProgressDetails'
import ProgressForm from '../components/ProgressForm'
import { useProgressesContext } from '../hooks/useProgressesContext'

function Home() {

  const {progresses,dispatch} = useProgressesContext()

  useEffect(()=>{
    const fetchProgresses = async ()=> {
      const response = await fetch('/api/progress')
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
    fetchProgresses()
  },[dispatch])
  return (
    <div className='home'>
      <ProgressForm/>
      <div className="progresses">
        {progresses && progresses.map((progress)=>(
          <ProgressDetails key={progress._id} progress={progress}/>
        ))}
      </div>
    </div>
  )
}

export default Home
