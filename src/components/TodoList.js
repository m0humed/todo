import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
// react hooks
import { useEffect, useState, useContext, useMemo } from "react";

import { todoContext } from "../Contexts/TodosContext";
import { useToast } from "../Contexts/AlertContext";
import { MessageStatus } from "../Contexts/Eunms";
// Components
import Todo from "./Todo";
// Modal
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// OTHERS
import { v4 as uuidv4 } from "uuid";
import { Box } from "@mui/material";

export default function TodoList() {
  const [todos, setTodos] = useContext(todoContext);
  const [newTask, setNewTask] = useState("");
  const [alignment, setAlignment] = useState("All");
  const { showHideToast } = useToast();

  // Todo called id
  const [currentDeletedTodo, setCurrentDeletedTodo] = useState(null);
  const [valuableTodo, setValuableTodo] = useState({
    id: null,
    title: "",
    isCompleted: false,
  });

  // Handle Toggle Buttons

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  function handleAddNewTask() {
    if (newTask.length > 0) {
      let updatedlist = [
        ...todos,
        { id: uuidv4(), title: newTask, details: "", isCompleted: false },
      ];
      setTodos(updatedlist);
      saveAtLocal(updatedlist);
      setNewTask("");
      showHideToast("تمت الاضافه بنجاح", MessageStatus.Add);
    }
  }

  function saveAtLocal(lastVersion) {
    const saved = JSON.stringify(lastVersion);
    localStorage.setItem("todos", saved);
  }

  useEffect(() => {
    const retrivedData = localStorage.getItem("todos");
    if (retrivedData) {
      const parsedData = JSON.parse(retrivedData);
      setTodos(parsedData);
    }
  }, [setTodos]);

  // Delete
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleDeleteOpen = (TodoId) => {
    setCurrentDeletedTodo(TodoId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = (state = false) => {
    console.log(currentDeletedTodo);
    if (state) {
      let filteredTodos = todos.filter((t) => t.id !== currentDeletedTodo);
      setTodos([...filteredTodos]);
      showHideToast("تمت حذف المهمه", MessageStatus.Delete);
    }
    setOpenDeleteDialog(false);
  };

  // Edit
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleEditOpen = (todo) => {
    setValuableTodo(todo);
    console.log("lfffffffffffffffffffffffff");
    setOpenEditDialog(true);
  };

  const handleEditClose = (isUpdated) => {
    if (isUpdated) {
      let updatedTodos = todos.map((t) =>
        t.id === valuableTodo.id ? valuableTodo : t
      );
      setTodos(updatedTodos);
      showHideToast("تمته التعديل بنجاح", MessageStatus.Edit);
    }

    setOpenEditDialog(false);
  };

  const filterdTodos = useMemo(() => {
    // console.log("UseMemo")
    return todos.filter((t) => {
      if (alignment === "All") {
        return true;
      }
      if (alignment === "Completed" && t.isCompleted === true) {
        return true;
      }
      if (alignment === "UnCompleted" && t.isCompleted === false) {
        return true;
      }
      return false;
    });
  }, [alignment, todos]);

  const todosJsx = useMemo(() => {
    // console.log("kffffff")
    return filterdTodos.map((t) => {
      return (
        <Todo
          key={t.id}
          todo={t}
          handleDeleteOpen={handleDeleteOpen}
          handleEditOpen={handleEditOpen}
        />
      );
    });
  }, [filterdTodos]);
  return (
    <>
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h2" style={{ fontWeight: "bold" }}>
              مهامي
            </Typography>
            <Divider />

            {/* FILTER BUTTONS */}
            <ToggleButtonGroup
              style={{ direction: "ltr", marginTop: "30px" }}
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton value="UnCompleted">غير المنجز</ToggleButton>
              <ToggleButton value="Completed">المنجز</ToggleButton>
              <ToggleButton value="All">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/* ==== FILTER BUTTON ==== */}

            {/* ALL TODOS */}
            <Box sx={{ maxHeight: "50vh", overflow: "scroll", marginTop: 5 }}>
              {todosJsx}
            </Box>
            {/* === ALL TODOS === */}

            {/* INPUT + ADD BUTTON */}
            <Grid container style={{ marginTop: "20px" }} spacing={2}>
              <Grid
                xs={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  value={newTask}
                  onChange={(event) => setNewTask(event.target.value)}
                />
              </Grid>

              <Grid
                xs={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  style={{ width: "100%", height: "100%" }}
                  variant="contained"
                  onClick={() => {
                    handleAddNewTask();
                  }}
                  disabled={newTask.length <= 0}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
            {/*== INPUT + ADD BUTTON ==*/}
          </CardContent>
        </Card>
      </Container>
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
