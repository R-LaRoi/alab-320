import  { useEffect, useState, useReducer} from 'react';
import axios from 'axios';
import './App.css';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]); 
  const [inputText, setInputText] = useState<string | undefined>();
  const [userTodos, setUserTodos] = useState<string[]>([]);
  
  // used useReducer for state mgmt instead of useState
  // const [isChecked, setIsChecked] = useState<boolean[]> ([]);

  const initState = [false, false, false, false, false];
   const [state, dispatch] = useReducer(reducer, initState);


  async function getTodos() {
    try {
      const response = await axios('https://jsonplaceholder.typicode.com/todos');
      const data = await response.data;
      setTodos(data);
    } catch (error) {
      console.error('Error', error);
    }
  }
  useEffect(() => {
    getTodos();
  }, []);

    function newTodo(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      let userText = new FormData(event.currentTarget);
      let value = userText.get('inputText') 
        if (value !== null && typeof value === 'string') {
      setInputText(value);
      setUserTodos((prevUserTodos) => [...prevUserTodos, value as string]);

    } else {
      setInputText('');
    }



  }

//  refactored this function to useReducer ----
// function handleCheckbox (index: number) {
//     setIsChecked((prev) => {
//       const updatedChecked = [...prev];
//       updatedChecked[index] = !updatedChecked[index];
//       return updatedChecked;
//     });
//   };

function reducer(state: any, action: { type: any; updatedChecked: string | number; }) {
  switch (action.type) {
    case 'isChecked':
      const updatedChecked = [...state];
      updatedChecked[action.updatedChecked as number] = !updatedChecked[action.updatedChecked as number];
      return updatedChecked;
    default:
      return state;
  }
}



  return (
    <>
      <h1>Task List</h1>
      <form onSubmit={newTodo}>
      <span>
      <input type="text" placeholder="add todo"  name="inputText"/>
     <input className="btn" type="submit" value="add"  /></span>
    </form>
      <ul>
      {userTodos.map((todo, index) => (
        <li key={index}>
          <input
            type="checkbox"
            name="done"
            checked={state[index]}
              onChange={() => dispatch({ type: 'isChecked', updatedChecked: index })}
          />
          {todo}
          {state[index] && (
            <>
            <input
            className="btn"
              type="button"
              value="delete"
              onClick={() => console.log(`Delete button clicked for item ${index}`)}
            /><input
            className="btn"
             type="button"
             value="edit"
             onClick={() => console.log(`Edit item ${index}`)} />
             </>
          )}
        </li>
      ))}
  
    
     {todos.slice(10, 25).map((todo) => (
     <li key={todo.id}> <input
            type="checkbox"
            name="done"
             checked={state[todo.id]}
              onChange={() => dispatch({ type: 'isChecked', updatedChecked: todo.id })}
            
          />{todo.title} 
       {state[todo.id] && (
            <><input
            className="btn"
             type="button"
             value="delete"
             onClick={() => console.log(`Delete  item ${todo.id}`)} /><input
             className="btn"
             type="button"
             value="edit"
             onClick={() => console.log(`Edit  item ${todo.id}`)} /></>
          )}</li>



  ))}
      </ul>

<section>
</section>



    </>
  );
}

export default App;