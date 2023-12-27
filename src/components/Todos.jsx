import {
  Checkbox,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";

const Todos = ({ todos, title, handleChange }) => {
  return (
    <List
      sx={{ border: "1px solid grey", minWidth: "300px" }}
      subheader={title}
    >
      {todos.map((item) => (
        <ListItem key={item.id}>
          <ListItemText primary={item.name} />
          <ListItemSecondaryAction>
            <Checkbox
              checked={item.isDone}
              onChange={(event) => handleChange(event, item.id)}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default Todos;
