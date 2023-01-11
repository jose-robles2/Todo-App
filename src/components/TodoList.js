import React, {useState} from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'


function TodoList() {
  const [todos, setTodos] = useState([]) // add our state 
  
  const addTodo = todo => { 
    // handles: if someone types in a shit ton of spaces into the todo list, then dont save those spaces into the todo: ex: "g                fdasfda" == "gfdasfda"
    if (!todo.text || /^\s*$/.test(todo.text)) {
        return 
    }  

    const newTodos = [todo, ...todos] // this array will store ALL the todos ["walk the dog", "feed the cat",...""]

    setTodos(newTodos)  
  }

  const updateTodo = (todoId, newValue) => { 
    // handles: if someone types in a shit ton of spaces into the todo list, then dont save those spaces into the todo: ex: "g                fdasfda" == "gfdasfda"
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
        return 
    }  
    // for all todos, if it has been edited, then set it to the new value, else keep it the same 
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))  
  }

  const removeTodo = id => { 
    const removeArr = [...todos].filter(todo => todo.id != id)    // Filter out the todos that are NOT to be deleted
    setTodos(removeArr)                                           // Update. original: [1,2,3,4] new: [1,2,3] where 4 was marked as complete 
  }

  const completeTodo = id => { 
    let updatedTodos = todos.map(todo => {
        if (todo.id === id) {
            todo.isComplete = !todo.isComplete // Toggle btwn true and false 
        }
        return todo
    })
    setTodos(updatedTodos)
  }

  return (
    <div>
        <h1>What's the Plan for Today?</h1>
        <TodoForm onSubmit={addTodo}/> 
        <Todo 
            todos = {todos}
            completeTodo={completeTodo}
            removeTodo = {removeTodo}
            updateTodo = {updateTodo}
        />  
    </div>
  )
}

export default TodoList