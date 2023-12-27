import { IconButton, InputAdornment, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddTodo = ({ todo, handleChange, handleAdd }) => {
  return (
    <TextField
      name="todo"
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          handleAdd();
        }
      }}
      label="Задача"
      placeholder="Введите задачу"
      value={todo}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleAdd}>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default AddTodo;
