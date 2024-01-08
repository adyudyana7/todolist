import { Box } from "@mui/material";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import name from "./assets/name.jpg";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleRateChange = (value, id) => {
    const filterTodos = todos.filter((item) => item.id !== id);
    const foundTodo = todos.find((item) => item.id === id);
    const newTodo = {
      ...foundTodo,
      rate: value,
    };
    setTodos([newTodo, ...filterTodos]);
  };

  const handleAdd = () => {
    if (todo === "") {
      toast.error(
        "Внимание! Нельзя добавить пустое задание. Введите задание!!!"
      );
    } else {
      setTodos((prevState) => {
        const newTodo = {
          name: todo,
          id: uuidv4(),
          isDone: false,
          deadline: date,
          rate: 1,
          category,
        };
        return [newTodo, ...prevState];
      });

      setTodo("");
      setDate(null);
      setCategory("");
      toast.success("Ваше задание успешно добавлена!");
    }
  };

  const handleChangeDone = (event, id) => {
    const filterTodos = todos.filter((item) => item.id !== id);
    const foundTodo = todos.find((item) => item.id === id);

    const newTodo = {
      ...foundTodo,
      isDone: event.target.checked,
    };

    setTodos([...filterTodos, newTodo]);
    if (event.target.checked) {
      toast.success("Вы успешно выполнили поставленную задачу! ");
    } else {
      toast.warning("Вы отменили поставленную  задачу!!!");
    }
  };

  useEffect(() => {
    if (todos.length !== 0) {
      localStorage.setItem("__todolist", JSON.stringify(todos));
    } else {
      const todosInLS = JSON.parse(localStorage.getItem("__todolist"));
      setTodos(todosInLS || []);
    }
  }, [todos]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          rowGap: "20px",
          paddingTop: "200px",
          background: name,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <AddTodo
            todo={todo}
            handleChange={handleChange}
            date={date}
            handleDateChange={handleDateChange}
            handleAdd={handleAdd}
            category={category}
            handleCategoryChange={handleCategoryChange}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box>
            <Todos
              title="ЗАДАЧИ:"
              todos={todos.filter((item) => item.isDone === false)}
              handleChange={handleChangeDone}
              handleRateChange={handleRateChange}
              category={category}
            />
          </Box>

          <Todos
            handleChange={handleChangeDone}
            handleRateChange={handleRateChange}
            title="СДЕЛАННЫЕ ЗАДАЧИ:"
            todos={todos.filter((item) => item.isDone === true)}
            category={category}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default App;
