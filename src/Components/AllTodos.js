import React from 'react'
import {FaPen, FaTrashAlt, FaCheckCircle} from "react-icons/fa"
import { IconContext } from "react-icons";


function AllTodos( {allTodos, deleteTodo, editTodo, handleCompleted} ) {
    
  return (
    allTodos.map(myTodo => {
        const {id, title, body, isCompleted} = myTodo
        return (
            <article key={id} className="alltodos-container">
                <div 
                    className={'title-and-body-container title-and-body-container'+ (isCompleted ? "-completed" : "-primary" )} 
                    onClick={() => handleCompleted(id)}

                    title="Click/tap to set as 'Completed' & vice-versa"
                >
                    <p>
                        {title} <span className='span-tickmark'>{isCompleted ? <IconContext.Provider value={{ style: { verticalAlign: 'bottom', fontSize: '20px'} }}><FaCheckCircle /></IconContext.Provider> : ""}</span> 
                    </p>
                    <h5>{body}</h5>
                </div>                
                <div className='alltodos-btn-container'>
                    <button 
                        className='edit-btn'
                        type="button"
                        title='Edit' 
                        onClick={()=> editTodo(id)} 
                    >
                        <FaPen />
                    </button>
                    <button
                        className='delete-btn' 
                        type="button" 
                        title='Delete'
                        onClick={()=> deleteTodo(id)}>
                        <FaTrashAlt />
                    </button>
                </div>
            </article>
        )
      })  
  )
}

export default AllTodos