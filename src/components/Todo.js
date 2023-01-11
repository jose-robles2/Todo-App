import React, {useState} from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import {RiCloseCircleLine} from "react-icons/ri"
import {TiEdit} from "react-icons/ti"

function Todo({todos, completeTodo, removeTodo, updateTodo}) {

  const [edit, setEdit] = useState({
    id: null, 
    value: ""
  })

  // Submit the value for editing a todo
  const submitUpdate = value => { 
    updateTodo(edit.id,value)
    setEdit({
        id: null, 
        value: ""
    })
  }

  if (edit.id) { 
    return <TodoForm 
        edit = {edit} 
        onSubmit = {submitUpdate} />
  }

  // map, for all todos do this operation: 
  return todos.map((todo,index) => (
    // Check if a todo is complete, if yes, modify the gui to make it transparent, also include icons 
    <div className={todo.isComplete ? "todo-row complete" : "todo-row"} key = {index}> 
        <div key = {todo.id} onClick={() => completeTodo(todo.id)}>
            {todo.text}
        </div>
        
        <div className='icons'>
            {/* delete todo call  */}
            <RiCloseCircleLine 
                onClick={() => removeTodo(todo.id)}
                className = "delete-icon"/> 

        {/* edit todo call  */}
            <TiEdit 
                onClick={() => setEdit({id: todo.id, value: todo.text})}
                className = "edit-icon" /> 
                            

        </div>
    </div>
  ))
}

export default Todo 