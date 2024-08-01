import { useState } from "react"
import { useProgressesContext } from '../hooks/useProgressesContext'


const ProgressForm = ()=>{
  const{dispatch} = useProgressesContext()

  const[title,setTitle] = useState('')
  const[hrs,setHrs] = useState('')
  const[discription,setDiscription] = useState('')
  const[error,setError] = useState(null)
  const[emptyFields,setEmptyFields] = useState([])

  const handleSubmit = async (e)=>{
    e.preventDefault()

    const progress = {title,hrs,discription}

    const response = await fetch("/api/progress",{
      method:'POST',
      body:JSON.stringify(progress),
      headers : {
        'Content-Type':'application/json'
      }
    })
    const json = await response.json()

    if(!response.ok){
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if(response.ok){
      setTitle('')
      setHrs('')
      setDiscription('')
      setError(null)
      console.log('new Progress added',json)
      dispatch({type:'CREATE_PROGRESS', payload:json})
    }
  }

  return(
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Progress</h3>
      <label>Progress On:</label>
      <input 
        type="text"
        onChange={(e)=> setTitle(e.target.value)}
        value = {title} 
        className={emptyFields.includes('title')?'error':''}
      />
      <label>Minuties Progressed:</label>
      <input 
        type="number"
        onChange={(e)=> setHrs(e.target.value)}
        value = {hrs} 
        className={emptyFields.includes('hrs')?'error':''}
      />
      <label>Discription:</label>
      <textarea 
        type="text"
        onChange={(e)=> setDiscription(e.target.value)}
        value = {discription} 
        className={emptyFields.includes('discription')?'error':''}
      />
      <button>Add Progress</button>
      {error && <div className="error">{error}</div> }
    </form>
  )
}

export default ProgressForm