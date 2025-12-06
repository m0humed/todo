import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { todoContext } from "./Contexts/TodosContext";
import {  useState } from "react";
import { ToastProvider } from "./Contexts/AlertContext";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#023e8a",
    },
  },
});

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <div
          className="App"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#191b1f",
            minHeight: "100vh",
            direction: "rtl",
          }}
        >
          <todoContext.Provider value={[todos, setTodos]}>
            <TodoList />
          </todoContext.Provider>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
