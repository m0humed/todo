import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

// Context
import { useContext, useState } from "react";

import { todoContext } from "../Contexts/TodosContext";

// Modal
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// ICONS
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Button  } from "@mui/material";

export default function Todo({ todo }) {
  const [todos, setTodos] = useContext(todoContext);
  function completedUpdate(taskId) {
    let newTodos = todos.map((t) => {
      if (t.id === taskId) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos([...newTodos]);
  }

  // function handleDeleteTask() {
  //   let filteredTodos = todos.filter((t) => (t.id === todo.id ? null : t));
  //   setTodos([...filteredTodos]);
  // }

  // Dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (state = false) => {
    if (state) {
      let filteredTodos = todos.filter((t) => t.id !== todo.id );
      setTodos([...filteredTodos]);
    }
    setOpen(false);
  };

  return (
    <>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Typography variant="h5" sx={{ textAlign: "right" }}>
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
                aria-label="delete"
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

              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              {/* Delete Task */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
                onClick={handleClickOpen}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* Delete Task */}
            </Grid>
            {/*== ACTION BUTTONS ==*/}
          </Grid>
        </CardContent>
      </Card>
      {/* Delete Model */}
      <Dialog
        open={open}
        onClose={() => {
          handleClose(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">{"حذف مهمه"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            أذا قمت بحذف المهمه لن تستطيع استرجاعها مره اخري
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose(false);
            }}
            style={{ color: "red" }}
          >
            غير موافق
          </Button>
          <Button
            onClick={() => {
              handleClose(true);
            }}
            autoFocus
          >
            موافق
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Model End */}
    </>
  );
}
