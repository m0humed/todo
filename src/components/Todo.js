import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

// Context
import { useContext, useEffect } from "react";
import { useToast } from "../Contexts/AlertContext";
import { todoContext } from "../Contexts/TodosContext";
import { MessageStatus } from "../Contexts/Eunms";

// ICONS
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

export default function Todo({ todo, handleDeleteOpen, handleEditOpen }) {
  const [todos, setTodos] = useContext(todoContext);
  const { showHideToast } = useToast();

  function completedUpdate(taskId) {
    let newTodos = todos.map((t) => {
      if (t.id === taskId) {
        if (!t.isCompleted) {
          showHideToast("تمت انهاء المهمه", MessageStatus.Completed);
        } else {
          showHideToast("المهمه قيد العمل", MessageStatus.unCompleted);
        }
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos([...newTodos]);
  }

  useEffect(() => {
    const saved = JSON.stringify(todos);
    localStorage.setItem("todos", saved);
  }, [todos]);

  // function handleDeleteTask() {
  //   let filteredTodos = todos.filter((t) => (t.id === todo.id ? null : t));
  //   setTodos([...filteredTodos]);
  // }

  return (
    <>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginBottom: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>

              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>

            {/* ACTION BUTTONS */}
            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Complete Task */}
              <IconButton
                className="iconButton"
                aria-label="Complete"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
                onClick={() => {
                  completedUpdate(todo.id);
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* Complete Task */}

              {/* Edit Task */}
              <IconButton
                className="iconButton"
                aria-label="Edit"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
                onClick={() => handleEditOpen(todo)}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              {/* Edit Task End */}

              {/* Delete Task */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
                onClick={() => handleDeleteOpen(todo.id)}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* Delete Task */}
            </Grid>
            {/*== ACTION BUTTONS ==*/}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
