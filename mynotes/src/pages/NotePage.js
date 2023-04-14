import React,{useState,useEffect} from 'react'
// import notes from '../assets/data'
import { useParams,Link,useNavigate } from 'react-router-dom'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

export const NotePage = (history) => {
   const navigate = useNavigate();
    let noteId = useParams()
    let [note,setNote] = useState(null) 
    //  let note_Id = notes.find(note => note.id ===Number( noteId.id))
       useEffect(()=>{
      getNotes()

    },[noteId.id])

    let getNotes = async ()=>{
      
    if(noteId.id === "new"){return}   
    let response = await fetch(`http://localhost:8000/notes/${noteId.id}`)
   
    let data = await response.json()
    setNote(data)


    }


   let updateNote = async ()=>{

    await fetch(`http://localhost:8000/notes/${noteId.id}`,{
                 method:'PUT',
                 headers:{
                   'Content-type': 'application/json'


                 },
                 body: JSON.stringify({...note,'update':new Date()})
       


    })
   

   }


   let createNote = async ()=>{

    await fetch(`http://localhost:8000/notes/`,{
                 method:'POST',
                 headers:{
                   'Content-type': 'application/json'


                 },
                 body: JSON.stringify({...note,'updated':new Date()})
       


    })
   

   }
  
  
    let handelSubmit = () =>{
   
    if(noteId.id !== 'new' && !note.body){

      deleteNote()

    } else if(noteId.id !='new'){
      updateNote()

    } else if(noteId.id ==='new' && note !== null){

     createNote()
    }
 
    navigate('/');

    }


   let deleteNote = async ()=>{
    
    await fetch(`http://localhost:8000/notes/${noteId.id}`,{
                 method:'DELETE',
                 headers:{
                   'Content-type': 'application/json'


                 },
                 body: JSON.stringify(note)
       


    })
    navigate('/');
   
   }

  return (
    <div className='note'>
    <div className='note-header'>
    <h3>
     <Link to ='/'>
      <ArrowLeft onClick={handelSubmit}/>
     </Link>

    </h3>
     {noteId.id !=='new' ?(
        <button onClick={deleteNote}>Delete</button>
     ):(
      <button onClick={handelSubmit}>Done</button>
    
     )}
    
    </div>
   <textarea onChange={(e)=>{setNote({...note,'body':e.target.value})}} value = {note?.body}>


   </textarea>

    </div>
  )
}
