import { Box } from "@mui/material";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  console.log("todo: ", todo);
  console.log("todos: ", todos);

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleAdd = () => {
    setTodos((prevState) => {
      const newTodo = {
        name: todo,
        id: uuidv4(),
        isDone: false,
      };

      return [newTodo, ...prevState];
    });

    setTodo("");
  };

  const handleChangeDone = (event, id) => {
    const filterTodos = todos.filter((item) => item.id !== id);
    const foundTodo = todos.find((item) => item.id === id);

    const newTodo = {
      ...foundTodo,
      isDone: event.target.checked,
    };

    setTodos([...filterTodos, newTodo]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        rowGap: "20px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <AddTodo
          todo={todo}
          handleChange={handleChange}
          handleAdd={handleAdd}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Todos
          title="Todos"
          todos={todos.filter((item) => item.isDone === false)}
          handleChange={handleChangeDone}
        />
        <Todos
          handleChange={handleChangeDone}
          title="Done Todos"
          todos={todos.filter((item) => item.isDone === true)}
        />
      </Box>
    </Box>
  );
}

export default App;
