import React from "react";
import { nanoid } from "nanoid";
import AllTodos from "./Components/AllTodos";
import Notify from "./Components/Notify";
import {FaTrashAlt, FaExclamationTriangle, FaUndo, FaEdit} from "react-icons/fa"
import {MdLibraryAdd} from "react-icons/md"
import {ImCheckmark} from "react-icons/im"
import { Fragment } from 'react';
import { IconContext } from "react-icons";



function App() {
  
  const [todoTitle, setTodoTitle] = React.useState("")
  const [todoBody, setTodoBody] = React.useState("")
  const [allTodos, setAllTodos] = React.useState(JSON.parse(localStorage.getItem("ALLTODOS")) || []) 
  const [notify, setNotify] = React.useState({needed: false, notif:"", type:"" })
  const [wannaUpdate, setWannaUpdate] = React.useState(false)
  const [editId, setEditId] = React.useState(null)

  React.useEffect(() => {
    localStorage.setItem("ALLTODOS", JSON.stringify(allTodos))
  }, [allTodos])

  function showNotify(needed=false, notif="", type="") {
    setNotify({needed, notif, type})
  }

  function deleteAllTodos() {
    setAllTodos([])
    showNotify(true, <Fragment><IconContext.Provider value={{ style: { verticalAlign: 'bottom', fontSize: '20px'} }}><FaTrashAlt /></IconContext.Provider>&ensp;{"Deleted " + allTodos.length + " TODO"+ (allTodos.length>1 ? "S" : "") + " successfully"}</Fragment> , "danger")
  }

  function deleteTodo(id) {
    showNotify(true, <Fragment><IconContext.Provider value={{ style: { verticalAlign: 'bottom', fontSize: '20px'} }}><FaTrashAlt /></IconContext.Provider>&ensp;Deleted 1 TODO successfully</Fragment> , "danger")
    setAllTodos(allTodos => allTodos.filter(todo => todo.id !== id)) 
  }

  function deleteAllCompletedTodos() {
    showNotify(true, <Fragment><IconContext.Provider value={{ style: { verticalAlign: 'bottom', fontSize: '20px'} }}><FaTrashAlt /></IconContext.Provider>&ensp;Deleted completed TODOs successfully</Fragment> , "danger")
    setAllTodos(allTodos => allTodos.filter(todo => todo.isCompleted === false)) 
  }

  function editTodo(id) {

    const todoEdit = allTodos.find(myTodo =>  myTodo.id === id)
    setWannaUpdate(true)
    setTodoTitle(todoEdit.title)
    setTodoBody(todoEdit.body)
    setEditId(id)
  }

  function handleCompleted(id) {
    
    setAllTodos(allTodos => allTodos.map(todo => (todo.id ===id ? {...todo, isCompleted:!todo.isCompleted} : {...todo} )))
    const todoCompleteCheck = allTodos.find(myTodo =>  myTodo.id === id)
    if (!todoCompleteCheck.isCompleted) {
      showNotify(true, <Fragment><IconContext.Provider value={{ style: { verticalAlign: 'bottom', fontSize: '20px'} }}><ImCheckmark /></IconContext.Provider>&ensp;Set as Completed</Fragment> , "success")
    } else {
      showNotify(true, <Fragment><IconContext.Provider value={{ style: { verticalAlign: 'bottom', fontSize: '20px'} }}><FaUndo /></IconContext.Provider>&ensp;Undo Completed</Fragment> , "danger")
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!todoTitle) {
      showNotify(true, <Fragment><IconContext.Provider value={{ style: { verticalAlign: 'bottom', fontSize: '20px'} }}><FaExclamationTriangle /></IconContext.Provider>&ensp;TODO title is mandatory</Fragment>, "danger")
    }
    else if (todoTitle && wannaUpdate) {
      showNotify(true, <Fragment><IconContext.Provider value={{ style: { verticalAlign: 'bottom', fontSize: '20px'} }}><FaEdit /></IconContext.Provider>&ensp;Edited successfully</Fragment>, "success")
      setAllTodos(prevTodos => {
        const newTempArray = []
        for (let i=0; i<prevTodos.length; i++) {
          const prevTodo = prevTodos[i]
          if (prevTodo.id === editId) {
            newTempArray.unshift({...prevTodo, title: todoTitle, body: todoBody, isCompleted: false})
          } else {
            newTempArray.push(prevTodo)
          }
        }
        return newTempArray 
      })
      // setAllTodos(prevTodos => prevTodos.map(mytodo => {
      //   return mytodo.id === editId ? {...mytodo, title: todoTitle, body: todoBody} : mytodo 
      // }))
      setTodoTitle("")
      setTodoBody("")
      setWannaUpdate(false)
      setEditId(null)
    }
    else {
      setAllTodos([...allTodos, { id: nanoid(), title: todoTitle, body: todoBody, isCompleted: false }])
      showNotify(true, <Fragment><IconContext.Provider value={{ style: { verticalAlign: 'bottom', fontSize: '20px'} }}><MdLibraryAdd /></IconContext.Provider>&ensp;Added successfully : Click a TODO to set as Completed</Fragment>, "success")
      setTodoTitle("")
      setTodoBody("")
    }
  }

  return (
    <>
    <section className="main-container">
      <h1>TODO LIST</h1>
      {notify.needed && 
        <Notify 
          notify={notify} 
          removeNotify={showNotify}
          allTodos={allTodos}
        />
      }
      <form className="input-form-container" onSubmit={handleSubmit}>
        <textarea 
          className="first-input-container" 
          type="text" 
          name="todoTitle" 
          placeholder="Add title (e.g., DOG)" 
          value={todoTitle} 
          onChange={(event)=> setTodoTitle(event.target.value)}>
        </textarea>

        <textarea 
          className="first-input-container second-input-container" 
          type="text" 
          name="todoBody" 
          placeholder="Add body (e.g., Walk the dog)" 
          value={todoBody} 
          onChange={(event)=> setTodoBody(event.target.value)}>
        </textarea>

        <button className={wannaUpdate ? "submit-btn update-btn" : "submit-btn"}>
          {wannaUpdate ? "Update" : "Add"}
        </button>
      </form>

      {allTodos.length>0 &&
        <div>
          <div> 
            <AllTodos 
              allTodos={allTodos} 
              deleteTodo={deleteTodo} 
              editTodo={editTodo}
              handleCompleted={handleCompleted} /> 
          </div>
          <div className="delete-all-container">
            <button className="delete-all-btn delete-all-btn-primary" onClick={deleteAllTodos}>
              Delete All
            </button>
            
            {
            (allTodos.some(todo => todo.isCompleted ===true)) && 
            <button 
              className="delete-all-btn delete-all-completed-btn" 
              onClick={deleteAllCompletedTodos}
            >
              Delete Completed
            </button>
            }   
          </div>
        </div>
      }
    </section>
    <footer>By <a href="https://www.linkedin.com/in/sanjay-karki9/" target="_blank" rel="noreferrer">Sanjay Karki</a></footer>
    </>
    
  );
}

export default App;
