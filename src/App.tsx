import  { useEffect, useState } from 'react';
import axios from 'axios';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

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

  return (
    <>
      <h1>Task List</h1>
      <ul>
     {todos.slice(0, 10).map((todo) => (
    <li key={todo.id}>{todo.title}</li>
  ))}
      </ul>

<section>

   <form>
    <span><input type="text" />
    <input type="button" value="add" /></span>
    <br/>
    <span><input type="checkbox" name="Create Mockup" id="" />
    <label htmlFor="Create Mockup">Create Mockup</label></span>    <br/>
<span>
  <input type="checkbox" name="Create Static Layout" id="" />
    <label htmlFor="Create Static Layout">Create Static Layout</label>
   </span>
     <br/>
<span> <input type="checkbox" name="" id="" /><input type="text" name="" id="" placeholder="add interactivity"/><input type="button" value="save" /></span>
  
   </form>
</section>



    </>
  );
}

export default App;