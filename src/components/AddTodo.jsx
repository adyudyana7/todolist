import { TextField, Box, Button } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { MenuItem } from "@mui/material";

const categories = [
  "Работа:",
  "Быт:",
  "Хобби:",
  "Финансы",
  "Здоровье",
  "Личное",
  "Здоровье",
];

const AddTodo = ({
  todo,
  date,
  handleChange,
  handleAdd,
  handleDateChange,
  category,
  handleCategoryChange,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
      <TextField
        sx={{ width: "400px" }}
        name="todo"
        label="Задача"
        placeholder="Введите задачу"
        value={todo}
        onChange={handleChange}
      />
      <DateTimePicker
        value={date}
        onChange={handleDateChange}
        disablePast={true}
      />
      <TextField
        select
        label="Категория"
        value={category}
        onChange={handleCategoryChange}
      >
        {categories.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" onClick={handleAdd}>
        Добавить задачу
      </Button>
    </Box>
  );
};

export default AddTodo;
