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
import { useEffect, useState } from "react";
import { useContext } from "react";

import { todoContext } from "../Contexts/TodosContext";
// Components
import Todo from "./Todo";

// OTHERS
import { v4 as uuidv4 } from "uuid";

// const todos = [
//   {
//     id: uuidv4(),
//     title: "قراءة كتاب",
//     details: "تيسمبتيس يتسبميتس بيمستب",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "قراءة كتاب",
//     details: "تيسمبتيس يتسبميتس بيمستب",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "قراءة كتاب",
//     details: "تيسمبتيس يتسبميتس بيمستب",
//     isCompleted: false,
//   },
// ];
export default function TodoList() {
  const [todos, setTodos] = useContext(todoContext);
  const [newTask, setNewTask] = useState("");
  const [alignment, setAlignment] = useState("All");

  const filterdTodos = todos.filter((t) => {
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

  const todosJsx = filterdTodos.map((t) => {
    return <Todo key={t.id} todo={t} />;
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
  }, []);

  return (
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
          {todosJsx}
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
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
          {/*== INPUT + ADD BUTTON ==*/}
        </CardContent>
      </Card>
    </Container>
  );
}
