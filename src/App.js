import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { todoContext } from "./Contexts/TodosContext";
import { useState } from "react";
const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
});

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#191b1f",
          height: "100vh",
          direction: "rtl",
        }}
      >
        <todoContext.Provider value={[todos, setTodos]}>
          <TodoList />
        </todoContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
