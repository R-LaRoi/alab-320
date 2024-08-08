import  { useEffect, useState } from 'react';
import axios from 'axios';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface AddTodosProps {
  title: string
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]); 
  const [inputText, setInputText] = useState<string | undefined>();
  const [userTodos, setUserTodos] = useState<string[]>([]);

 const [isChecked, setIsChecked] = useState<boolean[]> ([]);



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
 

  const handleCheckbox = (index: number) => {
    setIsChecked((prev) => {
      const updatedChecked = [...prev];
      updatedChecked[index] = !updatedChecked[index];
      return updatedChecked;
    });
  };



  return (
    <>
      <h1>Task List</h1>
      <form onSubmit={newTodo}>
      <span>
      <input type="text" placeholder="add todo"  name="inputText"/>
     <input type="submit" value="add"  /></span>
    </form>
      <ul>
      {userTodos.map((todo, index) => (
        <li key={index}>
          <input
            type="checkbox"
            name="done"
            checked={isChecked[index]}
            onChange={() => handleCheckbox(index)}
          />
          {todo}
          {isChecked[index] && (
            <input
              type="button"
              value="delete"
              onClick={() => console.log(`Delete button clicked for item ${index}`)}
            />
          )}
        </li>
      ))}
  
    
     {todos.slice(0, 10).map((todo) => (
     <li key={todo.id}> <input
            type="checkbox"
            name="done"
            checked={isChecked[todo.id]}
            onChange={() => handleCheckbox(todo.id)}
          />{todo.title} 
       {isChecked[todo.id] && (
            <input
              type="button"
              value="delete"
              onClick={() => console.log(`Delete  item ${todo.id}`)}
            />
          )}</li>



  ))}
      </ul>

<section>
</section>



    </>
  );
}

export default App;