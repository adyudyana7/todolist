import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Slider,
  Typography,
} from "@mui/material";
import moment from "moment";
import "moment/locale/ru";

const moods = [
  {
    label: "😔",
    value: 0,
  },
  {
    label: "🙂",
    value: 1,
  },
  {
    label: "😊",
    value: 2,
  },
];

const Todos = ({ todos, title, handleChange, handleRateChange, category }) => {
  return (
    <List
      sx={{ border: "1px solid grey", minWidth: "300px", padding: "20px" }}
      subheader={<Typography variant="h5">{title}</Typography>}
    >
      {todos
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => {
          const date = moment(item.deadLine).valueOf();
          const currentDate = new Date().valueOf();
          return (
            <>
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <Typography
                      sx={{
                        color: currentDate > date ? "red" : "black",
                      }}
                    >
                      {moment(item.deadLine).locale("ru").format("LLL")}
                      <br />
                      {item.category}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <Checkbox
                    disabled={currentDate > date}
                    checked={item.isDone}
                    onChange={(event) => handleChange(event, item.id)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Slider
                disabled={item.isDone}
                value={item.rate}
                onChange={(event, value) =>
                  handleRateChange(event.target.value, item.id)
                }
                marks={moods}
                min={0}
                max={2}
                componentsProps={{
                  markLabel: {
                    style: {
                      fontSize: "25px",
                    },
                  },
                }}
              />

              <Divider component="li" />
            </>
          );
        })}
    </List>
  );
};

export default Todos;
