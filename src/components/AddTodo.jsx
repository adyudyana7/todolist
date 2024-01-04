import { IconButton, InputAdornment, TextField, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "sonner";

const AddTodo = ({ todo, handleChange, handleAdd }) => {
  const popik = (message) => {
    toast.success(message, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <Box>
      <TextField
        sx={{ width: "400px" }}
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
              <IconButton
                onClick={() => {
                  if (todo.trim() !== "") {
                    handleAdd();
                    popik("Успешно добавлено!");
                  } else {
                    popik("Введите задачу...");
                  }
                }}
                disabled={!todo.trim()}
              >
                <AddIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default AddTodo;
