import React, {useState, useEffect, useRef} from 'react'

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "") // array, input == value of that state, setInput is a function that updates this value
  
  const inputRef = useRef (null)

  // "Focus" on whatever the ref is -> put the textboxes as ref so the user doesnt have to click and start typing 
  useEffect(() => {
    inputRef.current.focus()
  })

  //  Allows for user to type and delete values in the textbox for the todo list  
  const handleChange = e => { 
    setInput(e.target.value) // set input to whatever has been typed in 
  }
  
  //  Allows for the page to NOT refresh every time we press "Add todo"
  const handleSubmit = e => { 
    e.preventDefault(); // Prevent refreshing for when we add a todo 
    
    props.onSubmit({
        id: Math.floor(Math.random() * 1000), // Generate a random num for an ID (super basic)
        text: input                           // equal to whatever is typed into the textbox
    })  

    setInput("") // Makes it so that we type something in and press "Add todo" then the text will disappear from the textbox 
  }

  return (
    <form className='todo-form' onSubmit={handleSubmit}> 
        {props.edit ? ( <div> 
            {/* If we are editing a todo, render different stuff */}
                    <input 
                    type = "text" 
                    placeholder= "Update your todo" 
                    value = {input} 
                    name = "text" 
                    className='todo-input edit'
                    onChange={handleChange}
                    ref={inputRef}
                    />
                <button className='todo-button edit'>Update</button> 
                {/* adding "edit" was a css function for diff color */}
            </div>  
        ) : 
        // If not editing, render as normal 
        (<div> 
            <input 
            type = "text" 
            placeholder= "Add a todo" 
            value = {input} 
            name = "text" 
            className='todo-input'
            onChange={handleChange}
            ref={inputRef}
            />
        <button className='todo-button'>Add Todo</button> </div>  ) }
    </form>        
  )
}

export default TodoForm


