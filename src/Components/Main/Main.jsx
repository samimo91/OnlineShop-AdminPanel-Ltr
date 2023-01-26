import React from "react";
import TodoList from "../TodoList/TodoList";

import "./Main.css";

export default function Main() {
  return (
    <>
      <h1 className="todo-title"> لیست کارها </h1>
      <div className="main-page-container">
        <div className="todo-main-container">
          <TodoList />
        </div>
      </div>
    </>
  );
}
