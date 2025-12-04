import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

// Context
import { useContext, useEffect, useState } from "react";

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
import { Button, TextField } from "@mui/material";

export default function Todo({ todo }) {
  const [todos, setTodos] = useContext(todoContext);
  const [valuableTodo, setValuableTodo] = useState(todo);

  function completedUpdate(taskId) {
    let newTodos = todos.map((t) => {
      if (t.id === taskId) {
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

  // Delete
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleDeleteOpen = () => {
    setOpenDeleteDialog(true);
  };
  const handleDeleteClose = (state = false) => {
    if (state) {
      let filteredTodos = todos.filter((t) => t.id !== todo.id);
      setTodos([...filteredTodos]);
    }
    setOpenDeleteDialog(false);
  };

  // Edit
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleEditOpen = () => {
    setOpenEditDialog(true);
  };

  const handleEditClose = (isUpdated) => {
    if (isUpdated) {
      let updatedTodos = todos.map((t) =>
        t.id === todo.id ? valuableTodo : t
      );
      setTodos(updatedTodos);
    }

    setOpenEditDialog(false);
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
                onClick={handleEditOpen}
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
                onClick={handleDeleteOpen}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* Delete Task */}
            </Grid>
            {/*== ACTION BUTTONS ==*/}
          </Grid>
        </CardContent>
      </Card>
      {/* Delete Task */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => {
          handleDeleteClose(false);
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
              handleDeleteClose(false);
            }}
            style={{ color: "red" }}
          >
            غير موافق
          </Button>
          <Button
            onClick={() => {
              handleDeleteClose(true);
            }}
            autoFocus
          >
            موافق
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Task End */}

      {/* Edit Task */}
      <Dialog
        style={{ direction: "rtl" }}
        open={openEditDialog}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleEditClose();
            },
          },
        }}
      >
        <DialogTitle>تعديل المهمه</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="عنوان المهمه"
            type="text"
            fullWidth
            variant="standard"
            value={valuableTodo.title}
            onChange={(event) =>
              setValuableTodo({ ...valuableTodo, title: event.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="details"
            name="details"
            label="ملاحظه"
            type="text"
            fullWidth
            variant="standard"
            value={valuableTodo.details}
            onChange={(event) =>
              setValuableTodo({ ...valuableTodo, details: event.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleEditClose(false);
            }}
            sx={{ color: "red" }}
          >
            الغاء
          </Button>
          <Button
            onClick={() => {
              handleEditClose(true);
            }}
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit Task End */}
    </>
  );
}
