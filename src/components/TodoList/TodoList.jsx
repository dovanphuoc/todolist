import React, { useState } from "react";
import "./TodoList.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const TodoList = () => {
  const jsonTask = JSON.parse(localStorage.getItem("todo")) || [];
  const [tasks, setTasks] = useState(jsonTask);
  const [inputSearch, setInputSearch] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [inputText, setInputText] = useState("");
  const [inputTextarea, setInputTextarea] = useState("");
  const [selectOption, setSelectOption] = useState("normal");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleRemoveTask = (uuid) => {
    const currentTask = tasks.filter((task) => task.uuid !== uuid);
    setTasks(currentTask);
    const todoIndex = tasks.filter((task) => task.uuid === uuid);
    jsonTask.splice(todoIndex, 1);
    localStorage.setItem("todo", JSON.stringify(jsonTask));
  };

  const handleShowDetail = (uuid) => {
    const currentTask = tasks.filter((task) => task.uuid === uuid);
    if (currentTask) {
      setIsShow(!isShow);
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newTask = {
      inputText,
      inputTextarea,
      selectOption,
      selectedDate,
      uuid: uuidv4(),
    };
    setTasks(() => {
      const todo = [newTask];
      const jsonTodo = JSON.stringify(todo);
      localStorage.setItem("todo", jsonTodo);
      return todo;
    });
  };

  const handleCheckEvent = (e) => {
    if (e.target.checked) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
  return (
    <div className="container">
      <div className="title">
        <h2>Todo list</h2>
        <Link to="/add-newtask" className="btn-add">
          Add New Task
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={inputSearch}
        onChange={(e) => setInputSearch(e.target.value)}
      />
      <div className="list-task">
        {tasks
          .filter((task) => {
            if (inputSearch === "") {
              return task;
            } else if (
              task.inputText.toLowerCase().includes(inputSearch.toLowerCase())
            ) {
              return task;
            }
          })
          .map((task) => (
            <React.Fragment key={task.uuid}>
              <div className="task-item">
                <div className="task-title">
                  <input type="checkbox" onChange={handleCheckEvent} />
                  <span>{task.inputText}</span>
                </div>
                <div className="task-action">
                  <button
                    className="btn btn-detail"
                    onClick={() => handleShowDetail(task.uuid)}
                  >
                    Detail
                  </button>
                  <button
                    className="btn btn-remove"
                    onClick={() => handleRemoveTask(task.uuid)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              {isShow ? (
                <form>
                  <input
                    type="text"
                    placeholder="Add new task"
                    defaultValue={task.inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      cols="30"
                      rows="10"
                      defaultValue={task.inputTextarea}
                      onChange={(e) => setInputTextarea(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="form-option">
                    <div className="form-group">
                      <label htmlFor="date">Due Date</label>
                      <DatePicker
                        selected={new Date(task.selectedDate)}
                        onChange={(date) => setSelectedDate(date)}
                        minDate={new Date()}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="priority">Priority</label>
                      <select
                        defaultValue={task.selectOption}
                        onChange={(e) => setSelectOption(e.target.value)}
                      >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn-submit"
                      onClick={handleSubmitForm}
                    >
                      Update
                    </button>
                  </div>
                </form>
              ) : (
                <></>
              )}
            </React.Fragment>
          ))}
      </div>
      {isOpen && (
        <div className="bulk-action">
          <span>Bulk Action</span>
          <div className="action-name">
            <button
              className="btn btn-primary"
              onClick={() => setIsOpen(false)}
            >
              Done
            </button>
            <button className="btn btn-danger">
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
