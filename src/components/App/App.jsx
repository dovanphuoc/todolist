import React from "react";
import "../../css/reset.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewTask from "../NewTask/NewTask";
import TodoList from "../TodoList/TodoList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />}></Route>
        <Route path="add-newtask" element={<NewTask />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
